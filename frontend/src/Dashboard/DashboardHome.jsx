import React from 'react';

// Mock Lucide Icons (for standalone use)
const BarChart2 = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
);
const Coins = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" /></svg>
);
const CheckCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const DashboardHome = () => {
    // Mock data - replace with real data from your backend
    const user = { name: 'Alex' };
    const stats = {
        totalVerifications: '12,890',
        creditsRemaining: '4,350',
    };
    const recentJobs = [
        { id: 1, name: 'marketing_leads_q3.csv', count: '10,000 emails', status: 'Completed', statusColor: 'text-green-600 bg-green-100' },
        { id: 2, name: 'sales_contacts.txt', count: '2,500 emails', status: 'Completed', statusColor: 'text-green-600 bg-green-100' },
        { id: 3, name: 'newsletter_signup_list.csv', count: '500 emails', status: 'Processing...', statusColor: 'text-blue-600 bg-blue-100' },
    ];

    return (
        <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.name}!</h1>
            <p className="text-gray-500 mb-8">Here's a summary of your account activity.</p>

            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Verifications" value={stats.totalVerifications} icon={<BarChart2 className="h-6 w-6 text-indigo-600"/>} color="bg-indigo-100" />
                <StatCard title="Credits Remaining" value={stats.creditsRemaining} icon={<Coins className="h-6 w-6 text-green-600"/>} color="bg-green-100" />
                
                {/* Deliverability Chart Placeholder */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Deliverability Overview</h3>
                    <div className="flex items-end h-32 space-x-4">
                       <div className="w-1/3 text-center">
                           <div className="bg-green-400 h-full rounded-t-md" style={{height: '92%'}}></div>
                           <p className="text-xs mt-1 text-gray-500">Deliverable</p>
                       </div>
                        <div className="w-1/3 text-center">
                           <div className="bg-red-400 h-1/2 rounded-t-md" style={{height: '8%'}}></div>
                           <p className="text-xs mt-1 text-gray-500">Undeliverable</p>
                       </div>
                       <div className="w-1/3 text-center">
                           <div className="bg-yellow-400 h-1/4 rounded-t-md" style={{height: '15%'}}></div>
                           <p className="text-xs mt-1 text-gray-500">Risky</p>
                       </div>
                    </div>
                </div>
            </div>
            
            {/* Recent Bulk Jobs */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Bulk Jobs</h2>
                <div className="bg-white rounded-lg border border-gray-200">
                    <ul className="divide-y divide-gray-200">
                        {recentJobs.map(job => (
                            <li key={job.id} className="p-4 flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="font-medium text-gray-800">{job.name}</p>
                                        <p className="text-sm text-gray-500">{job.count}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${job.statusColor}`}>{job.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
