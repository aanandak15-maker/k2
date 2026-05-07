import React, { useState } from 'react';
import { Delete } from 'lucide-react';
import type { Language } from '../data/i18n';
import { i18n } from '../data/i18n';
import type { FarmerScreen } from '../FarmerApp';

interface LoginScreenProps {
  lang: Language;
  onNavigate: (screen: FarmerScreen) => void;
}

export default function LoginScreen({ lang, onNavigate }: LoginScreenProps) {
  const t = i18n[lang];
  const [phone, setPhone] = useState('');

  const handleKeyPress = (num: string) => {
    if (phone.length < 10) setPhone(prev => prev + num);
  };

  const handleDelete = () => {
    setPhone(prev => prev.slice(0, -1));
  };

  const handleContinue = () => {
    if (phone.length === 10) {
      onNavigate('otp');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--farmer-surface)] flex flex-col pt-12 pb-6 px-6">
      
      {/* Header */}
      <div className="text-center mb-10 mt-2">
        <h1 className="text-2xl font-bold text-[var(--farmer-on-surface)] leading-tight">
          {t.enterMobile}
        </h1>
        <p className="text-[var(--farmer-on-surface-variant)] mt-2">
          {t.connectFpo}
        </p>
      </div>

      {/* Input Field */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <div className="text-2xl font-bold px-4 py-4 bg-white rounded-xl border-2 border-slate-200 text-slate-600">
          +91
        </div>
        <div className="flex-1 px-4 py-4 bg-white rounded-xl border-2 border-[var(--farmer-primary)] text-3xl font-bold tracking-widest text-[var(--farmer-on-surface)] shadow-[0_0_0_4px_rgba(21,128,61,0.1)] h-[68px] flex items-center">
          {phone || <span className="opacity-30 tracking-normal text-2xl font-normal">99999 99999</span>}
        </div>
      </div>

      {/* Custom Keypad */}
      <div className="grid grid-cols-3 gap-3 mb-8 w-full max-w-[320px] mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleKeyPress(num.toString())}
            className="h-16 text-3xl font-semibold bg-white rounded-2xl shadow-sm active:bg-slate-100 active:scale-95 transition-all text-slate-800"
          >
            {num}
          </button>
        ))}
        <div className="h-16"></div> {/* Empty space */}
        <button
          onClick={() => handleKeyPress('0')}
          className="h-16 text-3xl font-semibold bg-white rounded-2xl shadow-sm active:bg-slate-100 active:scale-95 transition-all text-slate-800"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          className="h-16 flex items-center justify-center bg-white rounded-2xl shadow-sm active:bg-slate-200 active:scale-95 transition-all text-slate-600"
        >
          <Delete size={32} />
        </button>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <button 
          onClick={handleContinue}
          disabled={phone.length !== 10}
          className={`w-full py-5 rounded-2xl text-xl font-bold transition-all ${
            phone.length === 10
              ? 'bg-[var(--farmer-primary)] text-white shadow-lg active:scale-[0.98]'
              : 'bg-slate-200 text-slate-400'
          }`}
        >
          {t.sendOtp}
        </button>
        
        <div className="mt-8 space-y-4 text-center">
          <button className="text-[13px] font-bold text-[var(--farmer-primary)] hover:underline block w-full">
            {t.invitedByFpo}
          </button>
          <button className="text-[13px] font-bold text-[var(--farmer-secondary)] hover:underline block w-full">
            {t.newFarmer}
          </button>
        </div>
      </div>
    </div>
  );
}
