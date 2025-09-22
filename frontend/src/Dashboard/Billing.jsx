import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlans, createCheckoutSession } from '../redux/billingSlice';
import apiClient from '../API/ApiClient';

// --- Mock Lucide Icons ---
const CreditCard = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
const CheckCircle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const ArrowRight = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const Star = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const Zap = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const Crown = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519L20.2 12.5a1 1 0 0 0 .5 1.5l6.5 2a.5.5 0 0 1 .3.8L24.5 20a1 1 0 0 1-1.5.5l-6.5-4a.5.5 0 0 0-.5 0l-6.5 4a1 1 0 0 1-1.5-.5l-3.3-3.7a.5.5 0 0 1 .3-.8l6.5-2a1 1 0 0 0 .5-1.5L2.5 6.5a.5.5 0 0 1 .798-.519l4.277 3.664a1 1 0 0 0 1.516-.294z"/></svg>;
const ExternalLink = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const Download = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

const Billing = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { plans, status, error } = useSelector((state) => state.billing);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showCheckout, setShowCheckout] = useState(false);
    const [checkoutData, setCheckoutData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState({
        type: 'Visa',
        last4: '4242',
        expiry: '12/2028',
    });
    const [billingHistory, setBillingHistory] = useState([]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPlans());
        }
        fetchBillingHistory();
    }, [status, dispatch]);

    const fetchBillingHistory = async () => {
        // Mock billing history for now
        setBillingHistory([
            { id: 'inv_123456', date: '2025-09-01', amount: '$49.00', status: 'Paid', statusColor: 'bg-green-100 text-green-700' },
            { id: 'inv_123455', date: '2025-08-01', amount: '$49.00', status: 'Paid', statusColor: 'bg-green-100 text-green-700' },
            { id: 'inv_123454', date: '2025-07-01', amount: '$49.00', status: 'Paid', statusColor: 'bg-green-100 text-green-700' },
        ]);
    };

    const handleUpgrade = (plan) => {
        setSelectedPlan(plan);
        setShowUpgradeModal(true);
    };

    const handleCheckout = async () => {
        if (!selectedPlan) return;
        
        setLoading(true);
        const resultAction = await dispatch(createCheckoutSession(selectedPlan.id));
        if (createCheckoutSession.fulfilled.match(resultAction)) {
            setCheckoutData(resultAction.payload);
            setShowCheckout(true);
            setShowUpgradeModal(false);
        }
        setLoading(false);
    };

    const handleMockPayment = async () => {
        setLoading(true);
        try {
            await apiClient.post('/api/billing/mock-payment/');
            // Ideally, you would refetch the user data here or update it via Redux
            setShowCheckout(false);
            setCheckoutData(null);
            setSelectedPlan(null);
            
            // Add to billing history
            const newInvoice = {
                id: `inv_${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                amount: `$${selectedPlan.price}.00`,
                status: 'Paid',
                statusColor: 'bg-green-100 text-green-700'
            };
            setBillingHistory(prev => [newInvoice, ...prev]);
        } catch (error) {
            console.error('Payment failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const getPlanIcon = (planId) => {
        switch (planId) {
            case 'starter': return <Zap className="h-6 w-6" />;
            case 'pro': return <Star className="h-6 w-6" />;
            case 'enterprise': return <Crown className="h-6 w-6" />;
            default: return <CheckCircle className="h-6 w-6" />;
        }
    };

    const getPlanColor = (planId) => {
        switch (planId) {
            case 'starter': return 'border-blue-200 bg-blue-50';
            case 'pro': return 'border-purple-200 bg-purple-50';
            case 'enterprise': return 'border-yellow-200 bg-yellow-50';
            default: return 'border-gray-200 bg-gray-50';
        }
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Billing & Subscription</h1>
                <p className="text-gray-500 mt-1 md:mt-2">Manage your subscription and payment methods.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Plan */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Plan</h2>
                    <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-indigo-800">{user?.subscription_plan?.name || 'Free'}</p>
                            <p className="text-gray-600 mt-1">{user?.credits_remaining.toLocaleString()} credits remaining</p>
                            <p className="text-sm text-gray-500 mt-4">
                                {user?.subscription_plan?.name === 'Free' 
                                    ? 'Upgrade to a paid plan for more credits and features.'
                                    : 'Your next bill is on the 1st of next month.'
                                }
                            </p>
                        </div>
                        <button 
                            onClick={() => setShowUpgradeModal(true)}
                            className="mt-4 sm:mt-0 bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md flex-shrink-0"
                        >
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
                        <span>Manage Payment Methods</span>
                        <ExternalLink className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Subscription Plans */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Available Plans</h2>
                {status === 'loading' && <p>Loading plans...</p>}
                {status === 'failed' && <p>Error: {error.message}</p>}
                {status === 'succeeded' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {plans.map((plan) => (
                            <div key={plan.id} className={`p-6 rounded-lg border-2 ${getPlanColor(plan.id)} ${plan.id === 'pro' ? 'ring-2 ring-purple-500 ring-opacity-50' : ''}`}>
                                <div className="flex items-center space-x-2 mb-4">
                                    {getPlanIcon(plan.id)}
                                    <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
                                </div>
                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-gray-800">${plan.price}</span>
                                    <span className="text-gray-600">/month</span>
                                </div>
                                <div className="space-y-2 mb-6">
                                    {plan.features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span className="text-sm text-gray-600">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleUpgrade(plan)}
                                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                                        plan.id === 'pro' 
                                            ? 'bg-purple-600 text-white hover:bg-purple-700' 
                                            : plan.price === 0
                                            ? 'bg-gray-400 text-white cursor-not-allowed'
                                            : 'bg-gray-600 text-white hover:bg-gray-700'
                                    }`}
                                    disabled={plan.price === 0}
                                >
                                    {plan.price === 0 ? 'Current Plan' : 'Upgrade'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Upgrade Modal */}
            {showUpgradeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Upgrade to {selectedPlan?.name}</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                {getPlanIcon(selectedPlan?.id)}
                                <span className="text-lg font-semibold">${selectedPlan?.price}/month</span>
                            </div>
                            <div className="space-y-2">
                                {selectedPlan?.features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span className="text-sm text-gray-600">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowUpgradeModal(false)}
                                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Continue to Payment'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mock Stripe Checkout */}
            {showCheckout && checkoutData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CreditCard className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">Complete Your Payment</h3>
                            <p className="text-gray-600 mt-2">Upgrade to {selectedPlan?.name} Plan</p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Plan</span>
                                    <span className="font-semibold">{selectedPlan?.name}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Credits</span>
                                    <span className="font-semibold">{selectedPlan?.credits.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center border-t pt-2">
                                    <span className="text-gray-600">Total</span>
                                    <span className="font-bold text-lg">${selectedPlan?.price}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="4242 4242 4242 4242"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                                        <input
                                            type="text"
                                            placeholder="12/25"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowCheckout(false)}
                                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleMockPayment}
                                disabled={loading}
                                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : `Pay $${selectedPlan?.price}`}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Billing History */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Billing History</h2>
                {billingHistory.length > 0 ? (
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
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No billing history available for free accounts.</p>
                        <p className="text-sm mt-2">Upgrade to a paid plan to see your billing history here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Billing;