import React from 'react';

interface BottomNavProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
    items: { id: string; icon: React.ElementType; label: string }[];
}

export function BottomNav({ activeTab, onTabChange, items }: BottomNavProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
            {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`flex flex-col items-center justify-center w-full py-1 rounded-lg transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                    >
                        <div className={`p-1.5 rounded-full mb-0.5 transition-colors ${isActive ? 'bg-emerald-50' : ''}`}>
                            <Icon size={20} className={isActive ? 'fill-emerald-600/20' : ''} />
                        </div>
                        <span className={`text-[10px] font-medium leading-none ${isActive ? 'font-semibold' : ''}`}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
