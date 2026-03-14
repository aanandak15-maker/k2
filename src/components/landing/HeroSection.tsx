import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, UserCheck, FileText, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onLogin: () => void;
}

export default function HeroSection({ onLogin }: HeroSectionProps) {
  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-slate-50 border-b border-slate-200">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.4]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 text-left">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column — Text & CTA */}
          <div className="max-w-2xl">
            {/* Institutional Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand)] bg-[var(--brand-wash)] border border-[var(--brand)]/10 rounded-full px-4 sm:px-5 py-2 sm:py-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse"></span>
                India's 10,000 FPO Scheme · Digital Partner
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-8"
            >
              Digitizing the core of <span className="text-[var(--brand)]">India's FPO ecosystem.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 font-medium"
            >
              Krishi Kutumb builds the digital intelligence layer that makes Farmer Producer Organizations visible, verifiable, and credit-worthy — serving over <strong className="text-slate-900 font-bold">450,000 farmers</strong> across <strong className="text-slate-900 font-bold">12 states.</strong>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={onLogin}
                className="group inline-flex items-center justify-center gap-3 bg-[var(--brand)] text-white w-full sm:w-auto font-bold py-4 px-8 rounded-lg text-base shadow-lg shadow-[var(--brand)]/20 transition-all hover:bg-emerald-700 hover:-translate-y-0.5"
              >
                Explore the Platform
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#platform"
                className="inline-flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 w-full sm:w-auto font-semibold py-4 px-8 rounded-lg text-base transition-all hover:bg-slate-50 hover:border-slate-300 shadow-sm"
              >
                View Capabilities
              </a>
            </motion.div>
          </div>

          {/* Right Column — CSS Built Data Cards Abstract Visual */}
          <div className="relative h-[400px] sm:h-[500px] w-full hidden md:block">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--brand)]/10 blur-[80px] rounded-full"></div>

            {/* Card 1: Farmer Profile (Top right, pushes back) */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: -20, rotate: 5 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute top-10 right-10 w-64 bg-white rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 p-5 z-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <UserCheck size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 uppercase">Verified Member</div>
                  <div className="text-[10px] text-slate-500">ID: KK-UP-8492</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-slate-100 rounded-full w-full"></div>
                <div className="h-2 bg-slate-100 rounded-full w-4/5"></div>
              </div>
            </motion.div>

            {/* Card 2: Transaction Receipt (Center, overlapping) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-32 left-10 lg:left-0 w-72 bg-white rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-200 p-6 z-20"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <FileText size={16} className="text-[var(--brand)]" />
                  Ledger Entry
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Settled</span>
              </div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs text-slate-500 font-medium">Input Procurement</span>
                <span className="text-lg font-black text-slate-900 tracking-tight">₹14,500</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs text-slate-500 font-medium">Urea & DAP</span>
                <span className="text-[10px] text-slate-400">Today, 09:41 AM</span>
              </div>
            </motion.div>

            {/* Card 3: Compliance Status (Bottom right) */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 50, rotate: -3 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -3 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute bottom-10 right-20 w-56 bg-white rounded-xl shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] border border-slate-100 p-5 z-30"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span className="text-xs font-bold text-slate-800">Compliance</span>
                </div>
              </div>
              <div className="text-sm font-bold text-slate-900 mb-2">SFAC Q3 Report</div>
              <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
                <CheckCircle2 size={12} />
                Auto-generated
              </div>
            </motion.div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
