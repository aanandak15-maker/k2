import React from 'react';
import { SidebarItem } from '../layout/Sidebar';
import {
  LayoutDashboard,
  Users,
  Factory,
  Banknote,
  TrendingUp,
  ShieldCheck,
  FileText
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
        <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-100">
          <div className="text-3xl font-bold text-emerald-700 tracking-tight">82</div>
          <div className="text-xs text-emerald-800 font-semibold uppercase tracking-wide mt-1">FPO Credit Score</div>
          <div className="h-1.5 w-full bg-emerald-200 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: '82%' }}></div>
          </div>
          <div className="text-xs text-emerald-600 mt-2 font-medium">+3 pts this month</div>
        </div>
      </div>
    </div>
  );
}
