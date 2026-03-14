import React from 'react';

export default function TrustBar() {
  const badges = [
    'SFAC · Aligned',
    'NABARD · Compatible',
    'RBI · Compliant',
    '10,000 FPO Scheme',
    'ISO 27001 · Pending',
  ];

  return (
    <section className="bg-white py-6 border-b border-slate-200">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 shrink-0">
          Standards & Compliance
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          {badges.map((badge, i) => (
            <span
              key={i}
              className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 border border-slate-200 rounded-md px-3 py-1.5 bg-slate-50 whitespace-nowrap"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
