import React from 'react';
import { Link } from 'react-router-dom';

// --- Mock Icons (for standalone use) ---
const GoogleIcon = () => (
    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.93H12.25V14.4H18.2C17.92 15.93 17.03 17.23 15.63 18.13V20.75H19.44C21.48 18.91 22.56 15.83 22.56 12.25Z" fill="#4285F4"/>
        <path d="M12.25 23C15.47 23 18.17 21.93 20.06 20.1L16.25 17.5C15.13 18.23 13.78 18.63 12.25 18.63C9.31 18.63 6.78 16.7 5.74 14.1L1.78 14.1V16.79C3.67 20.48 7.64 23 12.25 23Z" fill="#34A853"/>
        <path d="M5.74 14.1C5.53 13.5 5.4 12.85 5.4 12.2C5.4 11.55 5.53 10.9 5.74 10.3L1.78 7.61C0.93 9.24 0.5 11.12 0.5 13C0.5 14.88 0.93 16.76 1.78 18.39L5.74 14.1Z" fill="#FBBC05"/>
        <path d="M12.25 5.38C13.96 5.38 15.34 5.96 16.5 7.04L20.14 3.4C18.17 1.58 15.47 0.5 12.25 0.5C7.64 0.5 3.67 3.52 1.78 7.21L5.74 9.9C6.78 7.3 9.31 5.38 12.25 5.38Z" fill="#EA4335"/>
    </svg>
);

const GitHubIcon = () => (
    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
);

export default function SignUpPage() {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-md p-8 border border-gray-200 rounded-2xl shadow-sm">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create an Account</h1>
            <p className="mt-2 text-gray-600">Start your journey with a free account.</p>
        </div>
        <form className="mt-8 space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input id="name" name="name" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign Up
                </button>
            </div>
        </form>
        
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <GoogleIcon />
                        Google
                    </button>
                </div>
                <div>
                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                       <GitHubIcon />
                        GitHub
                    </button>
                </div>
            </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Log in
            </Link>
        </p>
      </div>
    </div>
  );
}
