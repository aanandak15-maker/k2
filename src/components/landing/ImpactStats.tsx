import React from 'react';
import { motion } from 'framer-motion';

export default function ImpactStats() {
  const stats = [
    { value: '1,200+', label: 'FPOs Onboarded', detail: 'across India' },
    { value: '4.5L', label: 'Farmers Digitized', detail: 'with structured profiles' },
    { value: '₹240Cr', label: 'Input Value Tracked', detail: 'fertilizers, seeds, agrochemicals' },
    { value: '12', label: 'States Active', detail: 'from Punjab to Tamil Nadu' },
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-100" id="impact">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <div className="lg:max-w-xs shrink-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand)] mb-3">Scale</p>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Platform footprint as of Q4 2025.</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 flex-1 w-full">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, type: 'spring' }}
                className="text-center lg:text-left"
              >
                <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-slate-700 mb-0.5">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
