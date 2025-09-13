from django.contrib import admin
from .models import CustomUser, SubscriptionPlan, BulkVerificationRequest, EmailResult, APIKey

admin.site.register(CustomUser)
admin.site.register(SubscriptionPlan)
admin.site.register(BulkVerificationRequest)
admin.site.register(EmailResult)
admin.site.register(APIKey)