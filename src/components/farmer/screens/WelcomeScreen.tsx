import React, { useState } from 'react';
import { Leaf, ShieldCheck, Wallet } from 'lucide-react';
import type { Language } from '../data/i18n';
import type { FarmerScreen } from '../FarmerApp';
import { mockFarmer } from '../data/mockFarmerData';

interface WelcomeScreenProps {
  lang: Language;
  onNavigate: (screen: FarmerScreen) => void;
}

export default function WelcomeScreen({ lang, onNavigate }: WelcomeScreenProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: Leaf,
      color: 'text-green-500',
      bg: 'bg-green-100',
      titleHi: 'आपकी डिजिटल डायरी',
      titleEn: 'Your Digital Diary',
      descHi: 'अपने खेत का सारा हिसाब-किताब एक जगह रखें।',
      descEn: 'Keep all your farm accounts in one place.'
    },
    {
      icon: Wallet,
      color: 'text-amber-500',
      bg: 'bg-amber-100',
      titleHi: 'पारदर्शी लेन-देन',
      titleEn: 'Transparent Transactions',
      descHi: 'FPO के साथ अपने सभी लेन-देन और बकाया राशि देखें।',
      descEn: 'View all your transactions and dues with FPO.'
    },
    {
      icon: ShieldCheck,
      color: 'text-blue-500',
      bg: 'bg-blue-100',
      titleHi: 'निजी और सुरक्षित',
      titleEn: 'Private & Secure',
      descHi: 'आपका डेटा सुरक्षित है। केवल आप और आपका FPO इसे देख सकते हैं।',
      descEn: 'Your data is secure. Only you and your FPO can see it.'
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      onNavigate('home');
    }
  };

  const current = steps[step];
  const Icon = current.icon;

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col justify-end p-6 pb-12 relative overflow-hidden">
      
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-full h-1/2 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle at top right, white 10%, transparent 60%)' }} 
      />

      <div className="text-white text-center mb-auto pt-20 relative z-10">
        <h1 className="text-4xl font-bold mb-4 drop-shadow-md">
          {lang === 'hi' ? 'स्वागत है,' : 'Welcome,'} <br/>
          {lang === 'hi' ? mockFarmer.nameHi : mockFarmer.nameEn}
        </h1>
        <div className="px-6 py-2 bg-white/20 rounded-full inline-block backdrop-blur-md border border-white/20 font-bold tracking-wide">
          {mockFarmer.fpoName}
        </div>
      </div>

      {/* Feature Cards Carousel */}
      <div className="bg-white rounded-[32px] p-8 mt-12 mb-8 shadow-2xl relative z-10 min-h-[280px] flex flex-col items-center justify-center text-center transform transition-all">
        
        <div className={`w-20 h-20 ${current.bg} ${current.color} rounded-3xl flex flex-col items-center justify-center mb-6`}>
          <Icon size={40} strokeWidth={2} />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {lang === 'hi' ? current.titleHi : current.titleEn}
        </h2>
        
        <p className="text-slate-500 text-[15px] leading-relaxed max-w-[240px]">
          {lang === 'hi' ? current.descHi : current.descEn}
        </p>

        {/* Progress dots */}
        <div className="flex gap-2 mt-8 absolute bottom-8">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all ${
                i === step ? 'w-8 bg-[var(--farmer-primary)]' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      <button 
        onClick={handleNext}
        className="w-full bg-[var(--farmer-primary-fixed)] text-[var(--farmer-primary)] py-5 rounded-2xl text-xl font-bold shadow-lg active:scale-95 transition-transform"
      >
        {step < steps.length - 1 
          ? (lang === 'hi' ? 'आगे बढ़ें' : 'Next')
          : (lang === 'hi' ? 'शुरू करें' : "Let's Go")}
      </button>

    </div>
  );
}
