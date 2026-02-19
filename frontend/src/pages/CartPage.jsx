import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard } from 'lucide-react';

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            navigate('/login?redirect=cart');
            return;
        }
        // Simulate checkout
        alert('Thank you for your purchase! (Developer: Integrate Stripe/Payment here)');
        clearCart();
        navigate('/');
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
                <div className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-premium max-w-md mx-auto">
                    <div className="bg-indigo-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                    <p className="text-slate-500 mb-8 font-medium">Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/" className="btn-primary inline-flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2.5 hover:bg-white rounded-2xl border border-transparent hover:border-slate-100 transition-all shadow-sm"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item._id} className="bg-white p-4 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6 hover-lift">
                            <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{item.category}</span>
                                <h3 className="text-lg font-bold text-slate-900 mt-1">{item.title}</h3>
                                <p className="text-slate-500 text-sm line-clamp-1 mt-1 font-medium">{item.description}</p>
                                <div className="mt-4 flex items-center justify-center md:justify-start gap-4">
                                    <div className="flex items-center bg-slate-100 rounded-xl p-1">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-10 text-center font-bold text-slate-900">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="text-right flex flex-col items-center md:items-end flex-shrink-0 min-w-[100px]">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">Subtotal</span>
                                <span className="text-xl font-bold text-slate-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-premium sticky top-24">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            Order Summary
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Subtotal</span>
                                <span className="text-slate-900">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Shipping</span>
                                <span className="text-emerald-500 font-bold">Free</span>
                            </div>
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Tax (Estimated)</span>
                                <span className="text-slate-900 font-bold">$0.00</span>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-lg font-bold text-slate-900">Total</span>
                                <span className="text-2xl font-black text-indigo-600">
                                    ${cartTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-200"
                        >
                            <CreditCard className="w-5 h-5" />
                            Checkout Now
                        </button>

                        <p className="mt-6 text-center text-xs text-slate-400 font-medium">
                            Secure checkout powered by MicroMarket
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
