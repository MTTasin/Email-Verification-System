from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework import parsers
from rest_framework import generics
from celery.result import AsyncResult
import secrets
import hashlib
import json

from .tasks import verify_email_task, process_bulk_file_task
from .models import EmailResult, BulkVerificationRequest, APIKey, SubscriptionPlan, CustomUser
from .serializers import EmailResultSerializer, BulkVerificationRequestSerializer, UserSerializer, APIKeySerializer

class SingleVerifyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user

        if user.credits_remaining <= 0:
            return Response({'error': 'Insufficient credits.'}, status=status.HTTP_402_PAYMENT_REQUIRED)

        # Deduct credit
        user.credits_remaining -= 1
        user.save(update_fields=['credits_remaining'])

        # Dispatch the Celery task
        task = verify_email_task.delay(user.id, email)

        # Return the task ID to the client
        return Response({'task_id': task.id}, status=status.HTTP_202_ACCEPTED)

class SingleVerifyResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id, *args, **kwargs):
        try:
            # Check if the result is in our database
            result_obj = EmailResult.objects.get(task_id=task_id, user=request.user)
            serializer = EmailResultSerializer(result_obj)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except EmailResult.DoesNotExist:
            # If not in DB, check the task status directly from Celery
            task_result = AsyncResult(task_id)
            if task_result.state in ['PENDING', 'STARTED']:
                return Response({'status': 'PENDING'}, status=status.HTTP_200_OK)
            # If the task is done but we don't have a result, something went wrong
            return Response({'status': 'NOT_FOUND'}, status=status.HTTP_404_NOT_FOUND)

class MockBillingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # In a real application, this would integrate with Stripe or another payment gateway.
        # For now, we'll just simulate a successful payment and add credits.
        user = request.user
        # Simulate adding 5000 credits for a successful payment
        user.credits_remaining += 5000
        user.save(update_fields=['credits_remaining'])
        
        return Response({'message': 'Payment simulated successfully. Credits added.', 'new_credits': user.credits_remaining}, status=status.HTTP_200_OK)

class BulkVerifyView(APIView):
    parser_classes = [parsers.FileUploadParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        if 'file' not in request.data:
            return Response({'error': 'No file provided.'}, status=status.HTTP_400_BAD_REQUEST)

        uploaded_file = request.data['file']
        user = request.user

        # Create a BulkVerificationRequest instance
        bulk_request = BulkVerificationRequest.objects.create(
            user=user,
            file=uploaded_file,
            status=BulkVerificationRequest.Status.PENDING
        )

        # Dispatch the bulk processing task
        process_bulk_file_task.delay(bulk_request.id)

        return Response({'message': 'File uploaded and processing started.', 'bulk_request_id': bulk_request.id}, status=status.HTTP_202_ACCEPTED)

class BulkVerifyResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, request_id, *args, **kwargs):
        try:
            bulk_request = BulkVerificationRequest.objects.prefetch_related('results').get(id=request_id, user=request.user)
            serializer = BulkVerificationRequestSerializer(bulk_request)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except BulkVerificationRequest.DoesNotExist:
            return Response({'error': 'Bulk request not found.'}, status=status.HTTP_404_NOT_FOUND)

class BulkVerificationRequestListView(generics.ListAPIView):
    serializer_class = BulkVerificationRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BulkVerificationRequest.objects.filter(user=self.request.user).order_by('-upload_timestamp')

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user

        total_verifications = EmailResult.objects.filter(user=user).count()
        deliverable_count = EmailResult.objects.filter(user=user, status=EmailResult.Status.DELIVERABLE).count()
        undeliverable_count = EmailResult.objects.filter(user=user, status=EmailResult.Status.UNDELIVERABLE).count()
        risky_count = EmailResult.objects.filter(user=user, status=EmailResult.Status.RISKY).count()
        unknown_count = EmailResult.objects.filter(user=user, status=EmailResult.Status.UNKNOWN).count()
        invalid_count = EmailResult.objects.filter(user=user, status=EmailResult.Status.INVALID).count()

        # Recent bulk jobs (last 5)
        recent_bulk_jobs = BulkVerificationRequest.objects.filter(user=user).order_by('-upload_timestamp')[:5]
        recent_bulk_jobs_data = []
        for job in recent_bulk_jobs:
            recent_bulk_jobs_data.append({
                'id': job.id,
                'file_name': job.file.name.split('/')[-1],
                'status': job.status,
                'upload_timestamp': job.upload_timestamp.isoformat(),
                'total_emails': job.results.count(), # Assuming results are populated
            })

        data = {
            'credits_remaining': user.credits_remaining,
            'total_verifications': total_verifications,
            'deliverable_count': deliverable_count,
            'undeliverable_count': undeliverable_count,
            'risky_count': risky_count,
            'unknown_count': unknown_count,
            'invalid_count': invalid_count,
            'recent_bulk_jobs': recent_bulk_jobs_data,
        }

        return Response(data, status=status.HTTP_200_OK)

class APIKeyListView(generics.ListCreateAPIView):
    serializer_class = APIKeySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return APIKey.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Generate a secure API key
        key_prefix = secrets.token_hex(4)
        key_secret = secrets.token_urlsafe(32)
        full_key = f"sk_live_{key_prefix}_{key_secret}"
        
        # Hash the key for storage
        hashed_key = hashlib.sha256(full_key.encode()).hexdigest()
        
        serializer.save(
            user=self.request.user,
            prefix=key_prefix,
            hashed_key=hashed_key,
            name=f"API Key {APIKey.objects.filter(user=self.request.user).count() + 1}"
        )
        
        # Return the full key to the user (only time they'll see it)
        return Response({
            'api_key': full_key,
            'message': 'API key created successfully. Please save this key securely.'
        }, status=status.HTTP_201_CREATED)

class APIKeyDetailView(generics.DestroyAPIView):
    serializer_class = APIKeySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return APIKey.objects.filter(user=self.request.user)

class StripeCheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        plan_id = request.data.get('plan_id')
        
        # Mock subscription plans
        plans = {
            'starter': {'name': 'Starter', 'price': 29.99, 'credits': 10000},
            'pro': {'name': 'Pro', 'price': 99.99, 'credits': 50000},
            'enterprise': {'name': 'Enterprise', 'price': 299.99, 'credits': 200000}
        }
        
        if plan_id not in plans:
            return Response({'error': 'Invalid plan'}, status=status.HTTP_400_BAD_REQUEST)
        
        plan = plans[plan_id]
        
        # Mock Stripe checkout session
        checkout_session = {
            'id': f'cs_mock_{secrets.token_hex(16)}',
            'url': f'/checkout/mock/{secrets.token_hex(16)}',
            'amount_total': int(plan['price'] * 100),  # Convert to cents
            'currency': 'usd',
            'metadata': {
                'plan_id': plan_id,
                'credits': plan['credits'],
                'user_id': str(request.user.id)
            }
        }
        
        return Response(checkout_session, status=status.HTTP_200_OK)

class StripeWebhookView(APIView):
    def post(self, request, *args, **kwargs):
        # Mock webhook processing
        event_data = request.data
        
        if event_data.get('type') == 'checkout.session.completed':
            session = event_data.get('data', {}).get('object', {})
            metadata = session.get('metadata', {})
            
            user_id = metadata.get('user_id')
            credits = int(metadata.get('credits', 0))
            
            if user_id and credits:
                try:
                    from django.contrib.auth import get_user_model
                    User = get_user_model()
                    user = User.objects.get(id=user_id)
                    user.credits_remaining += credits
                    user.save(update_fields=['credits_remaining'])
                except User.DoesNotExist:
                    pass
        
        return Response({'status': 'success'}, status=status.HTTP_200_OK)

class SubscriptionPlansView(APIView):
    def get(self, request, *args, **kwargs):
        plans = [
            {
                'id': 'free',
                'name': 'Free',
                'price': 0,
                'credits': 100,
                'features': ['100 verifications/month', 'Basic support', 'API access']
            },
            {
                'id': 'starter',
                'name': 'Starter',
                'price': 29.99,
                'credits': 10000,
                'features': ['10,000 verifications/month', 'Priority support', 'Bulk verification', 'API access']
            },
            {
                'id': 'pro',
                'name': 'Pro',
                'price': 99.99,
                'credits': 50000,
                'features': ['50,000 verifications/month', 'Priority support', 'Bulk verification', 'Advanced API', 'Custom integrations']
            },
            {
                'id': 'enterprise',
                'name': 'Enterprise',
                'price': 299.99,
                'credits': 200000,
                'features': ['200,000 verifications/month', 'Dedicated support', 'Custom solutions', 'SLA guarantee', 'On-premise options']
            }
        ]
        
        return Response(plans, status=status.HTTP_200_OK)

class TestAuthView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, *args, **kwargs):
        return Response({'message': 'Backend is working!'}, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        return Response({'message': 'POST request received', 'data': request.data}, status=status.HTTP_200_OK)

class PublicVerifyView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a temporary user for public verification
        temp_user, created = CustomUser.objects.get_or_create(
            email='public@veriflow.com',
            defaults={
                'first_name': 'Public',
                'last_name': 'User',
                'credits_remaining': 1000  # Give public user some credits
            }
        )

        # Dispatch the Celery task
        task = verify_email_task.delay(temp_user.id, email)

        # Return the task ID to the client
        return Response({'task_id': task.id}, status=status.HTTP_202_ACCEPTED)
