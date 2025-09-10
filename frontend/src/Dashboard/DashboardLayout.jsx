import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

// --- Mock Lucide Icons ---
const LayoutDashboard = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const Check = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const UploadCloud = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>;
const KeyRound = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>;
const CreditCard = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
const SettingsIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const UserCircle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>;
const ChevronDown = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
const MenuIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const CheckCircleIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-indigo-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

const SidebarLink = ({ to, icon, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <Link to={to} className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            {icon}
            <span>{children}</span>
        </Link>
    );
};

const Sidebar = ({ user, isOpen }) => {
    const navItems = [
        { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
        { to: '/dashboard/verify-single', label: 'Single Verify', icon: <Check className="h-5 w-5" /> },
        { to: '/dashboard/verify-bulk', label: 'Bulk Verify', icon: <UploadCloud className="h-5 w-5" /> },
        { to: '/dashboard/api-keys', label: 'API Keys', icon: <KeyRound className="h-5 w-5" /> },
        { to: '/dashboard/billing', label: 'Billing', icon: <CreditCard className="h-5 w-5" /> },
        { to: '/dashboard/settings', label: 'Settings', icon: <SettingsIcon className="h-5 w-5" /> },
    ];

    return (
        <aside className={`fixed inset-y-0 left-0 bg-white w-64 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0`}>
            <div className="flex flex-col h-full border-r border-gray-200 p-4">
                <Link to="/" className="flex items-center space-x-2 px-4 pb-4 border-b border-gray-200">
                    <CheckCircleIcon />
                    <span className="text-xl font-bold text-gray-800">Veriflow</span>
                </Link>
                <nav className="flex-1 mt-6 space-y-2">
                    {navItems.map(item => <SidebarLink key={item.to} to={item.to} icon={item.icon}>{item.label}</SidebarLink>)}
                </nav>
                <div className="mt-auto p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Credits Remaining</p>
                    <p className="text-2xl font-bold text-indigo-600 mt-1">{user.credits.toLocaleString()}</p>
                </div>
            </div>
        </aside>
    );
};

const TopBar = ({ user, onMenuClick }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <button onClick={onMenuClick} className="md:hidden text-gray-600 hover:text-gray-800">
                    <MenuIcon className="h-6 w-6" />
                </button>
                <div className="flex-1"></div> {/* Spacer */}
                <div className="relative">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                        <UserCircle className="h-7 w-7 text-gray-600"/>
                        <span className="hidden sm:inline font-medium text-gray-700">{user.name}</span>
                        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}/>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                            <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</Link>
                            <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Close sidebar on navigation on mobile
        setSidebarOpen(false);
    }, [location.pathname]);

    const user = {
        name: 'Alex Doe',
        email: 'alex.doe@example.com',
        credits: 4350,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Overlay for mobile */}
            {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/30 z-30 md:hidden"></div>}
            
            <Sidebar user={user} isOpen={sidebarOpen} />
            <div className="flex flex-col flex-1 md:ml-64">
                <TopBar user={user} onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

