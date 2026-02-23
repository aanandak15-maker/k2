import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral' | 'warning';
  icon?: LucideIcon;
  className?: string;
  pulseColor?: 'green' | 'yellow' | 'red';
}

export function StatCard({
  title,
  value,
  subValue,
  trend,
  trendDirection = 'neutral',
  icon: Icon,
  className,
  pulseColor,
}: StatCardProps) {
  return (
    <div className={cn("bg-white rounded-[12px] border border-slate-200/70 p-5 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between h-full", className)}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider leading-tight pr-2">{title}</span>
        <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-100 rounded-md shrink-0">
          {pulseColor && (
            <span className="relative flex h-2 w-2">
              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-40", {
                'bg-emerald-500': pulseColor === 'green',
                'bg-amber-500': pulseColor === 'yellow',
                'bg-red-500': pulseColor === 'red',
              })}></span>
              <span className={cn("relative inline-flex rounded-full h-2 w-2", {
                'bg-emerald-500': pulseColor === 'green',
                'bg-amber-500': pulseColor === 'yellow',
                'bg-red-500': pulseColor === 'red',
              })}></span>
            </span>
          )}
          {Icon && <Icon className="h-4 w-4 text-slate-400" strokeWidth={2} />}
        </div>
      </div>

      <div>
        <div className="flex items-center flex-wrap gap-2.5 mb-1.5">
          <div className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-none">
            {value}
          </div>
          {trend && (
            <div className={cn("text-[11px] font-bold px-2 py-0.5 rounded-md inline-flex items-center h-fit", {
              'bg-emerald-50 text-emerald-700': trendDirection === 'up',
              'bg-red-50 text-red-700': trendDirection === 'down',
              'bg-amber-50 text-amber-700': trendDirection === 'warning',
              'bg-slate-100 text-slate-600': trendDirection === 'neutral',
            })}>
              {trend}
            </div>
          )}
        </div>

        {subValue && (
          <div className="text-[12px] text-slate-400 font-medium leading-snug">
            {subValue}
          </div>
        )}
      </div>
    </div>
  );
}
