import React, { useState, useEffect } from 'react';
import type { Language } from '../data/i18n';
import { i18n } from '../data/i18n';
import type { FarmerScreen } from '../FarmerApp';

interface OTPScreenProps {
  lang: Language;
  onNavigate: (screen: FarmerScreen) => void;
}

export default function OTPScreen({ lang, onNavigate }: OTPScreenProps) {
  const t = i18n[lang];
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const isComplete = otp.every(digit => digit !== '');

  const handleVerify = () => {
    if (isComplete) {
      onNavigate('welcome');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--farmer-surface)] flex flex-col pt-12 pb-6 px-6 relative">
      <button 
        onClick={() => onNavigate('login')}
        className="absolute top-6 left-6 text-slate-500 p-2"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="text-center mb-12 mt-12">
        <h1 className="text-3xl font-bold text-[var(--farmer-on-surface)] leading-tight">
          {t.enterOtp}
        </h1>
        <p className="text-[var(--farmer-on-surface-variant)] mt-3">
          We sent a code to +91 99999 99999
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-4 mb-12">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="number"
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleInput(index, e.target.value)}
            className="w-16 h-20 text-center text-4xl font-bold bg-white border-2 rounded-2xl focus:border-[var(--farmer-primary)] focus:outline-none transition-colors"
            style={{ borderColor: digit ? 'var(--farmer-primary)' : '#e2e8f0' }}
          />
        ))}
      </div>

      {/* Resend */}
      <div className="text-center font-bold">
        {countdown > 0 ? (
          <span className="text-slate-400">00:{countdown.toString().padStart(2, '0')}</span>
        ) : (
          <button 
            onClick={() => setCountdown(30)}
            className="text-[var(--farmer-primary)] hover:underline"
          >
            {t.resend}
          </button>
        )}
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <button 
          onClick={handleVerify}
          disabled={!isComplete}
          className={`w-full py-5 rounded-2xl text-xl font-bold transition-all ${
            isComplete
              ? 'bg-[var(--farmer-primary)] text-white shadow-lg active:scale-[0.98]'
              : 'bg-slate-200 text-slate-400'
          }`}
        >
          {t.verify}
        </button>
      </div>
    </div>
  );
}
