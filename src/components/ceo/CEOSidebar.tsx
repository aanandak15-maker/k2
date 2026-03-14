import React from 'react';
import { SidebarItem } from '../layout/Sidebar';
import {
  LayoutDashboard,
  Users,
  Factory,
  Banknote,
  TrendingUp,
  ShieldCheck,
  FileText,
  LineChart
} from 'lucide-react';

interface CEOSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function CEOSidebar({ activeSection, setActiveSection }: CEOSidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'farmers', icon: Users, label: 'Farmers' },
    { id: 'operations', icon: Factory, label: 'Operations' },
    { id: 'finance', icon: Banknote, label: 'Finance' },
    { id: 'mandi', icon: LineChart, label: 'Market Prices' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
    { id: 'compliance', icon: ShieldCheck, label: 'Compliance' },
    { id: 'reports', icon: FileText, label: 'Reports' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeSection === item.id}
            onClick={() => setActiveSection(item.id)}
          />
        ))}
      </div>
      <div className="mt-auto pt-6">
        <div className="bg-[var(--brand-wash)] rounded-xl p-4 text-center border border-[var(--brand-pale)]">
          <div className="text-3xl font-bold text-[var(--brand)] tracking-tight">82</div>
          <div className="text-xs text-[var(--brand)] font-semibold uppercase tracking-wide mt-1">FPO Credit Score</div>
          <div className="h-1.5 w-full bg-[var(--brand-muted)] rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-[var(--brand)] rounded-full" style={{ width: '82%' }}></div>
          </div>
          <div className="text-xs text-[var(--brand)] mt-2 font-medium opacity-80">+3 pts this month</div>
        </div>
      </div>
    </div>
  );
}
