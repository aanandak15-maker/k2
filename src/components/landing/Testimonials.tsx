import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const stories = [
    {
      quote: 'Before Krishi Kutumb, our SFAC quarterly report took 3 weeks of manual compilation from WhatsApp groups and handwritten registers. Now it generates in 2 minutes — and the data quality is incomparably better.',
      author: 'Rajesh Kumar Singh',
      role: 'CEO',
      org: 'Kisan Samridhhi Farmer Producer Company Ltd.',
      location: 'Sagar, Madhya Pradesh',
      stat: '3 weeks → 2 min',
      statLabel: 'report generation time',
    },
    {
      quote: 'When we applied for an NBFC loan, the credit analyst could not believe we had digital records for 1,200 farmers with complete KYC, transaction history, and crop data. The loan was sanctioned in 18 days instead of the usual 90.',
      author: 'Sanjay Patel',
      role: 'Director',
      org: 'Annapurna AgriGrow FPC',
      location: 'Amravati, Maharashtra',
      stat: '18 days',
      statLabel: 'loan approval vs. 90-day average',
    },
    {
      quote: 'The real change was accountability. Every bag of fertilizer distributed is tracked to a specific farmer with a digital receipt. Pilferage dropped from ₹2 lakh per season to nearly zero.',
      author: 'Meena Devi',
      role: 'Board Member',
      org: 'Mahila Kisan Producer Company',
      location: 'Varanasi, Uttar Pradesh',
      stat: '₹2L → ₹0',
      statLabel: 'seasonal pilferage reduction',
    },
  ];

  return (
    <section className="py-28 bg-slate-50" id="stories">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand)] mb-4">From the Field</p>
          <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-slate-900 leading-tight tracking-tight">
            These are not customer testimonials.<br />
            <span className="text-slate-400">They are field validations.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story, idx) => (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              {/* Metric */}
              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="text-3xl font-black text-[var(--brand)] tracking-tighter">{story.stat}</div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{story.statLabel}</div>
              </div>

              {/* Quote */}
              <p className="text-sm text-slate-600 leading-relaxed mb-8 flex-1">"{story.quote}"</p>

              {/* Attribution */}
              <div className="border-t border-slate-100 pt-5">
                <p className="font-bold text-slate-900 text-sm">{story.author}</p>
                <p className="text-xs text-slate-500">{story.role}, {story.org}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mt-1">{story.location}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
