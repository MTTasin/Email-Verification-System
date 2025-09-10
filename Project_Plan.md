**Project Plan: SaaS Email Verification Platform**

This document outlines a comprehensive plan for developing a Software-as-a-Service (SaaS) application for email verification. The frontend will be built with React, and the backend will be powered by Django.

**1\. Project Overview & Goals**

- **Vision:** To create a fast, reliable, and user-friendly platform for individuals and businesses to verify email addresses, reducing bounce rates and improving email marketing campaign effectiveness.
- **Core Functionality:** Offer single email verification, bulk verification via file upload, and a developer API.
- **Target Audience:** Digital marketers, sales teams, small to medium-sized businesses, and developers.

**2\. Technology Stack**

- **Frontend:** React, Tailwind CSS for styling, Axios for API calls.
- **Backend:** Django, Django REST Framework (DRF) for APIs, **dnspython** for DNS queries (MX record checks).
- **Database:** PostgreSQL.
- **Asynchronous Tasks:** Celery with Redis as the message broker to handle email verification without blocking the server.
- **Caching:** Redis for caching frequent queries and results.
- **Payment Processing:** Stripe for subscription management and payments.
- **Deployment:**
  - **Frontend:** Vercel or Netlify.
  - **Backend:** Docker, Gunicorn, Nginx on a cloud provider (e.g., DigitalOcean, AWS, Heroku).

**3\. Core Features**

1. **User Authentication:** Secure user registration, login, and password management.
2. **Dashboard:** A central hub for users to access all features, view stats, and manage their account.
3. **Single Email Verification:** An input field to quickly verify one email address.
4. **Bulk Email Verification:** Upload a list of emails (CSV or TXT) for batch processing.
5. **Verification Results:** Clear, categorized results (e.g., Deliverable, Undeliverable, Risky, Unknown) with detailed explanations.
6. **API Access:** Generate and manage API keys for programmatic verification.
7. **Subscription & Billing:** Tiered pricing plans with credit-based usage, managed via Stripe.
8. **User Profile Management:** Update personal information and password.

**4\. Frontend (React) - Component Breakdown**

**A. Public/Marketing Pages**

1. **Header (&lt;Header /&gt;)**
    - Logo
    - Navigation Links: Features, Pricing, API Docs, Login
    - CTA Button: "Sign Up Free"
2. **Landing Page (&lt;LandingPage /&gt;)**
    - **Hero Section:**
        - Compelling Headline: "Clean Your Email Lists, Boost Your Deliverability."
        - Sub-headline: Briefly explain the value proposition.
        - Simple Input Field: Allow visitors to test the verifier with one email.
        - CTA Button: "Get Started for Free"
    - **Features Section:**
        - Icon-based cards detailing key features (Syntax Check, MX Record Check, SMTP Verification, etc.).
        - Brief description for each feature.
    - **"How It Works" Section:**
        - A simple 3-step visual guide: 1. Upload List -> 2. We Verify -> 3. Download Clean List.
    - **Pricing Section:**
        - Tiered pricing cards (e.g., Free, Starter, Pro).
        - Clearly list the number of credits/verifications and features for each tier.
        - Toggle for Monthly/Annual pricing.
    - **FAQ Section:**
        - Accordion-style list of common questions.
    - **Footer (&lt;Footer /&gt;)**
        - Links to social media, terms of service, privacy policy, contact info.

**B. Authentication Pages (&lt;AuthLayout /&gt;)**

1. **Sign Up Page (&lt;SignUp /&gt;)**
    - Form with fields: Name, Email, Password.
    - Social login options (Google, GitHub).
    - Link to Login page.
2. **Login Page (&lt;Login /&gt;)**
    - Form with fields: Email, Password.
    - "Forgot Password?" link.
    - Link to Sign Up page.

**C. User Dashboard (Protected Routes)**

1. **Dashboard Layout (&lt;DashboardLayout /&gt;)**
    - **Sidebar Navigation:**
        - Links to: Dashboard, Verify Single, Verify Bulk, API Keys, Billing, Settings.
        - Display user's remaining credits.
    - **Top Bar:**
        - User profile dropdown (My Account, Logout).
2. **Main Dashboard (&lt;DashboardHome /&gt;)**
    - Welcome message.
    - Key Stats: Total verifications, credits remaining, deliverable vs. undeliverable chart.
    - List of recent bulk verification jobs.
3. **Single Verification (&lt;SingleVerify /&gt;)**
    - Large input field and "Verify" button.
    - Results display area below, showing status, and detailed SMTP logs.
4. **Bulk Verification (&lt;BulkVerify /&gt;)**
    - Drag-and-drop file upload component (supports CSV, TXT).
    - Instructions on file formatting.
    - Table showing processing history: File Name, Upload Date, Status (Processing, Complete), Download Results button.
5. **API Keys (&lt;ApiKeys /&gt;)**
    - Button to "Generate New API Key".
    - Display current API key with a "Copy" button and a "Revoke" button.
    - Simple API usage documentation/examples.
6. **Billing (&lt;Billing /&gt;)**
    - Display current plan.
    - "Upgrade Plan" button.
    - Stripe-hosted portal to manage payment methods and view invoices.

**5\. Backend (Django) - API & Database Model Breakdown**

**A. Database Models (models.py)**

- **CustomUser**: Extends Django's AbstractUser. Adds fields for credits_remaining and a foreign key to a SubscriptionPlan.
- **SubscriptionPlan**: Fields: name (Free, Pro), price, credits_per_month.
- **BulkVerificationRequest**: Tracks bulk jobs. Fields: user (FK), file_path, status (pending, processing, complete), upload_timestamp.
- **EmailResult**: Stores individual results. Fields: request (FK), email_address, status (deliverable, risky, etc.), syntax_valid, mx_found, smtp_check, is_disposable, timestamp.
- **APIKey**: Simple model to store hashed API keys linked to a user.

**B. API Endpoints (DRF - urls.py & views.py)**

- **Authentication (/api/auth/)**
  - POST /register/: Create a new user.
  - POST /login/: Obtain JWT tokens (access and refresh).
  - POST /token/refresh/: Refresh an access token.
- **Verification (/api/verify/)**
  - POST /single/:
    - Accepts { "email": "<test@example.com>" }.
    - Deducts 1 credit from the user.
    - Creates a Celery task to perform the verification.
    - Returns a task ID immediately.
  - POST /bulk/:
    - Handles multipart file upload.
    - Creates a BulkVerificationRequest object.
    - Creates a Celery task to process the file row by row.
    - Returns the request ID.
- **Results (/api/results/)**
  - GET /single/{task_id}/: Poll this endpoint to get the result of a single verification task.
  - GET /bulk/{request_id}/: Get the status and results of a bulk verification job.
- **User Management (/api/user/)**
  - GET, PUT /profile/: Manage user profile details.
  - GET /dashboard-stats/: Endpoint to fetch data for the dashboard charts.
- **API Keys (/api/keys/)**
  - GET, POST /: List and create API keys.
  - DELETE /{key_id}/: Revoke an API key.
- **Billing (/api/billing/) (Currently Just make it mock payment. Do a mock payment like the stripe)**
  - POST /create-checkout-session/: Creates a Stripe checkout session for plan upgrades.
  - POST /webhook/: Handles webhooks from Stripe to update user subscriptions and credits.

**6\. Development Roadmap**

**Phase 1: MVP (Minimum Viable Product)**

- **Goal:** Launch a functional product with core features.
- **Tasks:**
    1. Setup Django backend with DRF.
    2. Implement user registration and JWT authentication.
    3. Create core email verification logic (syntax, MX, basic SMTP).
    4. Integrate Celery & Redis for asynchronous single verification.
    5. Build React frontend with login, signup, and a simple dashboard.
    6. Implement the Single Verification page.
    7. Integrate Stripe for one paid plan.
    8. Deploy the initial version.

**Phase 2: Core Features Expansion**

- **Goal:** Add bulk processing and API access.
- **Tasks:**
    1. Implement bulk file upload backend logic.
    2. Create Celery tasks for processing large files efficiently.
    3. Build the Bulk Verification page on the frontend to upload files and view job history.
    4. Implement API key generation and management.
    5. Create a simple, secure API endpoint for programmatic verification.
    6. Add more pricing tiers.

**Phase 3: Scaling & User Experience**

- **Goal:** Refine the product and improve performance.
- **Tasks:**
    1. Improve the accuracy of the verification engine (e.g., better disposable provider lists, role-based account detection).
    2. Build out the user profile and billing management pages.
    3. Create API documentation.
    4. Enhance the dashboard with more detailed analytics and charts.
    5. Optimize database queries and Celery worker performance.