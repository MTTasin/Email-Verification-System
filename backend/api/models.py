from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class CustomUser(AbstractUser):
    # We are using email as the unique identifier instead of username
    username = models.CharField(max_length=150, unique=False, blank=True, null=True)
    email = models.EmailField(unique=True)
    
    credits_remaining = models.PositiveIntegerField(default=100)
    subscription_plan = models.ForeignKey(
        'SubscriptionPlan',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # email and password are required by default

    def __str__(self):
        return self.email

class SubscriptionPlan(models.Model):
    name = models.CharField(max_length=50, unique=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    credits_per_month = models.PositiveIntegerField()

    def __str__(self):
        return self.name

class BulkVerificationRequest(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        PROCESSING = 'PROCESSING', 'Processing'
        COMPLETE = 'COMPLETE', 'Complete'
        FAILED = 'FAILED', 'Failed'

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bulk_requests')
    file = models.FileField(upload_to='bulk_files/')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    upload_timestamp = models.DateTimeField(auto_now_add=True)
    completed_timestamp = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Bulk request by {self.user.email} at {self.upload_timestamp}"

class EmailResult(models.Model):
    class Status(models.TextChoices):
        DELIVERABLE = 'DELIVERABLE', 'Deliverable'
        UNDELIVERABLE = 'UNDELIVERABLE', 'Undeliverable'
        RISKY = 'RISKY', 'Risky'
        UNKNOWN = 'UNKNOWN', 'Unknown'
        INVALID = 'INVALID', 'Invalid'

    task_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    email_address = models.EmailField()
    status = models.CharField(max_length=20, choices=Status.choices)
    syntax_valid = models.BooleanField(default=False)
    mx_found = models.BooleanField(default=False)
    smtp_check = models.BooleanField(default=False)
    is_disposable = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    bulk_request = models.ForeignKey(
        BulkVerificationRequest,
        on_delete=models.CASCADE,
        related_name='results',
        null=True,
        blank=True
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='email_results')

    def __str__(self):
        return f"{self.email_address} - {self.status}"

class APIKey(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='api_keys')
    prefix = models.CharField(max_length=8, unique=True)
    hashed_key = models.CharField(max_length=64)
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"API Key {self.name} for {self.user.email}"