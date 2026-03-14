import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Wheat, FileText, Banknote, ShieldCheck } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function FeaturesGrid() {
  const features = [
    {
      icon: LayoutDashboard,
      title: 'Role-Based Command Centres',
      desc: 'Distinct interfaces for CEOs (strategic oversight), Admins (operations), Moderators (field data), and Platform operators (multi-tenant governance).',
    },
    {
      icon: Users,
      title: 'Farmer Lifecycle Pipeline',
      desc: 'Track every member from registration through KYC, seasonal activity, input procurement, output sales, and financial settlement.',
    },
    {
      icon: Wheat,
      title: 'Supply Chain Ledgers',
      desc: 'Digitize the full input-to-output chain: demand aggregation, purchase orders, warehouse receipts, quality grading, and buyer settlement.',
    },
    {
      icon: FileText,
      title: 'Automated Compliance Engine',
      desc: 'One-click generation of SFAC quarterly reports, NABARD MIS, AGM agenda, ROC filings, and statutory audit data — formatted to spec.',
    },
    {
      icon: Banknote,
      title: 'Credit Scoring Framework',
      desc: 'Composite FPO health scores computed from governance (25%), financial activity (25%), compliance (25%), and farmer engagement (25%).',
    },
    {
      icon: ShieldCheck,
      title: 'Government Scheme Linkage',
      desc: 'Real-time tracking of PM-KISAN, Soil Health Card, Crop Insurance, KCC, and grant applications across the entire farmer base.',
    },
  ];

  return (
    <section className="py-28 bg-slate-50" id="platform">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand)] mb-4">Platform Architecture</p>
          <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
            A single operating system for the entire FPO ecosystem.
          </h2>
          <p className="text-base text-slate-500 leading-relaxed">
            Six tightly integrated modules that together digitize every operation an FPO performs — from farmer onboarding to regulatory filing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, idx) => (
            <motion.div
              initial="hidden"
              animate="visible"
              custom={idx}
              variants={fadeUp}
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 group hover:shadow-md hover:border-slate-300 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--brand-wash)] text-[var(--brand)] flex items-center justify-center mb-5 transition-transform group-hover:scale-110">
                <feat.icon size={22} strokeWidth={1.8} />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2 tracking-tight">{feat.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
