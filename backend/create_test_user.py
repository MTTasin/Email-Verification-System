#!/usr/bin/env python
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import CustomUser

def create_test_user():
    email = 'test@example.com'
    password = 'password123'
    
    # Check if user already exists
    if CustomUser.objects.filter(email=email).exists():
        print(f"User {email} already exists!")
        user = CustomUser.objects.get(email=email)
        print(f"User ID: {user.id}")
        print(f"Credits: {user.credits_remaining}")
        return user
    
    # Create new user
    user = CustomUser.objects.create_user(
        email=email,
        password=password,
        first_name='Test',
        last_name='User'
    )
    
    print(f"Created user: {email}")
    print(f"Password: {password}")
    print(f"User ID: {user.id}")
    print(f"Credits: {user.credits_remaining}")
    
    return user

if __name__ == '__main__':
    create_test_user()
