import React from 'react';
import type { Language } from '../data/i18n';
import type { FarmerScreen } from '../FarmerApp';
import { ChevronRight } from 'lucide-react';

interface LanguageScreenProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onNavigate: (screen: FarmerScreen) => void;
}

export default function LanguageScreen({ currentLang, onSelectLang, onNavigate }: LanguageScreenProps) {
  
  const handleContinue = () => {
    onNavigate('login');
  };

  return (
    <div className="min-h-screen bg-[var(--farmer-surface)] flex flex-col pt-12 pb-8 px-6">
      
      {/* Header Logo Area */}
      <div className="flex flex-col items-center mb-10 mt-4">
        <div className="w-20 h-20 bg-[var(--farmer-primary)] rounded-3xl flex items-center justify-center shadow-lg mb-6 rotate-3">
          <span className="text-white text-3xl font-bold">K2</span>
        </div>
        <h1 className="text-2xl font-bold text-[var(--farmer-on-surface)] text-center px-4">
          {currentLang === 'hi' ? 'अपनी भाषा चुनें' : 'Choose your language'}
        </h1>
      </div>

      {/* Language Cards */}
      <div className="space-y-4 flex-1">
        
        <button 
          onClick={() => onSelectLang('hi')}
          className={`w-full flex items-center p-6 rounded-2xl transition-all border-2 ${
            currentLang === 'hi' 
              ? 'border-[var(--farmer-primary)] bg-[var(--farmer-primary-fixed)] bg-opacity-20 shadow-md' 
              : 'border-transparent bg-white shadow-sm'
          }`}
        >
          <div className="w-1.5 h-12 bg-green-500 rounded-full mr-5" />
          <div className="flex-1 text-left">
            <div className="text-2xl font-bold text-slate-800">हिंदी</div>
            <div className="text-sm text-slate-500 mt-1">Hindi</div>
          </div>
          {currentLang === 'hi' && <ChevronRight className="text-[var(--farmer-primary)]" />}
        </button>

        <button 
          onClick={() => onSelectLang('en')}
          className={`w-full flex items-center p-6 rounded-2xl transition-all border-2 ${
            currentLang === 'en' 
              ? 'border-[var(--farmer-primary)] bg-[var(--farmer-primary-fixed)] bg-opacity-20 shadow-md' 
              : 'border-transparent bg-white shadow-sm'
          }`}
        >
          <div className="w-1.5 h-12 bg-blue-500 rounded-full mr-5" />
          <div className="flex-1 text-left">
            <div className="text-2xl font-bold text-slate-800">English</div>
            <div className="text-sm text-slate-500 mt-1">English</div>
          </div>
          {currentLang === 'en' && <ChevronRight className="text-[var(--farmer-primary)]" />}
        </button>
        
        {/* Mock other languages for visual representation */}
        <button className="w-full flex items-center p-6 rounded-2xl border-2 border-transparent bg-white opacity-60">
          <div className="w-1.5 h-12 bg-orange-500 rounded-full mr-5" />
          <div className="flex-1 text-left">
            <div className="text-2xl font-bold text-slate-800">मराठी</div>
            <div className="text-sm text-slate-500 mt-1">Marathi</div>
          </div>
        </button>

      </div>

      {/* Continue CTA */}
      <div className="mt-auto pt-6">
        <button 
          onClick={handleContinue}
          className="w-full bg-gradient-primary text-white py-5 rounded-2xl text-xl font-bold shadow-lg shadow-green-900/20 active:scale-[0.98] transition-transform"
        >
          {currentLang === 'hi' ? 'आगे बढ़ें' : 'Continue'}
        </button>
      </div>

    </div>
  );
}
