import React, { useState } from 'react';
import { MapPin, TrendingUp, TrendingDown, Bell, BellRing } from 'lucide-react';
import { i18n, type Language } from '../data/i18n';
import GlassCard from '../ui/GlassCard';

interface MandiScreenProps {
  lang: Language;
}

export default function MandiScreen({ lang }: MandiScreenProps) {
  const t = i18n[lang];
  const [activeMandi, setActiveMandi] = useState('mandi1');
  const [alerts, setAlerts] = useState<Record<number, boolean>>({});

  const mandis = [
    { id: 'mandi1', hi: 'सिकंदराबाद मंडी', en: 'Sikandrabad Mandi', distance: '12 km' },
    { id: 'mandi2', hi: 'बुलंदशहर मंडी', en: 'Bulandshahr Mandi', distance: '28 km' },
    { id: 'mandi3', hi: 'नोएडा मंडी', en: 'Noida Mandi', distance: '45 km' },
  ];

  const commodities = [
    { id: 1, nameHi: 'गेहूं', nameEn: 'Wheat', variety: 'HD-2967', price: 2450, change: '+50', trend: 'up', date: 'Aaj (Today)' },
    { id: 2, nameHi: 'सरसों', nameEn: 'Mustard', variety: 'Pusa Bold', price: 5200, change: '-100', trend: 'down', date: 'Aaj (Today)' },
    { id: 3, nameHi: 'धान', nameEn: 'Paddy', variety: 'Basmati', price: 3800, change: '+150', trend: 'up', date: 'Kal (Yesterday)' },
    { id: 4, nameHi: 'चना', nameEn: 'Gram', variety: 'Desi', price: 5800, change: '0', trend: 'flat', date: 'Aaj (Today)' },
  ];

  const toggleAlert = (id: number) => {
    setAlerts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pb-32 min-h-screen bg-[var(--farmer-surface)] relative">
      
      {/* 1. Header & Mandi Selector */}
      <div className="bg-gradient-pink rounded-b-[32px] pt-8 pb-10 px-6 shadow-md relative z-10">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">{t.mandi}</h1>
        
        {/* Mandi Selector (Horizontal Scroll) */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-2 px-2">
          {mandis.map((mandi) => (
            <button
              key={mandi.id}
              onClick={() => setActiveMandi(mandi.id)}
              className={`flex-shrink-0 w-48 p-4 rounded-2xl text-left transition-all border ${
                activeMandi === mandi.id 
                  ? 'bg-white border-transparent shadow-lg' 
                  : 'bg-white/10 border-white/20 backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center gap-1 mb-2">
                <MapPin size={14} className={activeMandi === mandi.id ? 'text-pink-600' : 'text-pink-200'} />
                <span className={`text-xs font-bold ${activeMandi === mandi.id ? 'text-pink-600' : 'text-pink-200'}`}>
                  {mandi.distance}
                </span>
              </div>
              <div className={`font-bold text-[16px] leading-tight ${activeMandi === mandi.id ? 'text-slate-900' : 'text-white'}`}>
                {lang === 'hi' ? mandi.hi : mandi.en}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Commodities Grid */}
      <div className="px-5 mt-6 relative z-0 space-y-4">
        {commodities.map((item) => (
          <GlassCard key={item.id} className="bg-white border border-slate-100 p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-xl">
                  {lang === 'hi' ? item.nameHi : item.nameEn}
                </h3>
                <div className="text-slate-500 text-sm mt-0.5">{item.variety}</div>
              </div>
              
              <button 
                onClick={() => toggleAlert(item.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  alerts[item.id] ? 'bg-pink-100 text-pink-600' : 'bg-slate-50 text-slate-400'
                }`}
              >
                {alerts[item.id] ? <BellRing size={20} /> : <Bell size={20} />}
              </button>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <div className="text-slate-400 text-xs mb-1 uppercase tracking-wider">{item.date}</div>
                <div className="text-3xl font-bold text-slate-800">
                  ₹{item.price}
                  <span className="text-sm font-normal text-slate-500 ml-1">/Qtl</span>
                </div>
              </div>
              
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold text-[15px] ${
                item.trend === 'up' ? 'bg-green-100 text-green-700' : 
                item.trend === 'down' ? 'bg-red-100 text-red-700' : 
                'bg-slate-100 text-slate-700'
              }`}>
                {item.trend === 'up' && <TrendingUp size={16} />}
                {item.trend === 'down' && <TrendingDown size={16} />}
                {item.change}
              </div>
            </div>
            
            {/* Fake Sparkline Graph */}
            <div className="mt-5 h-10 w-full flex items-end gap-1 px-1">
              {[40, 45, 30, 60, 50, 80, item.trend === 'up' ? 100 : 20].map((h, i) => (
                <div 
                  key={i} 
                  className={`flex-1 rounded-t-sm ${i === 6 ? (item.trend === 'up' ? 'bg-green-500' : 'bg-red-500') : 'bg-slate-100'}`} 
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold">
              <span>7 days ago</span>
              <span>Today</span>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  );
}
