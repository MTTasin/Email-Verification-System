import React from 'react';

const CheckIcon = () => (
    <svg className="w-6 h-6 text-violet-500 mx-auto" xmlns="http://www.w.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const MinusIcon = () => (
     <svg className="w-6 h-6 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);


const features = [
    { name: 'Monthly Credits', free: '100', starter: '5,000', pro: '25,000' },
    { name: 'Single Email Verification', free: <CheckIcon />, starter: <CheckIcon />, pro: <CheckIcon /> },
    { name: 'Bulk List Verification', free: <MinusIcon />, starter: <CheckIcon />, pro: <CheckIcon /> },
    { name: 'Developer API Access', free: <MinusIcon />, starter: <CheckIcon />, pro: <CheckIcon /> },
    { name: 'Syntax & Format Check', free: <CheckIcon />, starter: <CheckIcon />, pro: <CheckIcon /> },
    { name: 'MX Record Check', free: <CheckIcon />, starter: <CheckIcon />, pro: <CheckIcon /> },
    { name: 'SMTP Verification', free: <MinusIcon />, starter: <CheckIcon />, pro: <CheckIcon /> },
    { name: 'Standard Support', free: <CheckIcon />, starter: <CheckIcon />, pro: <CheckIcon /> },
    { name: 'Priority Support', free: <MinusIcon />, starter: <CheckIcon />, pro: <CheckIcon /> },
    { name: 'Advanced Integrations', free: <MinusIcon />, starter: <MinusIcon />, pro: <CheckIcon /> },
    { name: 'Dedicated Account Manager', free: <MinusIcon />, starter: <MinusIcon />, pro: <CheckIcon /> },
];

export default function Comparison() {
    return (
        <div className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Compare Our Features</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Find the perfect plan for your needs by comparing all our available features.
                    </p>
                </div>
                <div className="mt-16 max-w-5xl mx-auto">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-4 pr-2 font-bold text-xl w-1/3">Features</th>
                                    <th className="p-4 text-center font-bold text-xl">Free</th>
                                    <th className="p-4 text-center font-bold text-xl text-violet-600">Starter</th>
                                    <th className="p-4 text-center font-bold text-xl">Pro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, index) => (
                                    <tr key={index} className="border-t border-gray-200">
                                        <td className="py-4 pr-2 font-medium">{feature.name}</td>
                                        <td className="p-4 text-center font-semibold text-gray-700">{feature.free}</td>
                                        <td className="p-4 text-center font-semibold text-violet-700 bg-violet-50">{feature.starter}</td>
                                        <td className="p-4 text-center font-semibold text-gray-700">{feature.pro}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
