import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// --- Mock Lucide Icons ---
const CheckCircle2 = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>;
const Clock = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const Coins = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82-.71-.71A3.99 3.99 0 0 1 12.17 14a4 4 0 0 1 2.82-1.17Z"/></svg>;

const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4">
            <div className={`rounded-full p-3 ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
};

const DashboardHome = () => {
    const user = { name: 'Alex' }; // Mock user
    const recentJobs = [
        { name: 'marketing_leads_q3.csv', count: '10,000 emails', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
        { name: 'sales_contacts.txt', count: '2,500 emails', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
        { name: 'newsletter_signup.csv', count: '500 emails', status: 'Processing', statusColor: 'bg-blue-100 text-blue-700' },
    ];
    const chartData = {
        labels: ['Deliverable', 'Undeliverable', 'Risky'],
        datasets: [{
            data: [75, 15, 10],
            backgroundColor: ['#10B981', '#EF4444', '#F59E0B'],
            borderColor: ['#ffffff'],
            borderWidth: 2,
        }],
    };
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 12,
                    padding: 20,
                    font: { size: 14 }
                }
            }
        },
        cutout: '70%',
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
                <p className="text-gray-500 mt-1 md:mt-2">Here's a summary of your account activity.</p>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Verifications" value="12,890" icon={<CheckCircle2 className="h-6 w-6 text-green-600"/>} color="bg-green-100"/>
                <StatCard title="Credits Remaining" value="4,350" icon={<Coins className="h-6 w-6 text-indigo-600"/>} color="bg-indigo-100"/>
                <StatCard title="Avg. Processing Time" value="2m 15s" icon={<Clock className="h-6 w-6 text-yellow-600"/>} color="bg-yellow-100"/>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                
                {/* Recent Bulk Jobs - takes more space */}
                <div className="xl:col-span-3 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Bulk Jobs</h2>
                    <div className="space-y-4">
                        {recentJobs.map((job, index) => (
                            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                <div className="mb-2 sm:mb-0">
                                    <p className="font-medium text-gray-800">{job.name}</p>
                                    <p className="text-sm text-gray-500">{job.count}</p>
                                </div>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${job.statusColor}`}>{job.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Deliverability Overview Chart - takes less space */}
                <div className="xl:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Deliverability Overview</h2>
                    <div className="h-64 lg:h-72 relative">
                        <Doughnut data={chartData} options={chartOptions} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardHome;

