import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface Tab {
    id: string;
    label: string;
    count?: number;
    icon?: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (tabId: string) => void;
    className?: string;
    variant?: 'line' | 'pills';
}

export const Tabs: React.FC<TabsProps> = ({
    tabs,
    activeTab,
    onChange,
    className,
    variant = 'line'
}) => {
    return (
        <div className={cn("flex space-x-1 overflow-x-auto scrollbar-hide", className)}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                            variant === 'line' ? (
                                isActive
                                    ? "border-b-2 border-green-600 text-green-700"
                                    : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            ) : (
                                isActive
                                    ? "bg-green-100 text-green-800 rounded-lg"
                                    : "text-gray-600 hover:bg-gray-100 rounded-lg"
                            )
                        )}
                        role="tab"
                        aria-selected={isActive}
                    >
                        {tab.icon && <span className={cn("shrink-0", isActive ? "text-green-600" : "text-gray-400")}>{tab.icon}</span>}
                        {tab.label}
                        {tab.count !== undefined && (
                            <span className={cn(
                                "ml-1.5 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
                                isActive
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-600"
                            )}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};
