import React from 'react';
import { LucideIcon, MoreHorizontal } from 'lucide-react';
import type { UserRole } from './MobileAppBar';

export interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  badge?: number | string;
}

interface MobileBottomNavProps {
  items: NavItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  role: UserRole;
  hasMore?: boolean;
  onMoreOpen?: () => void;
  moreActive?: boolean;
}

export function MobileBottomNav({
  items,
  activeTab,
  onTabChange,
  role,
  hasMore = false,
  onMoreOpen,
  moreActive = false,
}: MobileBottomNavProps) {
  return (
    <div className="mobile-bottom-nav" data-role={role}>
      {items.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className="flex flex-col items-center justify-center flex-1 gap-0.5 py-2 px-1 relative min-h-[44px] transition-all duration-200"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {/* Active indicator pill */}
            {isActive && (
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full"
                style={{ background: 'var(--role-primary)' }}
              />
            )}

            {/* Icon with badge */}
            <div className="relative">
              <div
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
                style={isActive ? {
                  background: 'var(--role-primary-pale)',
                } : {}}
              >
                <Icon
                  size={20}
                  style={isActive ? { color: 'var(--role-primary)' } : { color: '#6b7280' }}
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
              </div>

              {item.badge !== undefined && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 border border-white">
                  {item.badge}
                </span>
              )}
            </div>

            <span
              className="text-[10px] font-medium leading-none"
              style={isActive ? { color: 'var(--role-primary)', fontWeight: 700 } : { color: '#9ca3af' }}
            >
              {item.label}
            </span>
          </button>
        );
      })}

      {/* More tab */}
      {hasMore && (
        <button
          onClick={onMoreOpen}
          className="flex flex-col items-center justify-center flex-1 gap-0.5 py-2 px-1 relative min-h-[44px]"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {moreActive && (
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full"
              style={{ background: 'var(--role-primary)' }}
            />
          )}
          <div
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
            style={moreActive ? { background: 'var(--role-primary-pale)' } : {}}
          >
            <MoreHorizontal
              size={20}
              style={moreActive ? { color: 'var(--role-primary)' } : { color: '#6b7280' }}
              strokeWidth={moreActive ? 2.5 : 1.75}
            />
          </div>
          <span
            className="text-[10px] font-medium leading-none"
            style={moreActive ? { color: 'var(--role-primary)', fontWeight: 700 } : { color: '#9ca3af' }}
          >
            More
          </span>
        </button>
      )}
    </div>
  );
}
