import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import apiClient from '../API/ApiClient';

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
    const { user } = useOutletContext();
    const [stats, setStats] = useState({
        total_verifications: 0,
        deliverable_count: 0,
        undeliverable_count: 0,
        risky_count: 0,
        unknown_count: 0,
        invalid_count: 0,
        recent_bulk_jobs: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await apiClient.get('/api/user/dashboard-stats/');
            setStats(response.data);
        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const chartData = {
        labels: ['Deliverable', 'Undeliverable', 'Risky', 'Unknown', 'Invalid'],
        datasets: [{
            data: [
                stats.deliverable_count,
                stats.undeliverable_count,
                stats.risky_count,
                stats.unknown_count,
                stats.invalid_count
            ],
            backgroundColor: ['#10B981', '#EF4444', '#F59E0B', '#6B7280', '#DC2626'],
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
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome back, {user.first_name}!</h1>
                <p className="text-gray-500 mt-1 md:mt-2">Here's a summary of your account activity.</p>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Verifications" value={stats.total_verifications.toLocaleString()} icon={<CheckCircle2 className="h-6 w-6 text-green-600"/>} color="bg-green-100"/>
                <StatCard title="Credits Remaining" value={stats.credits_remaining?.toLocaleString() || 0} icon={<Coins className="h-6 w-6 text-indigo-600"/>} color="bg-indigo-100"/>
                <StatCard title="Deliverable Rate" value={stats.total_verifications > 0 ? `${Math.round((stats.deliverable_count / stats.total_verifications) * 100)}%` : 'N/A'} icon={<Clock className="h-6 w-6 text-yellow-600"/>} color="bg-yellow-100"/>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                
                {/* Recent Bulk Jobs - takes more space */}
                <div className="xl:col-span-3 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Bulk Jobs</h2>
                    <div className="space-y-4">
                        {loading ? (
                            <p className="text-gray-500">Loading...</p>
                        ) : stats.recent_bulk_jobs.length > 0 ? stats.recent_bulk_jobs.map((job, index) => (
                            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                <div className="mb-2 sm:mb-0">
                                    <p className="font-medium text-gray-800">{job.file_name}</p>
                                    <p className="text-sm text-gray-500">{job.total_emails} emails • {new Date(job.upload_timestamp).toLocaleDateString()}</p>
                                </div>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                    job.status === 'COMPLETE' ? 'bg-green-100 text-green-700' :
                                    job.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-700' :
                                    job.status === 'PENDING' ? 'bg-blue-100 text-blue-700' :
                                    'bg-red-100 text-red-700'
                                }`}>{job.status}</span>
                            </div>
                        )) : <p className="text-gray-500">No recent bulk jobs.</p>}
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

