from django.urls import path
from .views import SingleVerifyView, SingleVerifyResultView, MockBillingView, BulkVerifyView, BulkVerifyResultView, UserProfileView, DashboardStatsView

urlpatterns = [
    path('verify/single/', SingleVerifyView.as_view(), name='single-verify'),
    path('results/single/<str:task_id>/', SingleVerifyResultView.as_view(), name='single-verify-result'),
    path('billing/create-checkout-session/', MockBillingView.as_view(), name='mock-checkout'),
    path('verify/bulk/<str:filename>/', BulkVerifyView.as_view(), name='bulk-verify'),
    path('results/bulk/<int:request_id>/', BulkVerifyResultView.as_view(), name='bulk-verify-result'),
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('user/dashboard-stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
]
