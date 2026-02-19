import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Check } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, isFavorite: initialIsFavorite, onFavoriteToggle }) => {
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
    const [isAdding, setIsAdding] = useState(false);
    const { user } = useAuth();
    const { addToCart } = useCart();

    const handleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) return alert('Please login to favorite products');

        try {
            if (isFavorite) {
                await api.delete(`/favorites/${product._id}`);
            } else {
                await api.post(`/favorites/${product._id}`);
            }
            setIsFavorite(!isFavorite);
            if (onFavoriteToggle) onFavoriteToggle(product._id);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        addToCart(product);
        setTimeout(() => setIsAdding(false), 2000);
    };

    return (
        <div className="group relative bg-white rounded-3xl border border-slate-100 overflow-hidden hover:border-indigo-200 transition-all duration-300 shadow-sm hover:shadow-premium animate-fade-in">
            <Link to={`/product/${product._id}`}>
                <div className="aspect-[4/5] overflow-hidden relative bg-slate-50">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4">
                        {product.isNew && (
                            <span className="bg-white/90 backdrop-blur-md text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm">
                                New Arrival
                            </span>
                        )}
                    </div>

                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                        <button className="bg-white text-slate-900 p-3 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl">
                            <Eye className="w-5 h-5" />
                        </button>
                    </div>

                    <button
                        onClick={handleFavorite}
                        className="absolute top-4 right-4 p-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 shadow-sm hover:bg-white transition-all transform hover:scale-110 active:scale-95 z-10"
                    >
                        <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                    </button>
                </div>

                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{product.category || 'Collection'}</span>
                        <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-slate-900">4.5</span>
                            <span className="text-[10px] text-slate-400">(120)</span>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1">
                        {product.title}
                    </h3>

                    <p className="text-slate-500 text-sm line-clamp-2 h-10 font-medium">
                        {product.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Price</span>
                            <span className="text-xl font-bold text-slate-900">
                                ${product.price ? product.price.toFixed(2) : '0.00'}
                            </span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className={`p-3 rounded-2xl transition-all duration-300 transform active:scale-90 shadow-sm border ${isAdding
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                    : 'bg-slate-900 text-white hover:bg-indigo-600 border-transparent'
                                }`}
                        >
                            {isAdding ? (
                                <Check className="w-5 h-5 animate-pulse" />
                            ) : (
                                <ShoppingCart className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
