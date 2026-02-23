import React from 'react';
import { cn } from '@/lib/utils';

export const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn("animate-pulse bg-slate-200/50 rounded-md", className)} />
);

export const SkeletonText: React.FC<{ className?: string, lines?: number }> = ({ className, lines = 1 }) => (
    <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
            <SkeletonLoader
                key={i}
                className={cn("h-4 w-full", i === lines - 1 && lines > 1 ? "w-2/3" : "", className)}
            />
        ))}
    </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn("flex flex-col gap-4 p-5 rounded-xl border border-slate-100 bg-white", className)}>
        <div className="flex items-center gap-4">
            <SkeletonLoader className="w-12 h-12 rounded-full" />
            <SkeletonText lines={2} className="w-32" />
        </div>
        <SkeletonLoader className="h-24 w-full" />
    </div>
);
