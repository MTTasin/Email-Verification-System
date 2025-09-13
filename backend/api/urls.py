from django.urls import path
from .views import (
    SingleVerifyView, SingleVerifyResultView, MockBillingView, BulkVerifyView, BulkVerifyResultView, 
    UserProfileView, DashboardStatsView, APIKeyListView, APIKeyDetailView, 
    StripeCheckoutView, StripeWebhookView, SubscriptionPlansView, TestAuthView, PublicVerifyView
)

urlpatterns = [
    path('verify/single/', SingleVerifyView.as_view(), name='single-verify'),
    path('results/single/<str:task_id>/', SingleVerifyResultView.as_view(), name='single-verify-result'),
    path('verify/bulk/<str:filename>/', BulkVerifyView.as_view(), name='bulk-verify'),
    path('results/bulk/<int:request_id>/', BulkVerifyResultView.as_view(), name='bulk-verify-result'),
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('user/dashboard-stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    
    # API Keys
    path('keys/', APIKeyListView.as_view(), name='api-keys-list'),
    path('keys/<int:pk>/', APIKeyDetailView.as_view(), name='api-keys-detail'),
    
    # Billing & Subscriptions
    path('billing/create-checkout-session/', StripeCheckoutView.as_view(), name='stripe-checkout'),
    path('billing/webhook/', StripeWebhookView.as_view(), name='stripe-webhook'),
    path('billing/plans/', SubscriptionPlansView.as_view(), name='subscription-plans'),
    path('billing/mock-payment/', MockBillingView.as_view(), name='mock-checkout'),
    
    # Test endpoint
    path('test/', TestAuthView.as_view(), name='test-auth'),
    
    # Public verification (no auth required)
    path('verify/public/', PublicVerifyView.as_view(), name='public-verify'),
]
