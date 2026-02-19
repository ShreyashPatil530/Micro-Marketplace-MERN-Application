import { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Loader2, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchFavorites = async () => {
        try {
            const { data } = await api.get('/favorites');
            setFavorites(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching favorites:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const handleFavoriteToggle = (productId) => {
        setFavorites(favorites.filter(p => p._id !== productId));
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 animate-fade-in">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                <p className="text-slate-500 font-medium">Fetching your favorites...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-24 animate-fade-in">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-all mr-2"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </button>
                        <span className="h-[2px] w-12 bg-red-500"></span>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500">Member Exclusive</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
                        Your <span className="text-red-500">Favorites</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                        A curated list of everything you love. Ready to make them yours?
                    </p>
                </div>
            </header>

            {favorites.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-premium flex flex-col items-center">
                    <div className="bg-red-50 p-6 rounded-full mb-6">
                        <Heart className="w-12 h-12 text-red-200" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">No favorites yet</h2>
                    <p className="text-slate-500 max-w-sm mx-auto font-medium mb-8">Start exploring our premium collection and tap the heart icon to save items here.</p>
                    <button onClick={() => navigate('/')} className="btn-primary">Explore Products</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {favorites.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            isFavorite={true}
                            onFavoriteToggle={handleFavoriteToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
