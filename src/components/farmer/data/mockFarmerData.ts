import { type TransactionProp } from '../ui/TransactionItem';

export const mockFarmer = {
  id: 'f-1234',
  nameHi: 'रामेश यादव',
  nameEn: 'Ramesh Yadav',
  fpoName: 'Sikandrabad FPC',
  fpoId: 'fpo-skd',
  photoUrl: 'https://i.pravatar.cc/150?u=ramesh',
  mobile: '+91 98765 43210',
  village: 'Pilkhana',
  memberSince: '2022',
  
  // Financials
  totalDue: 4200,
  shareCapital: 1000,
  
  // Weather
  weather: {
    temp: 32,
    condition: 'sunny',
    advisoryHi: 'गेहूं की सिंचाई के लिए अगले 3 दिन उपयुक्त हैं',
    advisoryEn: 'Next 3 days suitable for wheat irrigation'
  },
  
  // Notices
  notices: [
    {
      id: 'n1',
      date: '24 Mar 2026',
      titleHi: 'बीज वितरण कल से शुरू',
      titleEn: 'Seed distribution starts tomorrow',
      isNew: true
    }
  ],
  
  // Plots
  plots: [
    {
      id: 'p1',
      nameHi: 'खेत 1',
      nameEn: 'Plot 1',
      cropHi: 'गेहूं',
      cropEn: 'Wheat',
      variety: 'HD-2967',
      area: 2.5,
      stage: 4, // 0-4
      health: 85, // percentage
      status: 'healthy',
      harvestDate: '15 Apr 2026'
    },
    {
      id: 'p2',
      nameHi: 'खेत 2',
      nameEn: 'Plot 2',
      cropHi: 'सरसों',
      cropEn: 'Mustard',
      variety: 'Pusa Bold',
      area: 1.2,
      stage: 3,
      health: 60,
      status: 'attention',
      harvestDate: '10 Apr 2026'
    }
  ],
  
  // Mandi Prices
  mandi: [
    { id: 'm1', itemHi: 'गेहूं', itemEn: 'Wheat', price: 2450, trend: 'up' },
    { id: 'm2', itemHi: 'सरसों', itemEn: 'Mustard', price: 5200, trend: 'down' },
  ],
  
  // Transactions
  transactions: [
    {
      id: 't1',
      type: 'purchase',
      titleHi: 'DAP उर्वरक 50kg',
      titleEn: 'DAP Fertilizer 50kg',
      date: '15 Mar',
      amount: -2400
    },
    {
      id: 't2',
      type: 'sale',
      titleHi: 'गेहूं बिक्री 20 क्विंटल',
      titleEn: 'Wheat Sale 20q',
      date: '10 Mar',
      amount: 48000
    },
    {
      id: 't3',
      type: 'payment',
      titleHi: 'नकद भुगतान',
      titleEn: 'Cash Payment',
      date: '08 Mar',
      amount: -10000
    },
    {
      id: 't4',
      type: 'purchase',
      titleHi: 'गेहूं बीज 25kg',
      titleEn: 'Wheat Seed 25kg',
      date: '05 Feb',
      amount: -1800
    }
  ] as TransactionProp[]
};
