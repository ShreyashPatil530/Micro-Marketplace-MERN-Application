import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Loader2, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal } from 'lucide-react';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [favorites, setFavorites] = useState([]);

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const keyword = query.get('keyword') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/products?keyword=${keyword}&page=1&limit=20`);
                setProducts(data.products || []);
                setPages(data.pages || 1);

                const userInfo = localStorage.getItem('userInfo');
                if (userInfo) {
                    const { data: favs } = await api.get('/favorites');
                    setFavorites((favs || []).map(f => f._id));
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [keyword, page]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 animate-fade-in">
                <div className="relative">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                    <div className="absolute inset-0 blur-xl bg-indigo-500/20 animate-pulse"></div>
                </div>
                <p className="text-slate-500 font-medium tracking-wide">Curating premium products...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-24">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-in">
                <div className="max-w-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-[2px] w-12 bg-indigo-600"></span>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600">Discover Exclusive</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
                        {keyword ? <>Search results for <span className="text-indigo-600">"{keyword}"</span></> : 'Curated Premium Marketplace'}
                    </h1>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                        Explore our selection of handpicked products designed for the modern lifestyle.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </button>
                    <div className="h-10 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
                    <div className="flex bg-slate-100 p-1 rounded-2xl">
                        <button className="p-2.5 bg-white rounded-xl shadow-sm">
                            <LayoutGrid className="w-4 h-4 text-indigo-600" />
                        </button>
                    </div>
                </div>
            </header>

            {products.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-premium flex flex-col items-center animate-fade-in">
                    <div className="bg-slate-50 p-6 rounded-full mb-6">
                        <LayoutGrid className="w-12 h-12 text-slate-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">No products found</h2>
                    <p className="text-slate-500 max-w-sm mx-auto font-medium">We couldn't find any products matching your search. Try different keywords.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                isFavorite={favorites.includes(product._id)}
                            />
                        ))}
                    </div>

                    {pages > 1 && (
                        <div className="mt-20 flex items-center justify-center gap-4 animate-fade-in">
                            <button
                                disabled={page === 1}
                                onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className={`p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 transition-all shadow-sm ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600 hover:text-white hover-lift'}`}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <span className="text-slate-500 font-bold px-4">Page {page} of {pages}</span>
                            <button
                                disabled={page === pages}
                                onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className={`p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 transition-all shadow-sm ${page === pages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600 hover:text-white hover-lift'}`}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default HomePage;
