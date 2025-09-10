import React, { useState } from 'react';

// --- Mock Lucide Icons ---
const User = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const Lock = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const AlertTriangle = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);


const Settings = () => {
    // Mock user data
    const [name, setName] = useState('Alex Doe');
    const [email, setEmail] = useState('alex.doe@example.com');

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-500 mt-2">Manage your account settings and preferences.</p>
            </div>

            {/* Profile Information */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                    <User className="h-5 w-5 mr-3 text-gray-500"/>
                    Profile Information
                </h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="text-right">
                        <button type="submit" className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* Change Password */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                    <Lock className="h-5 w-5 mr-3 text-gray-500"/>
                    Change Password
                </h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input type="password" id="current-password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" id="new-password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>

             {/* Danger Zone */}
            <div className="bg-white p-6 rounded-lg border border-red-300 shadow-sm">
                <h2 className="text-xl font-semibold text-red-700 flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 mr-3"/>
                    Danger Zone
                </h2>
                <p className="text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition">
                    Delete My Account
                </button>
            </div>
        </div>
    );
};

export default Settings;
