from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework import parsers
from rest_framework import generics
from celery.result import AsyncResult

from .tasks import verify_email_task, process_bulk_file_task
from .models import EmailResult, BulkVerificationRequest
from .serializers import EmailResultSerializer, BulkVerificationRequestSerializer, UserSerializer

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

    def post(self, request, filename, format=None):
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
