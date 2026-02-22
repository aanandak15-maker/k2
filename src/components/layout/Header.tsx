import React from 'react';
import { Bell, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  user?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  className?: string;
}

export function Header({ title, subtitle, user, className }: HeaderProps) {
  return (
    <header className={cn("sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-sm transition-all", className)}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold shadow-sm">
            K2
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold text-slate-900 leading-tight">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
          </div>
        </div>
        <div className="hidden md:flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 w-64 ml-8 hover:border-slate-300 transition-colors cursor-text">
          <Search className="h-4 w-4 text-slate-400" />
          <span>Search...</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-1" />

        <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm border border-emerald-200">
            {user?.name.charAt(0) || 'U'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-slate-700 leading-none">{user?.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{user?.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
