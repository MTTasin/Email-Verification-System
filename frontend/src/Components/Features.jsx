import React from 'react';

// --- SVG Icons for Features ---
const SyntaxCheckIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
        <path d="M16 20l4-4-4-4"></path>
        <path d="M8 4l-4 4 4 4"></path>
    </svg>
);

const MxRecordIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M12 12l6-3"></path>
        <path d="M12 12v6"></path>
        <path d="M12 12H6"></path>
    </svg>
);

const SmtpIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
);

const CatchAllIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18"></path>
        <path d="M6 6l12 12"></path>
        <path d="M15 3h6v6"></path>
        <path d="M9 21H3v-6"></path>
    </svg>
);


const FeatureCard = ({ icon, title, children }) => {
    return (
        <div className="bg-white p-8 rounded-xl border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 group">
            <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                {icon}
            </div>
            <h3 className="mt-5 text-xl font-semibold text-gray-800">{title}</h3>
            <p className="mt-2 text-gray-600">{children}</p>
        </div>
    );
};

export default function Features() {
    const featureList = [
        {
            icon: <SyntaxCheckIcon className="w-6 h-6" />,
            title: 'Syntax & Format Check',
            description: 'Instantly validates email addresses against IETF standards, catching typos and formatting errors.'
        },
        {
            icon: <MxRecordIcon className="w-6 h-6" />,
            title: 'MX Record Check',
            description: 'Verifies the domain has valid Mail Exchange records, ensuring it’s configured to receive email.'
        },
        {
            icon: <SmtpIcon className="w-6 h-6" />,
            title: 'SMTP Verification',
            description: 'Performs a real-time handshake with mail servers to confirm if a specific mailbox truly exists.'
        },
        {
            icon: <CatchAllIcon className="w-6 h-6" />,
            title: 'Catch-All Detection',
            description: 'Identifies domains that accept emails for any address, helping you segment your risky contacts.'
        }
    ];

    return (
        <section className="bg-gray-50 py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        A Comprehensive Verification Toolkit
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        We use a multi-layered process to ensure the highest accuracy for your email verification needs.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featureList.map((feature, index) => (
                        <FeatureCard key={index} icon={feature.icon} title={feature.title}>
                            {feature.description}
                        </FeatureCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

