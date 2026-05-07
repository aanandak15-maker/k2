import React, { useEffect, useRef } from 'react';
import { X, LucideIcon } from 'lucide-react';
import type { UserRole } from './MobileAppBar';

export interface DrawerSection {
  label: string;
  items: DrawerItem[];
}

export interface DrawerItem {
  id: string;
  icon: LucideIcon;
  label: string;
  badge?: number | string;
  description?: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  activeItem?: string;
  sections: DrawerSection[];
  role: UserRole;
  title?: string;
}

export function MobileDrawer({
  isOpen,
  onClose,
  onSelect,
  activeItem,
  sections,
  role,
  title = 'More',
}: MobileDrawerProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="drawer-overlay"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="drawer-sheet" ref={sheetRef} data-role={role}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 text-base">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 active:bg-slate-200 transition-colors"
          >
            <X size={16} className="text-slate-600" />
          </button>
        </div>

        {/* Sections */}
        <div className="px-4 py-3 space-y-5">
          {sections.map((section) => (
            <div key={section.label}>
              {section.label && (
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                  {section.label}
                </p>
              )}

              {/* Grid of items */}
              <div className="grid grid-cols-3 gap-2">
                {section.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => { onSelect(item.id); onClose(); }}
                      className="relative flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl transition-all duration-200 active:scale-95"
                      style={{
                        background: isActive ? 'var(--role-primary-pale)' : 'white',
                        border: isActive ? '1.5px solid var(--role-primary-muted)' : '1.5px solid #f1f5f9',
                        boxShadow: isActive ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
                      }}
                    >
                      {/* Badge */}
                      {item.badge !== undefined && (
                        <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                          {item.badge}
                        </span>
                      )}

                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: isActive ? 'var(--role-primary)' : 'var(--role-primary-wash)',
                        }}
                      >
                        <Icon
                          size={18}
                          style={{ color: isActive ? 'white' : 'var(--role-primary)' }}
                          strokeWidth={2}
                        />
                      </div>

                      <span
                        className="text-[11px] font-semibold text-center leading-tight"
                        style={{ color: isActive ? 'var(--role-primary)' : '#374151' }}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom padding for safe area */}
        <div className="h-safe-area-bottom" style={{ height: 'env(safe-area-inset-bottom, 16px)' }} />
      </div>
    </>
  );
}
