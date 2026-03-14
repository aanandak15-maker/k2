import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-slate-400 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand)] flex items-center justify-center text-white font-bold text-sm">K</div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-tight leading-none">Krishi Kutumb</span>
                <span className="text-[9px] uppercase tracking-[0.1em] text-slate-600 leading-none mt-0.5">FPO Intelligence</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 mb-6">
              The digital infrastructure layer for India's Farmer Producer Organizations. Built with field-level understanding, institutional-grade reliability, and absolute data sovereignty.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-[0.15em]">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">CEO Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Admin Operations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Field Moderator App</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CBBO Monitoring Suite</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-[0.15em]">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Data Governance Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SFAC Reporting Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">NABARD MIS Format</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FPO Grading Framework</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Knowledge Base</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-[0.15em]">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-emerald-500 shrink-0 mt-1" />
                <span className="leading-relaxed">Krishi Bhavan Tech Park,<br />Sector 4, Noida, UP 201301</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-emerald-500 shrink-0" />
                <a href="tel:+9118001234567" className="hover:text-white transition-colors">1800-123-4567</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-emerald-500 shrink-0" />
                <a href="mailto:hello@krishikutumb.in" className="hover:text-white transition-colors">hello@krishikutumb.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/50 text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600">
          <p>© {year} Krishi Kutumb Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Data Agreement</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
