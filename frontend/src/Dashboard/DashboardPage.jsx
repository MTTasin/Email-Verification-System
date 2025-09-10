import React from 'react';

export default function DashboardPage() {
  return (
    <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your Veriflow dashboard. Here's a quick overview of your account.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Credits Remaining</h3>
                <p className="text-4xl font-bold mt-2 text-indigo-600">4,350</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Emails Verified</h3>
                <p className="text-4xl font-bold mt-2 text-gray-800">12,890</p>
            </div>
             <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Current Plan</h3>
                <p className="text-4xl font-bold mt-2 text-gray-800">Pro Plan</p>
            </div>
        </div>
    </div>
  );
}
