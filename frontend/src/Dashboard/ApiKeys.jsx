import React, { useState } from 'react';

// --- Mock Lucide Icons ---
const KeyRound = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>;
const Copy = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const Trash2 = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;

const CodeBlock = ({ code }) => (
    <pre className="bg-gray-800 text-white p-4 rounded-lg text-sm font-mono overflow-x-auto">
        <code>{code}</code>
    </pre>
);

const ApiKeys = () => {
    const [apiKey, setApiKey] = useState('sk_live_xxxxxxxxxxxxxxxxx1234');
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState('curl');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    const generateNewKey = () => {
        setApiKey(`sk_live_${[...Array(25)].map(() => Math.random().toString(36)[2]).join('')}`);
    };

    const codeExamples = {
        curl: `curl -X POST "https://api.veriflow.com/v1/verify" \\
-H "Authorization: Bearer ${apiKey}" \\
-H "Content-Type: application/json" \\
-d '{"email": "contact@example.com"}'`,
        javascript: `fetch('https://api.veriflow.com/v1/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email: 'contact@example.com' })
})
.then(response => response.json())
.then(data => console.log(data));`,
        python: `import requests

url = "https://api.veriflow.com/v1/verify"
headers = {
    "Authorization": f"Bearer ${apiKey}",
    "Content-Type": "application/json"
}
data = {"email": "contact@example.com"}

response = requests.post(url, json=data, headers=headers)
print(response.json())`
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">API Keys</h1>
                <p className="text-gray-500 mt-1 md:mt-2">Manage and generate API keys to integrate Veriflow into your applications.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm max-w-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Your API Key</h2>
                        <p className="text-gray-500 text-sm mt-1">Use this key in your application's backend.</p>
                    </div>
                    <button onClick={generateNewKey} className="mt-3 sm:mt-0 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm">
                        Generate New Key
                    </button>
                </div>
                <div className="mt-4 flex items-center space-x-2 p-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <KeyRound className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <input type="text" readOnly value={apiKey} className="w-full font-mono bg-transparent text-gray-700 text-sm focus:outline-none" />
                    <button onClick={copyToClipboard} className="flex items-center space-x-2 bg-gray-200 font-semibold px-3 py-1.5 rounded-md hover:bg-gray-300 transition text-sm text-gray-700">
                        <Copy className="h-4 w-4" />
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                     <button className="flex items-center space-x-2 bg-red-100 text-red-700 font-semibold px-3 py-1.5 rounded-md hover:bg-red-200 transition text-sm">
                        <Trash2 className="h-4 w-4" />
                        <span>Revoke</span>
                    </button>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm max-w-2xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">API Usage Examples</h2>
                <div className="border-b border-gray-200 mb-4">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('curl')} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'curl' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>cURL</button>
                        <button onClick={() => setActiveTab('javascript')} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'javascript' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>JavaScript</button>
                        <button onClick={() => setActiveTab('python')} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'python' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Python</button>
                    </nav>
                </div>
                <div>
                    <CodeBlock code={codeExamples[activeTab]} />
                </div>
            </div>
        </div>
    );
};

export default ApiKeys;

