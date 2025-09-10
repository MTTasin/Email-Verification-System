import React, { useState, useEffect, useRef } from 'react';

// --- Mock Lucide Icons (for standalone use) ---
const UploadCloudIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
);

const ZapIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

const DownloadCloudIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 18v-6"/><path d="m16 15-4 4-4-4"/></svg>
);

// Animated StepCard using Intersection Observer
const AnimatedStepCard = ({ number, icon, title, description, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardref.current);
            }
        };
    }, [cardRef]);

    return (
        <div 
            ref={cardRef}
            className={`flex flex-col items-center text-center p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            <div className="relative">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                    <div className="w-20 h-20 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600">
                        {icon}
                    </div>
                </div>
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-yellow-400 text-purple-900 font-bold text-xl rounded-full flex items-center justify-center border-4 border-white">
                    {number}
                </div>
            </div>
            <h3 className="mt-6 text-2xl font-bold text-gray-800">{title}</h3>
            <p className="mt-2 text-gray-600">{description}</p>
        </div>
    );
};


export default function HowItWorks() {
    const steps = [
        {
            number: 1,
            icon: <UploadCloudIcon className="w-10 h-10" />,
            title: 'Upload List',
            description: 'Simply drag and drop your email list in CSV or TXT format onto our platform.'
        },
        {
            number: 2,
            icon: <ZapIcon className="w-10 h-10" />,
            title: 'We Verify',
            description: 'Our powerful, multi-layered process checks for syntax, domain validity, and mailbox existence.'
        },
        {
            number: 3,
            icon: <DownloadCloudIcon className="w-10 h-10" />,
            title: 'Download Clean List',
            description: 'Get a detailed report and download your freshly cleaned list, ready for your next campaign.'
        }
    ];

    return (
        <section className="bg-white py-20 sm:py-28 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">How It Works</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Get clean, deliverable email lists in just three simple steps. It’s fast, easy, and incredibly effective.
                    </p>
                </div>

                <div className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="hidden md:block absolute top-[60px] left-0 right-0 w-full h-1">
                        <svg width="100%" height="100%">
                           <line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="4" strokeDasharray="10, 10" className="stroke-gray-300"></line>
                        </svg>
                    </div>
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative z-10">
                            <AnimatedStepCard {...step} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

