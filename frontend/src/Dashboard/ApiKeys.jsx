import React, { useState } from 'react';

// --- Mock Lucide Icons ---
const KeyRound = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>
);
const Copy = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);
const Check = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const Trash2 = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);

const ApiKeys = () => {
    const [apiKey, setApiKey] = useState('vf_live_xxxxxxxxxxxxxxxxx_abcd123');
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState('curl');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    const generateNewKey = () => {
        // In a real app, this would make an API call
        const newKey = 'vf_live_' + Math.random().toString(36).substring(2) + '_wxyz789';
        setApiKey(newKey);
    }
    
    const revokeKey = () => {
         // In a real app, this would make an API call
        setApiKey(null);
    }

    const codeExamples = {
        curl: `curl -X POST "https://api.veriflow.com/v1/verify" \\
-H "Authorization: Bearer ${apiKey || 'YOUR_API_KEY'}" \\
-H "Content-Type: application/json" \\
-d '{"email": "contact@example.com"}'`,
        javascript: `fetch('https://api.veriflow.com/v1/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey || 'YOUR_API_KEY'}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email: 'contact@example.com' })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
        python: `import requests

url = "https://api.veriflow.com/v1/verify"
payload = {"email": "contact@example.com"}
headers = {
    "Authorization": f"Bearer ${apiKey || 'YOUR_API_KEY'}",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`
    };

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">API Keys</h1>
            <p className="text-gray-500 mt-2 mb-8">Manage and generate API keys to integrate Veriflow into your applications.</p>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Your API Key</h2>
                    <button onClick={generateNewKey} className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                        Generate New Key
                    </button>
                </div>
                {apiKey ? (
                    <div className="mt-4 flex items-center gap-2 bg-gray-50 p-3 rounded-lg border">
                        <KeyRound className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        <input type="text" readOnly value={apiKey} className="w-full font-mono bg-transparent text-gray-700 outline-none"/>
                        <button onClick={copyToClipboard} className="flex-shrink-0 bg-gray-200 font-semibold px-4 py-2 rounded-md hover:bg-gray-300 transition text-sm flex items-center">
                           {copied ? <Check className="h-4 w-4 mr-1 text-green-600"/> : <Copy className="h-4 w-4 mr-1"/>}
                           {copied ? 'Copied!' : 'Copy'}
                        </button>
                         <button onClick={revokeKey} className="flex-shrink-0 bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-md hover:bg-red-200 transition text-sm flex items-center">
                           <Trash2 className="h-4 w-4 mr-1"/> Revoke
                        </button>
                    </div>
                ) : (
                    <div className="mt-4 text-center py-8 bg-gray-50 rounded-lg border">
                        <p className="text-gray-500">You don't have an active API key.</p>
                        <p className="text-gray-500">Generate one to get started!</p>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">API Usage Examples</h2>
                 <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('curl')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'curl' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>cURL</button>
                        <button onClick={() => setActiveTab('javascript')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'javascript' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>JavaScript</button>
                        <button onClick={() => setActiveTab('python')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'python' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Python</button>
                    </nav>
                </div>
                <div className="bg-gray-900 text-white font-mono text-sm rounded-b-lg p-4 overflow-x-auto">
                    <pre><code>{codeExamples[activeTab]}</code></pre>
                </div>
            </div>
        </div>
    );
};

export default ApiKeys;
