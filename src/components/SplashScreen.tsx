import React from 'react';
import { Shield, Building2, Tractor, Activity, ChevronRight, ArrowLeft } from 'lucide-react';

interface SplashScreenProps {
  onEnterApp: (role: string) => void;
  onHome: () => void;
}

export default function SplashScreen({ onEnterApp, onHome }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative">
      
      {/* Back Button */}
      <button 
        onClick={onHome}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Return to Website</span>
      </button>

      {/* Centered Brand Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-[var(--brand)] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-2xl font-bold">K2</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Access Platform</h1>
        <p className="text-slate-500 mt-3 text-lg max-w-md mx-auto">
          Select your operational role to enter the secure environment.
        </p>
      </div>

      {/* Role Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
        
        <button 
          onClick={() => onEnterApp('ceo')}
          className="group flex items-center p-5 bg-white border border-slate-200 rounded-xl hover:border-[var(--brand)] hover:shadow-md transition-all text-left"
        >
          <div className="w-12 h-12 rounded-lg bg-[var(--brand-wash)] text-[var(--brand)] flex items-center justify-center mr-4 group-hover:bg-[var(--brand)] group-hover:text-white transition-colors">
            <Activity className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 text-lg group-hover:text-[var(--brand)] transition-colors">FPO CEO</h3>
            <p className="text-sm text-slate-500 mt-1">Strategic oversight and decision feed</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[var(--brand)] transition-colors" />
        </button>

        <button 
          onClick={() => onEnterApp('admin')}
          className="group flex items-center p-5 bg-white border border-slate-200 rounded-xl hover:border-[#2563eb] hover:shadow-md transition-all text-left"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">FPO Admin</h3>
            <p className="text-sm text-slate-500 mt-1">Full operational command controller</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
        </button>

        <button 
          onClick={() => onEnterApp('moderator')}
          className="group flex items-center p-5 bg-white border border-slate-200 rounded-xl hover:border-[#d97706] hover:shadow-md transition-all text-left"
        >
          <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mr-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Tractor className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 text-lg group-hover:text-amber-600 transition-colors">Moderator</h3>
            <p className="text-sm text-slate-500 mt-1">Mobile field-force coordination</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-600 transition-colors" />
        </button>

        <button 
          onClick={() => onEnterApp('platform')}
          className="group flex items-center p-5 bg-white border border-slate-200 rounded-xl hover:border-[#9333ea] hover:shadow-md transition-all text-left"
        >
          <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mr-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Shield className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 text-lg group-hover:text-purple-600 transition-colors">K2 Admin</h3>
            <p className="text-sm text-slate-500 mt-1">Master platform governance</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-purple-600 transition-colors" />
        </button>

      </div>

      <div className="mt-12 text-center text-sm text-slate-400">
        <p>Preview Environment · Select a role to simulate login</p>
      </div>
    </div>
  );
}
