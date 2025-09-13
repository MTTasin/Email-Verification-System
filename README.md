# Email Verification System

This is a full-stack email verification system designed to validate email addresses through various checks. It provides a user-friendly interface for single and bulk email verification, an API for integration, and a dashboard for managing account settings and API keys.

## Features

*   **Single Email Verification:** Quickly verify a single email address.
*   **Bulk Email Verification:** Upload a list of emails for batch verification.
*   **API Integration:** Use API keys to integrate the verification service into your own applications.
*   **User Dashboard:** Manage your account, view verification history, and access API keys.
*   **User Authentication:** Secure user sign-up and login functionality.
*   **Asynchronous Task Processing:** Utilizes Celery and Redis for non-blocking email verification tasks.
*   **Containerized Application:** Docker and Docker Compose for easy setup and deployment.

## Tech Stack

### Backend

*   **Framework:** Django
*   **API:** Django REST Framework
*   **Asynchronous Tasks:** Celery
*   **Message Broker:** Redis
*   **Database:** PostgreSQL (or other Django-supported database)
*   **Language:** Python

### Frontend

*   **Framework:** React
*   **Build Tool:** Vite
*   **State Management:** Redux Toolkit
*   **Styling:** Tailwind CSS
*   **Linting:** ESLint
*   **Language:** JavaScript (JSX)

### DevOps

*   **Containerization:** Docker, Docker Compose

## Getting Started

### Prerequisites

*   Python
*   Node.js
*   Docker
*   Docker Compose

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Email-Verification-System.git
    cd Email-Verification-System
    ```

2.  **Environment Variables:**
    Create a `.env` file in the root directory and add the necessary environment variables for the backend and frontend. You can refer to the `backend/backend/settings.py` and frontend Dockerfile for required variables.

3.  **Build and run the application:**
    ```bash
    docker-compose up --build
    ```

The application will be available at `http://localhost:5173` (frontend) and the backend API at `http://localhost:8000`.

## Project Structure

```
Email-Verification-System/
├── backend/                # Django backend
│   ├── api/                # Django app for the API
│   ├── backend/            # Django project settings
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/               # React frontend
│   ├── src/
│   │   ├── API/            # Redux Toolkit store and API client
│   │   ├── Components/     # Reusable React components
│   │   ├── Dashboard/      # Dashboard-specific components
│   │   └── Pages/          # Top-level page components
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Docker Compose configuration
└── README.md
```

## API Endpoints

The backend API provides several endpoints for user authentication and email verification. Refer to `backend/api/urls.py` for a full list of endpoints.

*   `/api/register/`
*   `/api/login/`
*   `/api/verify/`
*   `/api/bulk-verify/`
*   `/api/keys/`

## Contributing

Contributions are welcome! Please feel free to submit a pull request.
