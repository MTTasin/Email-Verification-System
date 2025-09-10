import React from 'react';

// --- Mock Lucide Icons (for standalone use) ---
const CheckIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const UploadIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
);


export default function Hero() {
    return (
        <div className="bg-gradient-to-br from-[#4A00E0] to-[#8E2DE2] text-white animate-fadeIn">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                    Clean Your Email Lists,<br /> Boost Your Deliverability.
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-100">
                    Our powerful and accurate email verifier removes invalid addresses, reduces bounce rates, and protects your sender reputation.
                </p>

                {/* Main Verification Card */}
                <div className="bg-white text-gray-800 rounded-xl shadow-2xl p-8 max-w-2xl mx-auto transform transition-transform hover:scale-[1.02] duration-500 mt-10">
                    <h2 className="text-xl font-semibold mb-4">Test our free email verifier</h2>
                    <div className="flex flex-col sm:flex-row shadow-md rounded-lg">
                        <input 
                            type="email" 
                            placeholder="email@example.com" 
                            className="w-full px-5 py-4 text-lg border-gray-300 border sm:border-r-0 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <button className="flex items-center justify-center bg-yellow-400 text-purple-900 font-bold px-6 py-4 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none hover:bg-yellow-500 transition-colors duration-300">
                            <CheckIcon className="w-6 h-6 mr-2" />
                            Verify
                        </button>
                    </div>
                </div>
                
                <div className="mt-12">
                     <a href="#" className="bg-yellow-400 text-purple-900 font-bold py-3 px-10 rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Get Started for Free
                    </a>
                </div>
                 <p className="mt-4 text-sm text-indigo-200">
                    100 free verifications. No credit card required.
                </p>

            </div>
             <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

