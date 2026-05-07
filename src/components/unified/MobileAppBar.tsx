import React, { useState } from 'react';
import { ArrowLeft, Bell, Search, User, ChevronDown, LogOut } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export type UserRole = 'farmer' | 'moderator' | 'ceo' | 'admin' | 'platform';

interface MobileAppBarProps {
  title: string;
  subtitle?: string;
  role: UserRole;
  userName?: string;
  showBack?: boolean;
  onBack?: () => void;
  onLogout?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

const roleLabels: Record<UserRole, string> = {
  farmer: 'Farmer',
  moderator: 'Moderator',
  ceo: 'CEO',
  admin: 'FPO Admin',
  platform: 'K2 Admin',
};

export function MobileAppBar({
  title,
  subtitle,
  role,
  userName,
  showBack = false,
  onBack,
  onLogout,
  rightAction,
  transparent = false,
}: MobileAppBarProps) {
  const { toast } = useToast();
  const [showMenu, setShowMenu] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'Low inventory: Urea below threshold', time: '10m', dot: 'bg-red-500' },
    { id: 2, text: '₹45,000 received from AgroCorp', time: '1h', dot: 'bg-emerald-500' },
    { id: 3, text: 'New scheme application pending', time: '3h', dot: 'bg-blue-500' },
  ];

  return (
    <>
      <div
        className="mobile-app-bar role-gradient"
        data-role={role}
        style={{ boxShadow: transparent ? 'none' : '0 2px 8px rgba(0,0,0,0.15)' }}
      >
        <div className="flex items-center justify-between w-full px-4 h-14">
          {/* Left */}
          <div className="flex items-center gap-3">
            {showBack ? (
              <button
                onClick={onBack}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20 transition-colors"
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
            ) : (
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">K2</span>
              </div>
            )}

            <div className="min-w-0">
              <h1 className="text-white font-bold text-[15px] leading-tight truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-white/70 text-[11px] font-medium leading-none mt-0.5 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1">
            {rightAction || (
              <>
                {/* Notification bell */}
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20 relative"
                >
                  <Bell size={18} className="text-white" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full border border-white/30" />
                </button>

                {/* Avatar */}
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 border border-white/30 ml-1"
                >
                  <span className="text-white font-bold text-sm">
                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Notification dropdown */}
      {notifOpen && (
        <>
          <div
            className="fixed inset-0 z-[150]"
            onClick={() => setNotifOpen(false)}
          />
          <div className="fixed top-14 right-4 z-[160] w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2"
            style={{ maxWidth: 'calc(100vw - 32px)' }}>
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm">Notifications</span>
              <button
                onClick={() => { setNotifOpen(false); toast({ message: 'All marked read', variant: 'success' }); }}
                className="text-xs text-[var(--role-primary)] font-semibold"
              >
                Mark all read
              </button>
            </div>
            <div>
              {notifications.map(n => (
                <div
                  key={n.id}
                  className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer"
                  onClick={() => setNotifOpen(false)}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${n.dot}`} />
                  <p className="text-sm text-slate-700 flex-1">{n.text}</p>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* User menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-[150]"
            onClick={() => setShowMenu(false)}
          />
          <div className="fixed top-14 right-4 z-[160] w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="font-semibold text-slate-800 text-sm">{userName || 'User'}</p>
              <p className="text-xs text-slate-400 mt-0.5">{roleLabels[role]}</p>
            </div>
            <button
              onClick={() => { setShowMenu(false); onLogout?.(); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
            >
              <User size={16} />
              Switch Role
            </button>
          </div>
        </>
      )}
    </>
  );
}
