import React from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast, ToastMessage } from '../../hooks/useToast';

const icons = {
    success: <CheckCircle2 size={18} className="text-emerald-500" />,
    error: <XCircle size={18} className="text-red-500" />,
    info: <Info size={18} className="text-blue-500" />,
    warning: <AlertTriangle size={18} className="text-amber-500" />
};

const bgColors = {
    success: 'bg-emerald-50 border-emerald-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-amber-50 border-amber-200'
};

export function ToastContainer() {
    const { toasts, dismiss } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
            {toasts.map(t => (
                <div
                    key={t.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg pointer-events-auto animate-in slide-in-from-right-8 fade-in duration-300 ${bgColors[t.variant]}`}
                >
                    <div className="shrink-0 mt-0.5">{icons[t.variant]}</div>
                    <div className="flex-1 text-sm font-medium text-slate-800 pr-4">
                        {t.message}
                    </div>
                    <button
                        onClick={() => dismiss(t.id)}
                        className="opacity-50 hover:opacity-100 transition-opacity p-1 -mr-2 -mt-1"
                    >
                        <X size={14} />
                    </button>
                </div>
            ))}
        </div>
    );
}
