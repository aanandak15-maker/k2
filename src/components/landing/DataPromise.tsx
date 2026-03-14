import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Download, Trash2, Eye, Lock, FileCheck } from 'lucide-react';

export default function DataPromise() {
  const pillars = [
    { icon: Eye, title: 'Aggregate-Only Visibility', desc: 'Platform operators see aggregate metrics only. Individual farmer names, phone numbers, and personal details are architecturally hidden from non-FPO users.' },
    { icon: Shield, title: 'FPO Data Sovereignty', desc: 'All data entered by an FPO belongs exclusively to that FPO. Krishi Kutumb holds zero ownership rights and cannot access tenant data without explicit authorization.' },
    { icon: Download, title: 'Export Without Restriction', desc: 'FPOs can download all farmer, crop, transaction, and financial data in CSV/Excel format at any time. No lock-in periods, no exit fees.' },
    { icon: Trash2, title: 'Right to Deletion', desc: 'If an FPO discontinues the service, all associated data is permanently and irrecoverably purged within 30 days of termination.' },
    { icon: Lock, title: '256-bit Encryption Standard', desc: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Tenant databases are logically isolated with row-level security.' },
    { icon: FileCheck, title: 'Mutual Data Agreement', desc: 'Every FPO signs a bilateral data governance agreement — not a one-sided TOS. Both parties are contractually bound to the same data handling standards.' },
  ];

  return (
    <section className="py-28 bg-[#111] text-white relative" id="trust">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* Left — Statement */}
          <div className="lg:sticky lg:top-32">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4">Data Governance</p>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-white leading-tight tracking-tight mb-6">
              Your data is yours.<br />
              <span className="text-slate-500">That is not a slogan.</span>
            </h2>
            <p className="text-base text-slate-400 leading-relaxed mb-8">
              In rural India, trust is the operating system. FPO leaders don't fear encryption algorithms — they fear losing control. Our governance framework is designed to eliminate that fear with contractual, architectural, and operational guarantees.
            </p>
            <blockquote className="border-l-2 border-emerald-500 pl-6 text-slate-300 text-base italic leading-relaxed">
              "Think of us like Tally for farm management. Does your accountant worry about Tally reading their books? We're a tool you use — not a company that owns your data."
            </blockquote>
          </div>

          {/* Right — Pillars */}
          <div className="space-y-1">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="flex items-start gap-5 p-6 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500/20 transition-colors">
                  <pillar.icon size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1.5">{pillar.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
