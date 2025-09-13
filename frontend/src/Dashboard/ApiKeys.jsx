import React, { useState, useEffect } from 'react';
import apiClient from '../API/ApiClient';

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
    const [apiKeys, setApiKeys] = useState([]);
    const [newApiKey, setNewApiKey] = useState(null);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState('curl');
    const [loading, setLoading] = useState(false);
    const [showNewKeyModal, setShowNewKeyModal] = useState(false);

    useEffect(() => {
        fetchApiKeys();
    }, []);

    const fetchApiKeys = async () => {
        try {
            const response = await apiClient.get('/api/keys/');
            setApiKeys(response.data);
        } catch (error) {
            console.error('Failed to fetch API keys:', error);
        }
    };

    const copyToClipboard = (key) => {
        navigator.clipboard.writeText(key);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    const generateNewKey = async () => {
        setLoading(true);
        try {
            const response = await apiClient.post('/api/keys/', {
                name: `API Key ${apiKeys.length + 1}`
            });
            setNewApiKey(response.data.api_key);
            setShowNewKeyModal(true);
            await fetchApiKeys();
        } catch (error) {
            console.error('Failed to generate API key:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteApiKey = async (keyId) => {
        if (window.confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
            try {
                await apiClient.delete(`/api/keys/${keyId}/`);
                await fetchApiKeys();
            } catch (error) {
                console.error('Failed to delete API key:', error);
            }
        }
    };

    const getCodeExamples = (apiKey) => ({
        curl: `curl -X POST "http://localhost:8000/api/verify/single/" \\
-H "Authorization: Bearer ${apiKey}" \\
-H "Content-Type: application/json" \\
-d '{"email": "contact@example.com"}'`,
        javascript: `fetch('http://localhost:8000/api/verify/single/', {
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

url = "http://localhost:8000/api/verify/single/"
headers = {
    "Authorization": f"Bearer ${apiKey}",
    "Content-Type": "application/json"
}
data = {"email": "contact@example.com"}

response = requests.post(url, json=data, headers=headers)
print(response.json())`
    });

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">API Keys</h1>
                <p className="text-gray-500 mt-1 md:mt-2">Manage and generate API keys to integrate Veriflow into your applications.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Your API Keys</h2>
                        <p className="text-gray-500 text-sm mt-1">Use these keys in your application's backend.</p>
                    </div>
                    <button 
                        onClick={generateNewKey} 
                        disabled={loading}
                        className="mt-3 sm:mt-0 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm disabled:opacity-50"
                    >
                        {loading ? 'Generating...' : 'Generate New Key'}
                    </button>
                </div>

                {apiKeys.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <KeyRound className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No API keys found.</p>
                        <p className="text-sm mt-2">Generate your first API key to start using the API.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {apiKeys.map((key) => (
                            <div key={key.id} className="flex items-center space-x-2 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <KeyRound className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                <div className="flex-1">
                                    <div className="font-mono text-sm text-gray-700">
                                        sk_live_{key.prefix}_••••••••••••••••••••••••••••••••
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {key.name} • Created {new Date(key.created).toLocaleDateString()}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => deleteApiKey(key.id)}
                                    className="flex items-center space-x-2 bg-red-100 text-red-700 font-semibold px-3 py-1.5 rounded-md hover:bg-red-200 transition text-sm"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span>Revoke</span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {apiKeys.length > 0 && (
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">API Usage Examples</h2>
                    <div className="border-b border-gray-200 mb-4">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button onClick={() => setActiveTab('curl')} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'curl' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>cURL</button>
                            <button onClick={() => setActiveTab('javascript')} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'javascript' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>JavaScript</button>
                            <button onClick={() => setActiveTab('python')} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'python' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Python</button>
                        </nav>
                    </div>
                    <div>
                        <CodeBlock code={getCodeExamples('sk_live_your_api_key_here')[activeTab]} />
                    </div>
                </div>
            )}

            {/* New API Key Modal */}
            {showNewKeyModal && newApiKey && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <KeyRound className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">API Key Generated</h3>
                            <p className="text-gray-600 mt-2">Please save this key securely. You won't be able to see it again.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your API Key</label>
                                <div className="flex items-center space-x-2">
                                    <input 
                                        type="text" 
                                        readOnly 
                                        value={newApiKey} 
                                        className="flex-1 font-mono text-sm bg-transparent text-gray-700 focus:outline-none" 
                                    />
                                    <button 
                                        onClick={() => copyToClipboard(newApiKey)}
                                        className="flex items-center space-x-2 bg-gray-200 font-semibold px-3 py-1.5 rounded-md hover:bg-gray-300 transition text-sm text-gray-700"
                                    >
                                        <Copy className="h-4 w-4" />
                                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowNewKeyModal(false);
                                    setNewApiKey(null);
                                }}
                                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                I've Saved This Key
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApiKeys;

