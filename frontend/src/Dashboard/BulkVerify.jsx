import React, { useState } from 'react';

// --- Mock Lucide Icons ---
const UploadCloud = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>;
const FileText = (props) => <svg {...props} xmlns="http://www.w.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>;
const Download = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;


const BulkVerify = () => {
    const [isDragOver, setIsDragOver] = useState(false);

    const recentJobs = [
        { name: 'marketing_leads_q3.csv', date: '2025-09-10', count: 10000, status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
        { name: 'sales_contacts.txt', date: '2025-09-09', count: 2500, status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
        { name: 'newsletter_signup.csv', date: '2025-09-08', count: 500, status: 'Processing', statusColor: 'bg-blue-100 text-blue-700' },
        { name: 'old_leads.csv', date: '2025-09-05', count: 50000, status: 'Failed', statusColor: 'bg-red-100 text-red-700' },
    ];
    
    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Bulk Verification</h1>
                <p className="text-gray-500 mt-1 md:mt-2">Upload a file to verify your email lists in bulk.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* File Upload */}
                <div 
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={() => setIsDragOver(false)}
                    className={`bg-white p-6 rounded-lg border-2 border-dashed ${isDragOver ? 'border-indigo-500' : 'border-gray-300'} shadow-sm text-center flex flex-col items-center justify-center transition-colors min-h-[200px]`}
                >
                    <UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="font-semibold text-gray-700">Drag & drop your file here</p>
                    <p className="text-gray-500 my-2">or</p>
                    <button className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">Choose a file</button>
                    <p className="text-xs text-gray-400 mt-4">Supports: CSV, TXT (up to 10MB)</p>
                </div>

                {/* File Formatting */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                        <FileText className="h-8 w-8 text-indigo-500" />
                        <h2 className="text-xl font-semibold text-gray-800">File Formatting</h2>
                    </div>
                    <ul className="space-y-3 text-gray-600 list-disc list-inside">
                        <li>One email address per line.</li>
                        <li>No headers or extra columns.</li>
                        <li>Save as a .csv or .txt file.</li>
                        <li>Ensure the file is UTF-8 encoded.</li>
                    </ul>
                </div>
            </div>

            {/* Processing History */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Processing History</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-200">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-gray-500">File Name</th>
                                <th className="p-3 text-sm font-semibold text-gray-500">Upload Date</th>
                                <th className="p-3 text-sm font-semibold text-gray-500">Emails</th>
                                <th className="p-3 text-sm font-semibold text-gray-500">Status</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentJobs.map((job, index) => (
                                <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800">{job.name}</td>
                                    <td className="p-3 text-gray-600">{job.date}</td>
                                    <td className="p-3 text-gray-600">{job.count.toLocaleString()}</td>
                                    <td className="p-3">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${job.statusColor}`}>{job.status}</span>
                                    </td>
                                    <td className="p-3 text-right">
                                        {job.status === 'Completed' && (
                                            <button className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition-colors">
                                                <Download className="h-5 w-5" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BulkVerify;

