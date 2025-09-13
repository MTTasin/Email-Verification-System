import React, { useState } from 'react';
import apiClient from '../API/ApiClient';

const ConnectionTest = () => {
    const [testResult, setTestResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const testConnection = async () => {
        setLoading(true);
        setTestResult(null);
        
        try {
            console.log('Testing connection to backend...');
            const response = await apiClient.get('/api/test/');
            console.log('Test response:', response.data);
            setTestResult({ success: true, data: response.data });
        } catch (error) {
            console.error('Connection test failed:', error);
            setTestResult({ 
                success: false, 
                error: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Backend Connection Test</h3>
            <button
                onClick={testConnection}
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Testing...' : 'Test Connection'}
            </button>
            
            {testResult && (
                <div className={`mt-4 p-4 rounded-lg ${
                    testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    <h4 className="font-semibold mb-2">
                        {testResult.success ? '✅ Connection Successful' : '❌ Connection Failed'}
                    </h4>
                    <pre className="text-sm overflow-auto">
                        {JSON.stringify(testResult, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default ConnectionTest;
