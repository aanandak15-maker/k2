import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
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
    <div className={cn("bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200", className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</span>
        {pulseColor && (
          <span className={cn("flex h-2.5 w-2.5 rounded-full", {
            'bg-emerald-500': pulseColor === 'green',
            'bg-amber-500': pulseColor === 'yellow',
            'bg-red-500': pulseColor === 'red',
          })} />
        )}
        {Icon && <Icon className="h-4 w-4 text-slate-400" />}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900 tracking-tight">{value}</span>
      </div>
      {(subValue || trend) && (
        <div className="mt-2 flex items-center text-xs">
          {trend && (
            <span className={cn("font-medium mr-2", {
              'text-emerald-600': trendDirection === 'up',
              'text-red-600': trendDirection === 'down',
              'text-slate-600': trendDirection === 'neutral',
            })}>
              {trend}
            </span>
          )}
          {subValue && <span className="text-slate-500">{subValue}</span>}
        </div>
      )}
    </div>
  );
}
