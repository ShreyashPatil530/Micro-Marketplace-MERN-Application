import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Loader2, Heart, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const ProductDetailPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);

                // Check if favorite
                if (user) {
                    const { data: favs } = await api.get('/favorites');
                    setIsFavorite(favs.some(f => f._id === id));
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, user]);

    const handleFavorite = async () => {
        if (!user) return navigate('/login');
        try {
            if (isFavorite) {
                await api.delete(`/favorites/${id}`);
            } else {
                await api.post(`/favorites/${id}`);
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20">
                <p className="text-white text-xl">Product not found.</p>
                <button onClick={() => navigate('/')} className="mt-4 text-primary-400 hover:underline">
                    Go back home
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Products
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-slate-800/20 p-6 sm:p-10 rounded-[2.5rem] border border-white/5">
                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative group"
                >
                    <div className="aspect-square rounded-3xl overflow-hidden glass border-white/10">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <button
                        onClick={handleFavorite}
                        className={`absolute top-6 right-6 p-4 rounded-2xl glass border-white/20 transition-all duration-300 ${isFavorite ? 'bg-red-500/20 border-red-500/50' : 'hover:bg-white/10'
                            }`}
                    >
                        <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>
                </motion.div>

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col"
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-primary-500/10 text-primary-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-primary-500/20">
                                Premium Choice
                            </span>
                            <span className="text-slate-500 text-sm">• In Stock</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                            {product.title}
                        </h1>

                        <div className="text-3xl font-bold text-primary-400 mb-8">
                            ${product.price.toFixed(2)}
                        </div>

                        <p className="text-slate-400 text-lg leading-relaxed mb-10 pb-10 border-b border-white/5 font-light">
                            {product.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-700/30 p-2.5 rounded-xl">
                                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">Warranty</p>
                                    <p className="text-sm text-slate-300">1 Year Limited</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-700/30 p-2.5 rounded-xl">
                                    <Truck className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">Shipping</p>
                                    <p className="text-sm text-slate-300">Free Worldwide</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-700/30 p-2.5 rounded-xl">
                                    <RotateCcw className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">Returns</p>
                                    <p className="text-sm text-slate-300">30 Day Policy</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <button className="flex-1 bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-600/20 hover:scale-[1.02] active:scale-[0.98]">
                            <ShoppingCart className="w-6 h-6" />
                            Add to Cart
                        </button>
                        <button className="px-8 py-4 glass-hover text-white font-bold rounded-2xl border border-white/10 flex items-center justify-center">
                            Buy Now
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
