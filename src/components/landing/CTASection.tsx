import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onLogin: () => void;
}

export default function CTASection({ onLogin }: CTASectionProps) {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Full-bleed image background */}
      <div className="absolute inset-0">
        <img
          src="/images/produce-market.png"
          alt="Indian agricultural produce"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#111]/85 backdrop-blur-sm"></div>
      </div>

      <div className="container relative mx-auto px-6 md:px-12 lg:px-20 z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-6">Get Started</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Ready to build the future of <br /><span className="text-[var(--brand-muted)]">your FPO together?</span>
            </h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            Whether you are a CBBO managing a cluster of 50 FPOs or a single FPO CEO seeking to digitize — the platform is free for farmer organizations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onLogin}
              className="group inline-flex items-center justify-center gap-3 bg-white text-slate-900 font-bold py-4 px-8 rounded-lg text-base transition-all hover:bg-emerald-50 hover:shadow-xl hover:-translate-y-0.5 shadow-lg"
            >
              Explore the Platform
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="mailto:hello@krishikutumb.in"
              className="inline-flex items-center justify-center gap-3 border border-white/30 text-white font-semibold py-4 px-8 rounded-lg text-base transition-all hover:bg-white/10"
            >
              Contact Our Team
            </a>
          </div>
          <p className="text-xs text-slate-500 mt-8">No credit card required. No lock-in. Free for all FPOs.</p>
        </div>
      </div>
    </section>
  );
}
