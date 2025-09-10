import React, { useState } from 'react';

// --- Mock Lucide Icons ---
const UploadCloud = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4-4"/></svg>
);
const FileText = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);
const Download = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);


const BulkVerify = () => {
    const [isDragActive, setIsDragActive] = useState(false);
    
    // Mock data for the history table
    const history = [
        { id: 1, name: 'marketing_leads_q3.csv', date: '2025-09-10', status: 'Completed', size: '10,000 emails' },
        { id: 2, name: 'sales_contacts_2025.txt', date: '2025-09-09', status: 'Processing', size: '2,500 emails' },
        { id: 3, name: 'newsletter_subscribers.csv', date: '2025-09-07', status: 'Completed', size: '50,000 emails' },
        { id: 4, name: 'failed_campaign.txt', date: '2025-09-05', status: 'Failed', size: '1,200 emails' },
    ];

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        // Handle file drop logic here
        console.log(e.dataTransfer.files);
    };

    const StatusBadge = ({ status }) => {
        const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
        switch (status) {
            case 'Completed':
                return <span className={`${baseClasses} bg-green-100 text-green-800`}>Completed</span>;
            case 'Processing':
                return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Processing</span>;
            case 'Failed':
                 return <span className={`${baseClasses} bg-red-100 text-red-800`}>Failed</span>;
            default:
                return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Unknown</span>;
        }
    }

    return (
        <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800">Bulk Verification</h1>
            <p className="text-gray-500 mt-2 mb-8">Upload a list of emails in CSV or TXT format for batch processing.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Uploader */}
                <div className="lg:col-span-1 space-y-6">
                    <div 
                        onDragEnter={handleDrag} 
                        onDragLeave={handleDrag} 
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                    >
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-4 font-semibold text-gray-700">Drag & drop your file here</p>
                        <p className="text-sm text-gray-500 mt-1">or</p>
                        <label htmlFor="file-upload" className="cursor-pointer mt-2 inline-block text-indigo-600 font-medium hover:text-indigo-800">
                            Choose a file
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="text-xs text-gray-400 mt-4">Supports: CSV, TXT (up to 10MB)</p>
                    </div>

                    {/* Instructions */}
                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <h3 className="font-semibold text-gray-700 flex items-center"><FileText className="h-5 w-5 mr-2" />File Formatting</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                            <li>One email address per line.</li>
                            <li>No headers or extra columns.</li>
                            <li>Save as .csv or .txt file.</li>
                        </ul>
                    </div>
                </div>

                {/* History Table */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Processing History</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3">File Name</th>
                                    <th scope="col" className="px-4 py-3">Upload Date</th>
                                    <th scope="col" className="px-4 py-3">Status</th>
                                    <th scope="col" className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map(item => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-900">{item.name} <p className="font-normal text-gray-500">{item.size}</p></td>
                                        <td className="px-4 py-3">{item.date}</td>
                                        <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                                        <td className="px-4 py-3 text-right">
                                            {item.status === 'Completed' && (
                                                <button className="text-indigo-600 hover:text-indigo-800 font-medium p-2 rounded-md hover:bg-indigo-50 flex items-center justify-end ml-auto">
                                                    <Download className="h-4 w-4 mr-1" />
                                                    Results
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
        </div>
    );
};

export default BulkVerify;
