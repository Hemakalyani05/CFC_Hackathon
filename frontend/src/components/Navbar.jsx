import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Menu, X, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <AlertCircle className="h-8 w-8 text-primary" />
                            <span className="ml-2 text-xl font-bold text-gray-800">ResQ</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/blood-donation" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Blood Donation</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                                <div className="ml-4 flex items-center">
                                    <span className="text-gray-700 mr-4">Hello, {user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                                <Link to="/signup" className="bg-primary text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                            </>
                        )}
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block text-gray-600 hover:text-primary px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block text-gray-600 hover:text-primary px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                                <div className="px-3 py-2">
                                    <span className="block text-gray-700 mb-2">Hello, {user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block text-gray-600 hover:text-primary px-3 py-2 rounded-md text-base font-medium">Login</Link>
                                <Link to="/signup" className="block bg-primary text-white hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
