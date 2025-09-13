from rest_framework import serializers
from .models import EmailResult, BulkVerificationRequest, CustomUser, APIKey

class EmailResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailResult
        fields = ['task_id', 'email_address', 'status', 'syntax_valid', 'mx_found', 'smtp_check', 'is_disposable', 'timestamp']

class BulkVerificationRequestSerializer(serializers.ModelSerializer):
    results = EmailResultSerializer(many=True, read_only=True) # Nested serializer for results

    class Meta:
        model = BulkVerificationRequest
        fields = ['id', 'user', 'file', 'status', 'upload_timestamp', 'completed_timestamp', 'results']
        read_only_fields = ['user', 'file', 'status', 'upload_timestamp', 'completed_timestamp']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'credits_remaining', 'first_name', 'last_name']
        read_only_fields = ['email', 'credits_remaining'] # Email and credits are not directly editable via profile

class APIKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = APIKey
        fields = ['id', 'name', 'prefix', 'created']
        read_only_fields = ['prefix', 'created']
