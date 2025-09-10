import React from 'react';

// --- Mock Lucide Icons ---
const CreditCard = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
);
const ExternalLink = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
);
const Download = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);


const Billing = () => {
    
    const currentPlan = {
        name: 'Pro Plan',
        price: 49,
        period: 'monthly',
        credits: 25000,
        nextBillDate: 'October 1, 2025',
    };

    const invoices = [
        { id: 'inv_12345', date: 'Sept 1, 2025', amount: '$49.00', status: 'Paid' },
        { id: 'inv_12344', date: 'Aug 1, 2025', amount: '$49.00', status: 'Paid' },
        { id: 'inv_12343', date: 'July 1, 2025', amount: '$49.00', status: 'Paid' },
    ];

    const handleManageBilling = () => {
        // In a real app, this would redirect to the Stripe customer portal URL
        alert('Redirecting to Stripe Customer Portal...');
    };

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">Billing & Subscription</h1>
            <p className="text-gray-500 mt-2 mb-8">Manage your plan, payment details, and view your invoices.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Current Plan */}
                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Plan</h2>
                    <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                            <div>
                                <p className="text-2xl font-bold text-indigo-800">{currentPlan.name}</p>
                                <p className="text-gray-600 mt-1">{currentPlan.credits.toLocaleString()} credits / month</p>
                            </div>
                            <button className="mt-4 sm:mt-0 bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
                                Upgrade Plan
                            </button>
                        </div>
                        <div className="mt-6 border-t border-indigo-200 pt-4">
                            <p className="text-gray-600">
                                Your next bill for <span className="font-medium text-indigo-800">${currentPlan.price}</span> is on <span className="font-medium text-indigo-800">{currentPlan.nextBillDate}</span>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                     <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h2>
                     <div className="flex items-center">
                        <CreditCard className="h-8 w-8 text-gray-400" />
                        <div className="ml-4">
                            <p className="font-medium text-gray-700">Visa ending in 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/2028</p>
                        </div>
                     </div>
                     <button onClick={handleManageBilling} className="w-full mt-6 bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center">
                        Manage in Stripe <ExternalLink className="h-4 w-4 ml-2" />
                    </button>
                </div>
            </div>

            {/* Invoices */}
            <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Invoice History</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-3">Invoice ID</th>
                                <th scope="col" className="px-4 py-3">Date</th>
                                <th scope="col" className="px-4 py-3">Amount</th>
                                <th scope="col" className="px-4 py-3">Status</th>
                                <th scope="col" className="px-4 py-3 text-right">Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(invoice => (
                                <tr key={invoice.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{invoice.id}</td>
                                    <td className="px-4 py-3">{invoice.date}</td>
                                    <td className="px-4 py-3">{invoice.amount}</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">{invoice.status}</span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="p-2 text-gray-500 hover:text-indigo-600 rounded-md hover:bg-gray-100">
                                            <Download className="h-5 w-5" />
                                        </button>
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

export default Billing;
