import React, { useState } from 'react';
import { Camera, Mic, Activity, Clock, Sprout } from 'lucide-react';
import { mockFarmer } from '../data/mockFarmerData';
import { i18n, type Language } from '../data/i18n';
import GlassCard from '../ui/GlassCard';

interface MyFarmScreenProps {
  lang: Language;
}

export default function MyFarmScreen({ lang }: MyFarmScreenProps) {
  const t = i18n[lang];
  const [activePlot, setActivePlot] = useState(mockFarmer.plots[0]);

  return (
    <div className="pb-24 min-h-screen bg-[var(--farmer-surface)]">
      
      {/* 1. Header & Hero Crop Card */}
      <div className="bg-gradient-amber rounded-b-[32px] pt-8 pb-10 px-6 shadow-md relative">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">{t.myFarm}</h1>
        
        <GlassCard variant="dark" className="bg-[#934b19]/90 border-amber-300/30">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-white/80 text-xs uppercase tracking-wider mb-1">
                {lang === 'hi' ? activePlot.nameHi : activePlot.nameEn}
              </div>
              <h2 className="text-3xl font-bold text-white">
                {lang === 'hi' ? activePlot.cropHi : activePlot.cropEn}
              </h2>
              <div className="text-amber-200 text-sm mt-1">{activePlot.variety}</div>
            </div>
            
            {/* Health Indicator Ring */}
            <div className="relative w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border-4"
                 style={{ borderColor: activePlot.health > 70 ? '#4ade80' : '#facc15' }}>
              <span className="text-white font-bold">{activePlot.health}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <div className="text-white/70 text-xs mb-1">Area</div>
              <div className="text-white font-bold">{activePlot.area} {t.acre}</div>
            </div>
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <div className="text-white/70 text-xs mb-1">Harvest</div>
              <div className="text-white font-bold">{activePlot.harvestDate.slice(0, 6)}</div>
            </div>
          </div>

          {/* Growth Timeline (Simplified 5 stage) */}
          <div className="mt-6">
            <div className="flex justify-between items-center relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/20 -z-10 -translate-y-1/2 rounded-full" />
              <div className="absolute top-1/2 left-0 h-1 bg-amber-400 -z-10 -translate-y-1/2 rounded-full transition-all" 
                   style={{ width: `${(activePlot.stage / 4) * 100}%` }} />
              
              {[0, 1, 2, 3, 4].map(s => (
                <div key={s} 
                     className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-colors ${
                       s <= activePlot.stage ? 'bg-amber-400 text-amber-900 border-2 border-[#934b19]' : 'bg-[#934b19] text-white/50 border-2 border-white/20'
                     }`}>
                  {s + 1}
                </div>
              ))}
            </div>
            <div className="text-center text-amber-200 mt-2 text-xs font-medium">Stage {activePlot.stage + 1} / 5</div>
          </div>
        </GlassCard>
      </div>

      {/* 2. Content Area */}
      <div className="px-5 -mt-4 relative z-20 space-y-6">
        
        {/* Plot Selector (Horizontal Scroll) */}
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2">
          {mockFarmer.plots.map(plot => (
            <button
              key={plot.id}
              onClick={() => setActivePlot(plot)}
              className={`flex-shrink-0 w-40 p-4 rounded-2xl text-left transition-all border-2 ${
                activePlot.id === plot.id 
                  ? 'bg-white border-amber-500 shadow-md' 
                  : 'bg-white/60 border-transparent shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">{lang === 'hi' ? plot.nameHi : plot.nameEn}</span>
                <div className={`w-2 h-2 rounded-full ${plot.status === 'healthy' ? 'bg-green-500' : 'bg-amber-500'}`} />
              </div>
              <div className="font-bold text-slate-800 text-lg">{lang === 'hi' ? plot.cropHi : plot.cropEn}</div>
              <div className="text-xs text-slate-500">{plot.area} {t.acre}</div>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-teal-50 border border-teal-100 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform shadow-sm">
            <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center">
              <Camera size={28} />
            </div>
            <div className="text-center">
              <div className="font-bold text-teal-900 leading-tight">{t.scanCrop}</div>
              <div className="text-[10px] text-teal-700 font-medium">Scan Crop</div>
            </div>
          </button>
          
          <button className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform shadow-sm">
            <div className="w-14 h-14 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center">
              <Mic size={28} />
            </div>
            <div className="text-center">
              <div className="font-bold text-orange-900 leading-tight">{t.voiceLog}</div>
              <div className="text-[10px] text-orange-700 font-medium">Voice Log</div>
            </div>
          </button>
        </div>

        {/* Advisory Card */}
        <GlassCard className="bg-white border border-slate-200">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Sprout size={24} />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">{t.advisory}</div>
              <p className="font-semibold text-slate-800 text-[15px] leading-snug">
                {lang === 'hi' ? mockFarmer.weather.advisoryHi : mockFarmer.weather.advisoryEn}
              </p>
            </div>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
