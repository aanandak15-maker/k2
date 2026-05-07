import React from 'react';
import { type LucideIcon } from 'lucide-react';

export type TransactionType = 'purchase' | 'sale' | 'payment' | 'loan';

export interface TransactionProp {
  id: string;
  type: TransactionType;
  titleHi: string;
  titleEn: string;
  date: string;
  amount: number;
}

interface TransactionItemProps {
  key?: React.Key;
  data: TransactionProp;
  icon: LucideIcon;
}

const typeStyles = {
  purchase: { bg: 'bg-red-50', text: 'text-red-700', iconBg: 'bg-red-100' },
  sale:     { bg: 'bg-green-50', text: 'text-green-700', iconBg: 'bg-green-100' },
  payment:  { bg: 'bg-red-50', text: 'text-red-700', iconBg: 'bg-red-100' },
  loan:     { bg: 'bg-amber-50', text: 'text-amber-700', iconBg: 'bg-amber-100' },
};

export default function TransactionItem({ data, icon: Icon }: TransactionItemProps) {
  const isCredit = data.amount > 0;
  const style = typeStyles[data.type];
  
  // Format amount: ₹1,500
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Math.abs(data.amount));

  return (
    <div className="flex items-center p-4 bg-[var(--farmer-surface-container-lowest)] rounded-2xl mb-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      {/* Icon */}
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${style.iconBg} ${style.text} mr-4`}>
        <Icon size={24} strokeWidth={2} />
      </div>
      
      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-bold text-[var(--farmer-on-surface)] truncate">
          {data.titleHi}
        </h4>
        <div className="flex items-center mt-1">
          <span className="text-[11px] text-[var(--farmer-on-surface-variant)] truncate mr-2">
            {data.titleEn}
          </span>
          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {data.date}
          </span>
        </div>
      </div>
      
      {/* Amount */}
      <div className={`ml-3 text-right flex-shrink-0`}>
        <span className={`text-[16px] font-bold ${isCredit ? 'text-[var(--farmer-primary)]' : 'text-[var(--farmer-tertiary)]'}`}>
          {isCredit ? '+' : '-'}{formattedAmount}
        </span>
      </div>
    </div>
  );
}
