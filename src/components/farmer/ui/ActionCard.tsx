import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface ActionCardProps {
  icon: LucideIcon;
  titleHi: string;
  titleEn: string;
  color: 'green' | 'amber' | 'blue' | 'pink' | 'teal' | 'orange';
  onClick: () => void;
  badgeCount?: number;
}

const colorMaps = {
  green: { bg: 'bg-[#dcfce7]', text: 'text-[#166534]', iconBg: 'bg-[#bbf7d0]' },
  amber: { bg: 'bg-[#fef3c7]', text: 'text-[#92400e]', iconBg: 'bg-[#fde68a]' },
  blue:  { bg: 'bg-[#dbeafe]', text: 'text-[#1e3a8a]', iconBg: 'bg-[#bfdbfe]' },
  pink:  { bg: 'bg-[#fce7f3]', text: 'text-[#9d174d]', iconBg: 'bg-[#fbcfe8]' },
  teal:  { bg: 'bg-[#ccfbf1]', text: 'text-[#0f766e]', iconBg: 'bg-[#99f6e4]' },
  orange:{ bg: 'bg-[#ffedd5]', text: 'text-[#c2410c]', iconBg: 'bg-[#fed7aa]' },
};

export default function ActionCard({ icon: Icon, titleHi, titleEn, color, onClick, badgeCount }: ActionCardProps) {
  const theme = colorMaps[color];

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-2xl ${theme.bg} transition-transform active:scale-95 relative overflow-hidden`}
      style={{ minHeight: '110px' }}
    >
      {/* Background decoration */}
      <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full ${theme.iconBg} opacity-50`} />
      
      {/* Icon */}
      <div className={`${theme.text} mb-3 relative z-10`}>
        <Icon size={32} strokeWidth={1.5} />
        
        {/* Optional Badge */}
        {badgeCount !== undefined && badgeCount > 0 && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow-sm">
            {badgeCount}
          </div>
        )}
      </div>
      
      {/* Bilingual Labels */}
      <div className="text-center relative z-10 w-full">
        <div className={`font-bold text-[15px] leading-tight ${theme.text}`}>
          {titleHi}
        </div>
        <div className={`text-[10px] font-medium leading-tight mt-0.5 opacity-80 ${theme.text}`}>
          {titleEn}
        </div>
      </div>
    </button>
  );
}
