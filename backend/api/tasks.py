from celery import shared_task
from email_validator import validate_email, EmailNotValidError
import dns.resolver
import smtplib
import os

from django.conf import settings
from django.db import transaction

from .models import CustomUser, EmailResult, BulkVerificationRequest

@shared_task(bind=True)
def verify_email_task(self, user_id, email_address, bulk_request_id=None):
    """
    Celery task to verify a single email address.
    The `bind=True` argument gives us access to the task instance (`self`).
    """
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return f"User with id {user_id} not found."

    task_id = self.request.id

    # --- Step 1: Syntax and MX Record Validation --- #
    try:
        validation = validate_email(email_address, check_deliverability=True)
        email_address = validation.normalized
    except EmailNotValidError as e:
        EmailResult.objects.create(
            user=user,
            task_id=task_id,
            email_address=email_address,
            status=EmailResult.Status.INVALID,
            bulk_request_id=bulk_request_id
        )
        return f"Invalid email {email_address}: {str(e)}"

    # --- Step 2: SMTP Deliverability Check --- #
    domain = email_address.split('@')[1]
    smtp_check_passed = False
    final_status = EmailResult.Status.UNKNOWN
    
    try:
        mx_records = dns.resolver.resolve(domain, 'MX')
        mx_record = sorted(mx_records, key=lambda record: record.preference)[0].exchange.to_text()

        with smtplib.SMTP(mx_record, timeout=10) as server:
            server.set_debuglevel(0)
            server.ehlo_or_helo_if_needed()
            server.mail('verify@example.com')
            code, message = server.rcpt(email_address)
            
            if code == 250:
                smtp_check_passed = True
                final_status = EmailResult.Status.DELIVERABLE
            elif code == 550:
                smtp_check_passed = False
                final_status = EmailResult.Status.UNDELIVERABLE
            else:
                final_status = EmailResult.Status.RISKY

    except (smtplib.SMTPException, dns.resolver.NoAnswer, dns.resolver.NXDOMAIN, TimeoutError) as e:
        final_status = EmailResult.Status.UNKNOWN
        print(f"SMTP check failed for {email_address}: {str(e)}")

    # --- Step 3: Store Final Result --- #
    EmailResult.objects.create(
        user=user,
        task_id=task_id,
        email_address=email_address,
        status=final_status,
        syntax_valid=True,
        mx_found=True,
        smtp_check=smtp_check_passed,
        bulk_request_id=bulk_request_id
    )

    return f"Verification complete for {email_address}: {final_status}"

@shared_task(bind=True)
def process_bulk_file_task(self, bulk_request_id):
    """
    Celery task to process a bulk email verification file.
    """
    try:
        bulk_request = BulkVerificationRequest.objects.get(id=bulk_request_id)
        user = bulk_request.user
    except BulkVerificationRequest.DoesNotExist:
        return f"Bulk request with id {bulk_request_id} not found."

    bulk_request.status = BulkVerificationRequest.Status.PROCESSING
    bulk_request.save(update_fields=['status'])

    file_path = bulk_request.file.path
    processed_count = 0
    
    try:
        with open(file_path, 'r') as f:
            for line in f:
                email_address = line.strip()
                if email_address:
                    # Check if user has enough credits before dispatching task
                    # This is a simplified check; a more robust system might use a credit pool
                    with transaction.atomic():
                        user.refresh_from_db() # Ensure we have the latest credit count
                        if user.credits_remaining <= 0:
                            print(f"User {user.email} ran out of credits. Stopping bulk processing.")
                            bulk_request.status = BulkVerificationRequest.Status.FAILED # Or PARTIAL_COMPLETE
                            bulk_request.save(update_fields=['status'])
                            return f"Bulk processing stopped for {bulk_request_id}: Insufficient credits."
                        
                        user.credits_remaining -= 1
                        user.save(update_fields=['credits_remaining'])

                    # Dispatch single verification task for each email
                    verify_email_task.delay(user.id, email_address, bulk_request_id=bulk_request_id)
                    processed_count += 1

        bulk_request.status = BulkVerificationRequest.Status.COMPLETE
        bulk_request.save(update_fields=['status'])
        return f"Bulk processing for {bulk_request_id} completed. Processed {processed_count} emails."

    except Exception as e:
        bulk_request.status = BulkVerificationRequest.Status.FAILED
        bulk_request.save(update_fields=['status'])
        return f"Bulk processing for {bulk_request_id} failed: {str(e)}"
    finally:
        # Clean up the uploaded file after processing
        if os.path.exists(file_path):
            os.remove(file_path)
