import React from 'react';
import { Home, Leaf, ShoppingCart, Wallet, User, type LucideIcon } from 'lucide-react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: any) => void;
}

interface NavItem {
  id: string;
  en: string;
  hi: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { id: 'home', en: 'Home', hi: 'होम', icon: Home },
  { id: 'farm', en: 'Farm', hi: 'खेत', icon: Leaf },
  { id: 'passbook', en: 'Passbook', hi: 'पासबुक', icon: Wallet },
  { id: 'shop', en: 'Shop', hi: 'दुकान', icon: ShoppingCart },
  { id: 'profile', en: 'Profile', hi: 'प्रोफ़ाइल', icon: User },
];

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 sm:max-w-md sm:mx-auto glass-panel border-t border-[rgba(190,202,188,0.3)] pb-safe z-50">
      <div className="flex justify-around items-center p-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? 'text-[var(--farmer-primary)] bg-[var(--farmer-primary-fixed)] bg-opacity-20' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
              style={{ minWidth: '64px', minHeight: '64px' }} // FAO criteria: large touch targets
            >
              <Icon 
                className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} 
              />
              <span className={`text-[11px] font-bold ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {item.hi}
              </span>
              
              {/* Active Indicator Dot */}
              {isActive && (
                <div className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[var(--farmer-primary)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
