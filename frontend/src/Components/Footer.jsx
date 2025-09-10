import React from 'react';

// --- Social Icons (Mock for standalone use) ---
const TwitterIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const GithubIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
);

const CheckCircleLogo = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);


export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* --- Logo and Tagline --- */}
                    <div className="sm:col-span-2 lg:col-span-2 pr-8">
                        <a href="#" className="flex items-center space-x-2">
                            <CheckCircleLogo className="w-8 h-8 text-violet-400" />
                            <span className="text-2xl font-bold">Veriflow</span>
                        </a>
                        <p className="mt-4 text-gray-400 max-w-xs">
                            Clean lists, better deliverability. Our powerful and accurate email verifier protects your sender reputation.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <TwitterIcon className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <GithubIcon className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* --- Product Links --- */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Product</h3>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Docs</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
                        </ul>
                    </div>

                    {/* --- Company Links --- */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Company</h3>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                {/* --- Bottom Bar --- */}
                <div className="mt-16 border-t border-gray-800 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Veriflow. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

