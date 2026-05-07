import React, { useState } from 'react';
import { ShoppingCart, Plus, Tag } from 'lucide-react';
import { i18n, type Language } from '../data/i18n';
import GlassCard from '../ui/GlassCard';

interface ShopScreenProps {
  lang: Language;
}

export default function ShopScreen({ lang }: ShopScreenProps) {
  const t = i18n[lang];
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);

  const categories = [
    { id: 'all', hi: 'सभी', en: 'All' },
    { id: 'seeds', hi: 'बीज', en: 'Seeds' },
    { id: 'fertilizers', hi: 'उर्वरक', en: 'Fertilizers' },
    { id: 'pesticides', hi: 'कीटनाशक', en: 'Pesticides' },
  ];

  const products = [
    { id: 1, category: 'seeds', nameHi: 'गेहूं बीज (HD-2967)', nameEn: 'Wheat Seed (HD-2967)', price: 1800, unit: '50kg', inStock: true },
    { id: 2, category: 'fertilizers', nameHi: 'DAP उर्वरक', nameEn: 'DAP Fertilizer', price: 1250, unit: '50kg', inStock: true },
    { id: 3, category: 'fertilizers', nameHi: 'यूरिया', nameEn: 'Urea', price: 266, unit: '45kg', inStock: false },
    { id: 4, category: 'seeds', nameHi: 'सरसों बीज (Pusa Bold)', nameEn: 'Mustard Seed (Pusa Bold)', price: 450, unit: '5kg', inStock: true },
    { id: 5, category: 'pesticides', nameHi: 'कीटनाशक (Chlorpyrifos)', nameEn: 'Insecticide (Chlorpyrifos)', price: 850, unit: '1L', inStock: true },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="pb-32 min-h-screen bg-[var(--farmer-surface)] relative">
      
      {/* 1. Header & Cart */}
      <div className="bg-gradient-teal rounded-b-[32px] pt-8 pb-8 px-6 shadow-md relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">{t.shop}</h1>
          
          <button className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center relative backdrop-blur-sm active:scale-95 transition-transform">
            <ShoppingCart className="text-white" size={24} />
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-teal-600">
                {cartCount}
              </div>
            )}
          </button>
        </div>
        
        {/* Categories Horizontal Scroll */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 -mx-2 px-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[15px] font-bold transition-all border ${
                activeCategory === cat.id 
                  ? 'bg-white text-teal-800 border-white shadow-md' 
                  : 'bg-white/10 text-teal-50 border-white/20 backdrop-blur-sm'
              }`}
            >
              {lang === 'hi' ? cat.hi : cat.en}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Products Grid */}
      <div className="px-5 mt-6 relative z-0 space-y-4">
        {filteredProducts.map((product) => (
          <GlassCard key={product.id} className="bg-white border border-slate-100 flex gap-4 p-4">
            
            {/* Image Placeholder */}
            <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 flex-shrink-0">
              <Tag size={32} />
            </div>
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-[16px] leading-snug">
                  {lang === 'hi' ? product.nameHi : product.nameEn}
                </h3>
                <div className="text-slate-500 text-xs mt-1">{product.unit}</div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <div className="font-bold text-teal-700 text-lg">
                  ₹{product.price}
                </div>
                
                {product.inStock ? (
                  <button 
                    onClick={() => setCartCount(c => c + 1)}
                    className="w-10 h-10 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center active:bg-teal-600 active:text-white transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                ) : (
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  );
}
