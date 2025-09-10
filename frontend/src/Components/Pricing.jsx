import React, { useState } from 'react';

// --- Mock Lucide Icons (for standalone use) ---
const CheckCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

const pricingData = {
    monthly: [
        {
            name: 'Free',
            price: '$0',
            credits: '100 credits/mo',
            features: ['Single Email Verification', 'Standard Support'],
            buttonText: 'Start for Free',
            popular: false,
        },
        {
            name: 'Starter',
            price: '$29',
            credits: '5,000 credits/mo',
            features: ['Everything in Free', 'Bulk Verification', 'API Access', 'Priority Support'],
            buttonText: 'Choose Starter',
            popular: true,
        },
        {
            name: 'Pro',
            price: '$99',
            credits: '25,000 credits/mo',
            features: ['Everything in Starter', 'Advanced Integrations', 'Dedicated Account Manager'],
            buttonText: 'Choose Pro',
            popular: false,
        },
    ],
    annual: [
        {
            name: 'Free',
            price: '$0',
            credits: '100 credits/mo',
            features: ['Single Email Verification', 'Standard Support'],
            buttonText: 'Start for Free',
            popular: false,
        },
        {
            name: 'Starter',
            price: '$288',
            credits: '72,000 credits/yr',
            features: ['Everything in Free', 'Bulk Verification', 'API Access', 'Priority Support'],
            buttonText: 'Choose Starter',
            popular: true,
            savings: 'Save $60',
        },
        {
            name: 'Pro',
            price: '$996',
            credits: '360,000 credits/yr',
            features: ['Everything in Starter', 'Advanced Integrations', 'Dedicated Account Manager'],
            buttonText: 'Choose Pro',
            popular: false,
            savings: 'Save $192',
        },
    ],
};


export default function Pricing() {
    const [isAnnual, setIsAnnual] = useState(false);
    const plans = isAnnual ? pricingData.annual : pricingData.monthly;

    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Simple, Transparent Pricing</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Choose the plan that's right for you. No hidden fees, cancel anytime.
                    </p>
                </div>

                {/* --- Pricing Toggle --- */}
                <div className="flex items-center justify-center mt-10 space-x-4">
                    <span className={`font-medium ${!isAnnual ? 'text-violet-600' : 'text-gray-500'}`}>Monthly</span>
                    <label htmlFor="pricing-toggle" className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="pricing-toggle" className="sr-only peer" checked={isAnnual} onChange={() => setIsAnnual(!isAnnual)} />
                        <div className="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-violet-600"></div>
                    </label>
                    <span className={`font-medium ${isAnnual ? 'text-violet-600' : 'text-gray-500'}`}>
                        Annual <span className="text-orange-500 font-bold">(Save 15%)</span>
                    </span>
                </div>

                {/* --- Pricing Cards --- */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
                    {plans.map((plan) => (
                        <div key={plan.name} className={`bg-white rounded-2xl p-8 shadow-md transition-shadow duration-300 hover:shadow-xl flex flex-col ${plan.popular ? 'border-2 border-violet-500 relative' : 'border border-gray-200'}`}>
                            {plan.popular && (
                                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}
                            <div className="flex-grow">
                                <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
                                <p className="text-center mt-4">
                                    <span className="text-5xl font-extrabold">{plan.price}</span>
                                    <span className="text-gray-500">{isAnnual ? '/yr' : '/mo'}</span>
                                </p>
                                 {isAnnual && plan.savings && (
                                    <p className="text-center text-sm font-bold text-orange-500 ">{plan.savings}</p>
                                )}
                                <p className="text-center font-semibold text-violet-600 mt-2">{plan.credits}</p>

                                <ul className="mt-8 space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className={`w-full mt-8 font-bold py-3 px-6 rounded-lg transition-colors text-lg ${plan.popular ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-violet-100 text-violet-700 hover:bg-violet-200'}`}>
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

