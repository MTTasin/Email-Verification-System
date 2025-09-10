import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-indigo-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const XIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          
          {/* Desktop Menu - Left Side */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Features</a>
            <a href="/#pricing" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Pricing</a>
          </div>

          {/* Centered Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="flex items-center space-x-2">
              <CheckCircleIcon />
              <span className="text-2xl font-bold text-gray-800">Veriflow</span>
            </Link>
          </div>

          {/* Desktop Menu - Right Side */}
          <div className="hidden md:flex items-center space-x-5">
             <a href="#api-docs" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">API Docs</a>
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">Login</Link>
            <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md">
              Sign Up Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-800">
              {isOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white border-t">
          <a href="/#features" className="block text-gray-600 hover:text-indigo-600 font-medium py-2">Features</a>
          <a href="/#pricing" className="block text-gray-600 hover:text-indigo-600 font-medium py-2">Pricing</a>
          <a href="#api-docs" className="block text-gray-600 hover:text-indigo-600 font-medium py-2">API Docs</a>
          <Link to="/login" className="block text-indigo-600 hover:text-indigo-800 font-medium py-2">Login</Link>
          <Link to="/signup" className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-300">
            Sign Up Free
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

