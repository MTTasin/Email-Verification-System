import React, { useState } from 'react';
import apiClient from '../API/ApiClient';

// --- Mock Lucide Icons (for standalone use) ---
const CheckIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const UploadIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
);


export default function Hero() {
    const [email, setEmail] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!email) return;
        
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            // Use public verification endpoint (no auth required)
            const response = await apiClient.post('/api/verify/public/', { email });
            
            // Poll for result
            const pollForResult = async (taskId) => {
                try {
                    const resultResponse = await apiClient.get(`/api/results/single/${taskId}/`);
                    if (resultResponse.data.status === 'PENDING') {
                        setTimeout(() => pollForResult(taskId), 2000);
                    } else {
                        setResult(resultResponse.data);
                        setLoading(false);
                    }
                } catch (err) {
                    setError('Failed to get verification result');
                    setLoading(false);
                }
            };
            
            pollForResult(response.data.task_id);
        } catch (err) {
            console.error('Verification error:', err);
            setError(err.response?.data?.error || 'Verification failed. Please try again.');
            setLoading(false);
        }
    };

    const getResultColor = () => {
        if (!result) return '';
        switch (result.status) {
            case 'DELIVERABLE': return 'text-green-600';
            case 'UNDELIVERABLE': return 'text-red-600';
            case 'RISKY': return 'text-yellow-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#4A00E0] to-[#8E2DE2] text-white animate-fadeIn">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                    Clean Your Email Lists,<br /> Boost Your Deliverability.
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-100">
                    Our powerful and accurate email verifier removes invalid addresses, reduces bounce rates, and protects your sender reputation.
                </p>

                {/* Main Verification Card */}
                <div className="bg-white text-gray-800 rounded-xl shadow-2xl p-8 max-w-2xl mx-auto transform transition-transform hover:scale-[1.02] duration-500 mt-10">
                    <h2 className="text-xl font-semibold mb-4">Test our free email verifier</h2>
                    <form onSubmit={handleVerify} className="flex flex-col sm:flex-row shadow-md rounded-lg">
                        <input 
                            type="email" 
                            placeholder="email@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-5 py-4 text-lg border-gray-300 border sm:border-r-0 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <button 
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center bg-yellow-400 text-purple-900 font-bold px-6 py-4 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none hover:bg-yellow-500 transition-colors duration-300 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-purple-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                            ) : (
                                <CheckIcon className="w-6 h-6 mr-2" />
                            )}
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>
                    </form>
                    
                    {/* Result Display */}
                    {result && (
                        <div className={`mt-4 p-4 rounded-lg border-2 ${getResultColor()} bg-opacity-10`}>
                            <div className="flex items-center justify-center space-x-2">
                                <CheckIcon className="w-5 h-5" />
                                <span className="font-semibold">{result.status}</span>
                            </div>
                            <p className="text-sm mt-2 text-gray-600">
                                {result.status === 'DELIVERABLE' && 'This email address is valid and can receive emails.'}
                                {result.status === 'UNDELIVERABLE' && 'This email address is invalid or cannot receive emails.'}
                                {result.status === 'RISKY' && 'This email address might be risky or temporary.'}
                                {result.status === 'UNKNOWN' && 'Unable to determine the status of this email address.'}
                            </p>
                        </div>
                    )}
                    
                    {error && (
                        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                </div>
                
                <div className="mt-12">
                     <a href="#" className="bg-yellow-400 text-purple-900 font-bold py-3 px-10 rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Get Started for Free
                    </a>
                </div>
                 <p className="mt-4 text-sm text-indigo-200">
                    100 free verifications. No credit card required.
                </p>

            </div>
             <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

