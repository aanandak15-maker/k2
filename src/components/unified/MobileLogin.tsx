import React, { useState } from 'react';
import {
  Activity, Building2, Tractor, Shield, Wheat,
  Phone, ArrowRight, ArrowLeft, ChevronRight,
  Globe2
} from 'lucide-react';
import type { UserRole } from './MobileAppBar';

interface MobileLoginProps {
  onLogin: (role: UserRole, name: string) => void;
}

type LoginStep = 'role';

interface RoleConfig {
  id: UserRole;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  name: string; // Mock name for demo
}

const roles: RoleConfig[] = [
  {
    id: 'ceo',
    label: 'FPO CEO',
    description: 'Strategic oversight & decision feed',
    icon: Activity,
    color: '#2F5C33',
    bg: '#F0F5EF',
    border: '#A7BEA4',
    name: 'Ramesh Kumar',
  },
  {
    id: 'admin',
    label: 'FPO Admin',
    description: 'Full operational command',
    icon: Building2,
    color: '#1d4ed8',
    bg: '#eff6ff',
    border: '#93c5fd',
    name: 'Ramesh Gupta',
  },
  {
    id: 'moderator',
    label: 'Moderator',
    description: 'Field-force coordination',
    icon: Tractor,
    color: '#b45309',
    bg: '#fffbeb',
    border: '#fcd34d',
    name: 'Suresh Kumar',
  },
  {
    id: 'farmer',
    label: 'Farmer',
    description: 'My farm, shop & passbook',
    icon: Wheat,
    color: '#00652c',
    bg: '#f0fdf4',
    border: '#86efac',
    name: 'Raju Yadav',
  },
  {
    id: 'platform',
    label: 'K2 Admin',
    description: 'Master platform governance',
    icon: Shield,
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#c4b5fd',
    name: 'Super Admin',
  },
];

export default function MobileLogin({ onLogin }: MobileLoginProps) {
  const [step, setStep] = useState<LoginStep>('role');
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const handleRoleSelect = (r: RoleConfig) => {
    onLogin(r.id, r.name);
  };

  return (
    <div className="min-h-svh bg-slate-50 flex flex-col">
      {/* Status bar spacer */}
      <div style={{ height: 'env(safe-area-inset-top, 0px)' }} />

      {/* Language toggle */}
      <div className="flex justify-end px-4 pt-4">
        <button
          onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 shadow-sm"
        >
          <Globe2 size={14} />
          {lang === 'en' ? 'हिंदी' : 'English'}
        </button>
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center px-6 pt-8 pb-6">
        <div className="w-14 h-14 bg-[#2F5C33] rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <span className="text-white font-black text-xl">K2</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 text-center">
          {lang === 'hi' ? 'के2 मंच' : 'K2 Platform'}
        </h1>
        <p className="text-slate-500 text-sm text-center mt-1">
          {lang === 'hi' ? 'किसान उत्पादक संगठन प्रबंधन' : 'FPO Management System'}
        </p>
      </div>

      {/* ===== STEP: Role Selection ===== */}
      {step === 'role' && (
        <div className="flex-1 px-4 pb-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
            {lang === 'hi' ? 'अपनी भूमिका चुनें' : 'Select your role'}
          </p>

          <div className="space-y-2.5">
            {roles.map(r => {
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  onClick={() => handleRoleSelect(r)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border-2 transition-all duration-200 active:scale-[0.98] text-left"
                  style={{ borderColor: r.border, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: r.bg }}
                  >
                    <Icon size={20} style={{ color: r.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-[15px]">{r.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{r.description}</p>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 shrink-0" />
                </button>
              );
            })}
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            {lang === 'hi' ? 'प्रदर्शन मोड · भूमिका चुनें' : 'Demo Mode · Select a role to continue'}
          </p>
        </div>
      )}


    </div>
  );
}
