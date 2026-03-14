import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Search, X, CheckCircle2, AlertCircle, Info, Package, Calendar, Globe2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '../../hooks/useToast';

interface HeaderProps {
  title: string;
  subtitle?: string;
  user?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  className?: string;
}

export function Header({ title, subtitle, user, className }: HeaderProps) {
  const { toast } = useToast();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSeasonOpen, setIsSeasonOpen] = useState(false);
  const [activeSeason, setActiveSeason] = useState('Kharif 2024');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  const seasonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (seasonRef.current && !seasonRef.current.contains(event.target as Node)) {
        setIsSeasonOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const seasons = ['Rabi 2023-24', 'Kharif 2024', 'Rabi 2024-25'];

  const handleSeasonChange = (season: string) => {
    setActiveSeason(season);
    setIsSeasonOpen(false);
    toast({ message: `Context switched to ${season} season.`, variant: 'success' });
  };

  const toggleLanguage = () => {
    const newLang = language === 'EN' ? 'HI' : 'EN';
    setLanguage(newLang);
    toast({
      message: newLang === 'HI' ? 'हिंदी भाषा चुनी गई (Translating interface...)' : 'English language selected.',
      variant: 'info'
    });
  };

  // Mock Notifications
  const notifications = [
    { id: 1, type: 'alert', title: 'Low Inventory Alert', desc: 'Urea stock below 50 bags at Main Godown.', time: '10m ago', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 2, type: 'success', title: 'Payment Received', desc: '₹45,000 received from buyer AgroCorp.', time: '1h ago', icon: CheckCircle2, color: 'text-[var(--brand)]', bg: 'bg-[var(--brand-wash)]' },
    { id: 3, type: 'info', title: 'New Scheme Application', desc: 'Ramesh Singh applied for PM-KISAN renewal.', time: '3h ago', icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 4, type: 'order', title: 'New Input Order', desc: 'Order #ORD-892 placed for 5 bags DAP.', time: '5h ago', icon: Package, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 5, type: 'alert', title: 'Weather Advisory', desc: 'Heavy rain expected in next 48 hours.', time: '1d ago', icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];
  return (
    <header className={cn("sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-sm transition-all", className)}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand)] text-white font-bold shadow-sm">
            K2
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold text-slate-900 leading-tight">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 ml-8">
          {/* Season Selector */}
          <div className="relative" ref={seasonRef}>
            <button
              onClick={() => setIsSeasonOpen(!isSeasonOpen)}
              className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              title="Change Financial/Agricultural Season Context"
            >
              <Calendar className="h-4 w-4 text-[var(--brand)]" />
              <span>{activeSeason}</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {isSeasonOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 mb-1">Select Season</div>
                {seasons.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSeasonChange(s)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeSeason === s ? 'bg-[var(--brand-pale)] text-[var(--brand)] font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    {s}
                    {activeSeason === s && <CheckCircle2 className="inline ml-2 h-3 w-3 text-[var(--brand)]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Global Search */}
          <div className="flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 w-64 hover:border-slate-300 transition-colors cursor-text">
            <Search className="h-4 w-4 text-slate-400" />
            <span>Search...</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">

        {/* Notification Center */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`relative rounded-full p-2 transition-colors ${isNotificationsOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
          </button>

          {isNotificationsOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsNotificationsOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 origin-top-right">
                <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-bold text-slate-800">Notifications</h3>
                  <button onClick={() => setIsNotificationsOpen(false)} className="text-slate-400 hover:text-slate-600 rounded-lg p-1 hover:bg-slate-100">
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex gap-4 p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className={`mt-0.5 h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
                        <notif.icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-0.5">
                          <p className="text-sm font-semibold text-slate-800 truncate pr-2 group-hover:text-[var(--brand)] transition-colors">{notif.title}</p>
                          <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">{notif.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{notif.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                  <button onClick={() => { setIsNotificationsOpen(false); toast({ message: 'Marking all as read...', variant: 'success' }); }} className="text-xs font-semibold text-[var(--brand)] hover:opacity-80">
                    Mark all as read
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200 mx-1" />

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-slate-100 transition-colors text-slate-600 font-medium text-sm"
          title="Change UI Language"
        >
          <Globe2 className="h-4 w-4 text-[var(--brand)]" />
          {language}
        </button>

        <div className="h-8 w-px bg-slate-200 mx-1" />

        <button onClick={() => toast({ message: 'Profile settings coming in v2', variant: 'info' })} className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-pale)] text-[var(--brand)] font-medium text-sm border border-[var(--brand-muted)]">
            {user?.name.charAt(0) || 'U'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-slate-700 leading-none">{user?.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{user?.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
