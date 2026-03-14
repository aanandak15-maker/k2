import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onLogin: () => void;
}

export default function Navbar({ onLogin }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Mission', href: '#mission' },
    { label: 'Platform', href: '#platform' },
    { label: 'Impact', href: '#impact' },
    { label: 'Data Governance', href: '#trust' },
    { label: 'Stories', href: '#stories' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-[0_1px_0_0_rgba(0,0,0,0.06)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm transition-all bg-[var(--brand)] text-white">
            K
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight leading-none text-slate-900">
              Krishi Kutumb
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] leading-none mt-0.5 text-slate-500">
              FPO Intelligence
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-semibold transition-colors tracking-wide text-slate-600 hover:text-[var(--brand)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onLogin}
            className="text-[13px] font-semibold px-4 py-2 rounded-lg transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            Sign In
          </button>
          <button
            onClick={onLogin}
            className="text-[13px] font-bold px-5 py-2.5 rounded-lg transition-all shadow-sm bg-slate-900 text-white hover:bg-slate-800"
          >
            Access Platform
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen
            ? <X size={24} className="text-slate-800" />
            : <Menu size={24} className={isScrolled ? 'text-slate-800' : 'text-white'} />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-700 font-semibold text-base py-3 border-b border-slate-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={() => { onLogin(); setMobileMenuOpen(false); }}
                  className="w-full py-3 font-bold text-white bg-[var(--brand)] rounded-lg"
                >
                  Access Platform
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
