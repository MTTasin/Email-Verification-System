import React from 'react';

// --- Mock Lucide Icons ---
const CreditCard = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
const ExternalLink = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const Download = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;


const Billing = () => {
    const plan = {
        name: 'Pro Plan',
        credits: '25,000 credits / month',
        price: 49,
        nextBillDate: 'October 1, 2025',
    };
    const paymentMethod = {
        type: 'Visa',
        last4: '4242',
        expiry: '12/2028',
    };
    const billingHistory = [
        { id: 'inv_123456', date: '2025-09-01', amount: '$49.00', status: 'Paid', statusColor: 'bg-green-100 text-green-700' },
        { id: 'inv_123455', date: '2025-08-01', amount: '$49.00', status: 'Paid', statusColor: 'bg-green-100 text-green-700' },
        { id: 'inv_123454', date: '2025-07-01', amount: '$49.00', status: 'Paid', statusColor: 'bg-green-100 text-green-700' },
    ];

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Billing</h1>
                <p className="text-gray-500 mt-1 md:mt-2">Manage your subscription, payment details, and view invoices.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Plan */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Plan</h2>
                    <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-indigo-800">{plan.name}</p>
                            <p className="text-gray-600 mt-1">{plan.credits}</p>
                             <p className="text-sm text-gray-500 mt-4">Your next bill for <span className="font-semibold text-indigo-700">${plan.price}</span> is on <span className="font-semibold text-indigo-700">{plan.nextBillDate}</span>.</p>
                        </div>
                        <button className="mt-4 sm:mt-0 bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md flex-shrink-0">
                            Upgrade Plan
                        </button>
                    </div>
                </div>

                {/* Payment Details */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h2>
                    <div className="flex items-center space-x-4">
                        <CreditCard className="h-8 w-8 text-gray-400"/>
                        <div>
                            <p className="font-medium text-gray-700">{paymentMethod.type} ending in {paymentMethod.last4}</p>
                            <p className="text-sm text-gray-500">Expires {paymentMethod.expiry}</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg transition-colors">
                        <span>Manage in Stripe</span>
                        <ExternalLink className="h-4 w-4" />
                    </button>
                </div>
            </div>

             {/* Billing History */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Billing History</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-200">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-gray-500">Invoice ID</th>
                                <th className="p-3 text-sm font-semibold text-gray-500">Date</th>
                                <th className="p-3 text-sm font-semibold text-gray-500">Amount</th>
                                <th className="p-3 text-sm font-semibold text-gray-500">Status</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billingHistory.map((invoice) => (
                                <tr key={invoice.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800 mono">{invoice.id}</td>
                                    <td className="p-3 text-gray-600">{invoice.date}</td>
                                    <td className="p-3 text-gray-600">{invoice.amount}</td>
                                    <td className="p-3">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${invoice.statusColor}`}>{invoice.status}</span>
                                    </td>
                                    <td className="p-3 text-right">
                                        <button className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition-colors">
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

