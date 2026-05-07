import React, { useState } from 'react';
import { Download, ShoppingCart, TrendingUp, CheckCircle2, Building2 } from 'lucide-react';
import { mockFarmer } from '../data/mockFarmerData';
import { i18n, type Language } from '../data/i18n';
import GlassCard from '../ui/GlassCard';
import TransactionItem, { type TransactionType } from '../ui/TransactionItem';

interface PassbookScreenProps {
  lang: Language;
}

export default function PassbookScreen({ lang }: PassbookScreenProps) {
  const t = i18n[lang];
  const [filter, setFilter] = useState<TransactionType | 'all'>('all');

  // Format currency
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getIconForType = (type: TransactionType) => {
    switch (type) {
      case 'purchase': return ShoppingCart;
      case 'sale': return TrendingUp;
      case 'payment': return CheckCircle2;
      case 'loan': return Building2;
    }
  };

  const filteredTransactions = filter === 'all' 
    ? mockFarmer.transactions 
    : mockFarmer.transactions.filter(t => t.type === filter);

  return (
    <div className="pb-24 min-h-screen bg-[var(--farmer-surface)]">
      
      {/* 1. Header & Balance Card */}
      <div className="bg-gradient-primary rounded-b-[32px] pt-8 pb-12 px-6 shadow-md relative">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">{t.passbook}</h1>
        
        <GlassCard variant="dark" className="relative z-10 p-6 flex flex-col items-center">
          <div className="text-white/80 text-sm font-medium mb-1">{t.totalDue}</div>
          <div className="text-4xl font-bold text-red-300 drop-shadow-sm mb-4">
            {formatINR(mockFarmer.totalDue)}
          </div>
          
          <div className="w-full h-px bg-white/20 my-2" />
          
          <div className="w-full flex justify-between items-center mt-2">
            <span className="text-white/80 text-xs">{t.shareCapital}</span>
            <span className="text-green-300 font-bold">{formatINR(mockFarmer.shareCapital)}</span>
          </div>
        </GlassCard>
      </div>

      {/* 2. Content Area */}
      <div className="px-5 -mt-6 relative z-20">
        
        {/* Filter Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 pb-2">
          {['all', 'purchase', 'sale', 'payment', 'loan'].map((tab) => {
            const isActive = filter === tab;
            // Map tab to label
            const labelHi = tab === 'all' ? 'सभी' : 
                            tab === 'purchase' ? 'खरीद' : 
                            tab === 'sale' ? 'बिक्री' : 
                            tab === 'payment' ? 'भुगतान' : 'ऋण';
            const labelEn = tab === 'all' ? 'All' : 
                            tab === 'purchase' ? 'Purchases' : 
                            tab === 'sale' ? 'Sales' : 
                            tab === 'payment' ? 'Payments' : 'Loans';
            
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-[var(--farmer-primary)] text-white shadow-md' 
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {lang === 'hi' ? labelHi : labelEn}
              </button>
            );
          })}
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredTransactions.map((trx, index) => (
            <TransactionItem 
              key={trx.id} 
              data={trx} 
              icon={getIconForType(trx.type)} 
            />
          ))}
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              No transactions found.
            </div>
          )}
        </div>

        {/* Download Button */}
        <button className="w-full mt-6 bg-white border-2 border-[var(--farmer-primary)] text-[var(--farmer-primary)] py-4 rounded-2xl flex items-center justify-center gap-2 font-bold active:bg-green-50 transition-colors">
          <Download size={20} />
          {t.downloadPdf}
        </button>
      </div>

    </div>
  );
}
