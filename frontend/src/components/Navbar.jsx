import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Heart, LogOut, User, Search, ShoppingCart } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setSearchValue(query.get('keyword') || '');
    }, [location.search]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/?keyword=${searchValue}`);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50 px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-md shadow-indigo-200">
                        <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        MicroMarket
                    </span>
                </Link>

                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search for premium goods..."
                            className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-400/50 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <Link
                        to="/cart"
                        className="p-2.5 hover:bg-slate-100 rounded-full transition-colors relative group"
                    >
                        <ShoppingCart className="w-6 h-6 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-fade-in">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                            <Link
                                to="/favorites"
                                className="p-2.5 hover:bg-slate-100 rounded-full transition-colors group"
                            >
                                <Heart className="w-6 h-6 text-slate-600 group-hover:text-red-500 transition-colors" />
                            </Link>

                            <div className="hidden lg:block text-right">
                                <p className="text-sm font-semibold text-slate-900 leading-none">{user.name}</p>
                                <p className="text-[11px] text-slate-500 mt-1">{user.email}</p>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="p-2.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="btn-primary py-2 px-5 text-sm"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
