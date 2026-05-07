import React from 'react';
import { Leaf, Wallet, ShoppingCart, TrendingUp, HelpCircle, Bell } from 'lucide-react';
import { mockFarmer } from '../data/mockFarmerData';
import { i18n, type Language } from '../data/i18n';
import ActionCard from '../ui/ActionCard';
import GlassCard from '../ui/GlassCard';
import type { FarmerScreen } from '../FarmerApp';

interface HomeScreenProps {
  onNavigate: (screen: FarmerScreen) => void;
  lang: Language;
}

export default function HomeScreen({ onNavigate, lang }: HomeScreenProps) {
  const t = i18n[lang];
  const tAlt = lang === 'hi' ? i18n.en : i18n.hi;

  return (
    <div className="pb-24">
      {/* 1. Header & Weather Strip */}
      <div className="bg-gradient-primary rounded-b-[32px] pt-8 pb-10 px-6 text-white shadow-lg relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white opacity-5 rounded-full" />
        
        <div className="flex items-center gap-4 relative z-10">
          <img 
            src={mockFarmer.photoUrl} 
            alt="Farmer" 
            className="w-16 h-16 rounded-full border-2 border-white/20 shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-sans">
              {t.namaste}, {lang === 'hi' ? mockFarmer.nameHi : mockFarmer.nameEn} 🙏
            </h1>
            <div className="inline-block mt-1 px-3 py-1 bg-white/10 rounded-full text-xs backdrop-blur-sm border border-white/10">
              {mockFarmer.fpoName}
            </div>
          </div>
        </div>

        {/* Weather Indicator */}
        <div className="mt-8 flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
          <div className="text-4xl">☀️</div>
          <div>
            <div className="font-bold text-lg">{mockFarmer.weather.temp}°C</div>
            <div className="text-sm opacity-90">{lang === 'hi' ? mockFarmer.weather.advisoryHi : mockFarmer.weather.advisoryEn}</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-5 -mt-6 relative z-20 space-y-6">
        
        {/* Mandi Ticker */}
        <GlassCard className="p-0 overflow-hidden flex items-center bg-white shadow-sm border border-slate-100">
          <div className="bg-[var(--farmer-primary)] text-white px-4 py-3 font-bold text-xs whitespace-nowrap">
            मंडी भाव
          </div>
          <div className="overflow-hidden flex-1 relative h-full flex items-center">
            <div className="animate-marquee whitespace-nowrap text-sm font-medium flex gap-8">
              {mockFarmer.mandi.map(m => (
                <span key={m.id} className="flex items-center gap-1">
                  {lang === 'hi' ? m.itemHi : m.itemEn} 
                  <span className="font-bold ml-1">₹{m.price}</span>
                  {m.trend === 'up' ? <span className="text-green-500">↑</span> : <span className="text-red-500">↓</span>}
                </span>
              ))}
              {/* Duplicate for infinite scroll feel */}
              {mockFarmer.mandi.map(m => (
                <span key={m.id + '-dup'} className="flex items-center gap-1">
                  {lang === 'hi' ? m.itemHi : m.itemEn} 
                  <span className="font-bold ml-1">₹{m.price}</span>
                  {m.trend === 'up' ? <span className="text-green-500">↑</span> : <span className="text-red-500">↓</span>}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Action Grid (2x3) */}
        <div className="grid grid-cols-2 gap-4">
          <ActionCard 
            icon={Leaf} 
            titleHi={i18n.hi.farm} 
            titleEn={i18n.en.farm} 
            color="green" 
            onClick={() => onNavigate('farm')} 
          />
          <ActionCard 
            icon={Wallet} 
            titleHi={i18n.hi.passbook} 
            titleEn={i18n.en.passbook} 
            color="amber" 
            onClick={() => onNavigate('passbook')} 
          />
          <ActionCard 
            icon={ShoppingCart} 
            titleHi={i18n.hi.shop} 
            titleEn={i18n.en.shop} 
            color="blue" 
            onClick={() => onNavigate('shop')} 
          />
          <ActionCard 
            icon={TrendingUp} 
            titleHi={i18n.hi.mandi} 
            titleEn={i18n.en.mandi} 
            color="pink" 
            onClick={() => onNavigate('mandi')} 
          />
          <ActionCard 
            icon={HelpCircle} 
            titleHi={i18n.hi.help} 
            titleEn={i18n.en.help} 
            color="teal" 
            onClick={() => {}} 
          />
          <ActionCard 
            icon={Bell} 
            titleHi={i18n.hi.alerts} 
            titleEn={i18n.en.alerts} 
            color="orange" 
            badgeCount={3}
            onClick={() => {}} 
          />
        </div>

        {/* FPO Notice */}
        {mockFarmer.notices.length > 0 && (
          <GlassCard className="bg-blue-50/50 border border-blue-100 flex gap-4 items-start">
            <div className="text-3xl mt-1">📢</div>
            <div>
              <div className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-1">{t.fpoNotice}</div>
              <h3 className="font-bold text-[15px] text-slate-900 leading-snug">
                {lang === 'hi' ? mockFarmer.notices[0].titleHi : mockFarmer.notices[0].titleEn}
              </h3>
              <div className="text-xs text-slate-500 mt-2">{mockFarmer.notices[0].date}</div>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
