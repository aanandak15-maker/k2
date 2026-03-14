import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: number | string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick, badge }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between gap-3 px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-[var(--brand)] text-white"
          : "text-[#1A1A1A] hover:bg-slate-50 hover:text-slate-900 rounded-lg"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn("h-4 w-4 shrink-0", active ? "text-white" : "text-slate-500")} />
        <span className="truncate">{label}</span>
      </div>
      {badge !== undefined && (
        <span className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
          active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
        )}>
          {badge}
        </span>
      )}
    </button>
  );
};

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

export function Sidebar({ children, className }: SidebarProps) {
  return (
    <aside className={cn("w-64 border-r border-slate-200 bg-white px-4 py-6 flex flex-col h-screen sticky top-0", className)}>
      {children}
    </aside>
  );
}
