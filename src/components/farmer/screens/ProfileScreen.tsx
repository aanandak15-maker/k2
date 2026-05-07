import React from 'react';
import { User, MapPin, Building, ShieldCheck, LogOut, ChevronRight, HelpCircle } from 'lucide-react';
import { mockFarmer } from '../data/mockFarmerData';
import { i18n, type Language } from '../data/i18n';
import GlassCard from '../ui/GlassCard';

interface ProfileScreenProps {
  lang: Language;
  onLogout: () => void;
}

export default function ProfileScreen({ lang, onLogout }: ProfileScreenProps) {
  const t = i18n[lang];

  return (
    <div className="pb-32 min-h-screen bg-[var(--farmer-surface)] relative">
      
      {/* 1. Header (Simple) */}
      <div className="bg-[var(--farmer-primary)] h-32 rounded-b-[40px] shadow-sm relative z-0">
        <h1 className="text-2xl font-bold text-white text-center pt-8">{t.profile}</h1>
      </div>

      {/* 2. Profile Card Overlapping */}
      <div className="px-5 -mt-10 relative z-10 block">
        <div className="bg-white rounded-[28px] p-6 shadow-xl border border-slate-100 flex flex-col items-center">
          <div className="relative">
            <img 
              src={mockFarmer.photoUrl} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover bg-slate-100"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
              <ShieldCheck size={14} className="text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-4 text-center">
            {lang === 'hi' ? mockFarmer.nameHi : mockFarmer.nameEn}
          </h2>
          <div className="text-slate-500 font-medium text-sm mt-1">{mockFarmer.mobile}</div>
          
          <div className="flex gap-2 mt-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">KYC Verified</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Active Member</span>
          </div>
        </div>
      </div>

      {/* 3. Info Sections */}
      <div className="px-5 mt-6 space-y-4">
        
        {/* FPO Card */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
            <Building size={24} />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-500 mb-0.5">FPO Organization</div>
            <div className="font-bold text-slate-800">{mockFarmer.fpoName}</div>
          </div>
          <div className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">ID: {mockFarmer.fpoId}</div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
            <MapPin size={24} />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-500 mb-0.5">Village</div>
            <div className="font-bold text-slate-800">{mockFarmer.village}</div>
          </div>
        </div>

        {/* Action Menu */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 mt-8">
          <button className="w-full flex items-center p-5 border-b border-slate-50 active:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mr-4">
              <HelpCircle size={20} />
            </div>
            <div className="flex-1 text-left font-semibold text-slate-800">
              {lang === 'hi' ? 'सहायता एवं संपर्क' : 'Help & Support'}
            </div>
            <ChevronRight className="text-slate-300" />
          </button>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center p-5 active:bg-slate-50 transition-colors"
          >
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center mr-4">
              <LogOut size={20} />
            </div>
            <div className="flex-1 text-left font-bold text-red-600">
              {t.logout}
            </div>
          </button>
        </div>

        <div className="text-center text-slate-400 text-xs mt-8 mb-4">
          K2 Krishi Kutumb App v1.0.0 (Pilot)
        </div>

      </div>
    </div>
  );
}
