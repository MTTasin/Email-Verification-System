import React, { useState } from 'react';

// --- Mock Lucide Icons ---
const CheckCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const XCircle = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
);
const AlertTriangle = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);


const SingleVerify = () => {
    const [email, setEmail] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleVerify = (e) => {
        e.preventDefault();
        if (!email) return;
        setIsLoading(true);
        setResult(null);

        // Mock API call to simulate verification
        setTimeout(() => {
            const statuses = [
                { 
                    status: 'Deliverable', 
                    color: 'green',
                    icon: <CheckCircle className="h-6 w-6 text-green-500"/>,
                    reason: "This email address is valid and can receive emails.",
                    logs: [
                        "220 mx.google.com ESMTP ...",
                        "EHLO a.b.c.d",
                        "250-mx.google.com at your service...",
                        "MAIL FROM:<test@example.com>",
                        "250 2.1.0 OK ...",
                        "RCPT TO:<" + email + ">",
                        "250 2.1.5 OK ...",
                        "QUIT",
                        "221 2.0.0 closing connection ..."
                    ]
                },
                { 
                    status: 'Undeliverable', 
                    color: 'red',
                    icon: <XCircle className="h-6 w-6 text-red-500"/>,
                    reason: "The mailbox does not exist or the domain is invalid.",
                     logs: [
                        "220 mx.google.com ESMTP ...",
                        "EHLO a.b.c.d",
                        "250-mx.google.com at your service...",
                        "MAIL FROM:<test@example.com>",
                        "250 2.1.0 OK ...",
                        "RCPT TO:<" + email + ">",
                        "550 5.1.1 The email account that you tried to reach does not exist...",
                        "QUIT"
                    ]
                },
                { 
                    status: 'Risky', 
                    color: 'yellow',
                    icon: <AlertTriangle className="h-6 w-6 text-yellow-500"/>,
                    reason: "This might be a temporary or accept-all address.",
                    logs: [
                        "220 serv.com ESMTP ...",
                        "EHLO a.b.c.d",
                        "250-serv.com at your service...",
                        "MAIL FROM:<test@example.com>",
                        "250 2.1.0 OK ...",
                        "RCPT TO:<" + email + ">",
                        "250 2.1.5 OK (Accept All)...",
                    ]
                },
            ];
            setResult(statuses[Math.floor(Math.random() * statuses.length)]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">Single Email Verification</h1>
            <p className="text-gray-500 mt-2 mb-8">Quickly check a single email address for validity and deliverability.</p>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                 <form onSubmit={handleVerify} className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., contact@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-lg"
                        required
                    />
                    <button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center text-lg">
                        {isLoading ? <span className="loader"></span> : 'Verify'}
                    </button>
                </form>
            </div>

            {isLoading && (
                <div className="text-center p-10">
                    <div className="loader-lg"></div>
                    <p className="mt-4 text-gray-600 font-medium">Verifying email...</p>
                </div>
            )}

            {result && (
                <div className="mt-8 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Verification Result</h2>
                        <div className="flex items-center gap-3 mt-4">
                            {result.icon}
                            <div>
                                <p className={`text-2xl font-bold text-${result.color}-600`}>{result.status}</p>
                                <p className="text-gray-600">{result.reason}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">SMTP Logs</h3>
                        <div className="bg-gray-900 text-white font-mono text-sm rounded-lg p-4 overflow-x-auto">
                            {result.logs.map((log, index) => (
                                <p key={index} className="whitespace-pre">{log}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .loader {
                    width: 20px;
                    height: 20px;
                    border: 3px solid #FFF;
                    border-bottom-color: transparent;
                    border-radius: 50%;
                    display: inline-block;
                    box-sizing: border-box;
                    animation: rotation 1s linear infinite;
                }
                 .loader-lg {
                    width: 48px;
                    height: 48px;
                    border: 5px solid #DDD;
                    border-bottom-color: #6366f1;
                    border-radius: 50%;
                    display: inline-block;
                    box-sizing: border-box;
                    animation: rotation 1s linear infinite;
                }
                @keyframes rotation {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default SingleVerify;
