import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

export default function ProblemSolution() {
  return (
    <section className="py-28 bg-white" id="mission">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Section Header — Editorial */}
        <div className="max-w-3xl mb-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand)] mb-4">The Problem</p>
          <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
            India has 7,000+ registered FPOs.<br />
            <span className="text-slate-400">Most operate in the dark.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Despite ₹6,865 crore in government allocation, the majority of farmer collectives lack basic digital infrastructure. They share data over WhatsApp, compile reports in Excel, and miss compliance deadlines — making them invisible to formal markets and institutional finance.
          </p>
        </div>

        {/* Two Column: Story + Solution */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left — The Reality */}
          <div>
            <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
              <img
                src="/images/fpo-meeting.png"
                alt="FPO board meeting in rural India"
                className="w-full h-72 object-cover"
              />
            </div>
            <div className="space-y-6">
              {[
                { stat: '72%', desc: 'of FPOs have no digital record of farmer transactions' },
                { stat: '₹2.3L', desc: 'average annual revenue — most stay below the poverty threshold for viability' },
                { stat: '45 days', desc: 'average delay in NABARD MIS quarterly submission' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="flex items-baseline gap-4 border-b border-slate-100 pb-5"
                >
                  <span className="text-3xl md:text-4xl font-black text-slate-900 shrink-0 tracking-tighter">{item.stat}</span>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — What We Do */}
          <div className="lg:pt-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4">What Krishi Kutumb Does</p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug tracking-tight mb-8">
              We make FPOs visible, verifiable, and investable.
            </h3>
            
            <div className="space-y-8">
              {[
                {
                  title: 'Structured Data from Day One',
                  desc: 'Every farmer, every crop, every transaction gets digitized into a structured, auditable format — replacing ad-hoc WhatsApp reporting.',
                },
                {
                  title: 'Automated Regulatory Compliance',
                  desc: 'SFAC quarterly reports, NABARD MIS filings, AGM records, and ROC submissions — auto-generated from operational data.',
                },
                {
                  title: 'Credit-Grade Intelligence',
                  desc: 'We generate FPO performance scores based on governance quality, financial health, farmer activity, and compliance track record — purpose-built for NBFC and bank underwriting.',
                },
                {
                  title: 'Zero Cost to Farmers',
                  desc: 'We never charge FPOs or their members. Our revenue comes from data intelligence services sold to CBBOs, lenders, and input manufacturers.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
