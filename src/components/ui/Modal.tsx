import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'slide-over';
    maxWidth?: string; // Kept for backwards compatibility
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    maxWidth
}) => {
    const [isRendered, setIsRendered] = useState(isOpen);

    useEffect(() => {
        if (isOpen) setIsRendered(true);
        else {
            const timer = setTimeout(() => setIsRendered(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isRendered) return null;

    const isSlideOver = size === 'slide-over';

    const sizeClasses = maxWidth ? maxWidth : {
        'sm': 'max-w-md',
        'md': 'max-w-lg',
        'lg': 'max-w-2xl',
        'xl': 'max-w-4xl',
        'slide-over': 'max-w-md h-full absolute right-0 top-0 bottom-0 rounded-none rounded-l-2xl'
    }[size];

    return (
        <div className={`fixed inset-0 z-[100] flex ${isSlideOver ? 'justify-end' : 'items-center justify-center'} p-4 sm:p-6`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Modal Dialog */}
            <div
                className={`relative bg-white w-full rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${sizeClasses} ${isOpen
                        ? (isSlideOver ? 'translate-x-0' : 'opacity-100 scale-100')
                        : (isSlideOver ? 'translate-x-full' : 'opacity-0 scale-95')
                    }`}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1 bg-white max-h-[calc(100vh-140px)]">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 shrink-0 flex justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};
