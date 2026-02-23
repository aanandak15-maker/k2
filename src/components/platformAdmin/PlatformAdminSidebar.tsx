import React from 'react';
import { SidebarItem } from '../layout/Sidebar';
import {
    LayoutDashboard,
    Building2,
    UserPlus,
    CreditCard,
    Activity,
    Ticket,
    BookOpen,
    Settings
} from 'lucide-react';

interface PlatformAdminSidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

export default function PlatformAdminSidebar({ activeSection, setActiveSection }: PlatformAdminSidebarProps) {
    return (
        <div className="flex flex-col h-full">
            <div className="mb-6 px-3">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Platform Admin</h2>
                <div className="space-y-1">
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Dashboard"
                        active={activeSection === 'dashboard'}
                        onClick={() => setActiveSection('dashboard')}
                    />
                    <SidebarItem
                        icon={Building2}
                        label="FPO Directory"
                        active={activeSection === 'directory'}
                        onClick={() => setActiveSection('directory')}
                    />
                    <SidebarItem
                        icon={UserPlus}
                        label="Onboarding"
                        active={activeSection === 'onboarding'}
                        onClick={() => setActiveSection('onboarding')}
                    />
                    <SidebarItem
                        icon={CreditCard}
                        label="Subscriptions"
                        active={activeSection === 'subscriptions'}
                        onClick={() => setActiveSection('subscriptions')}
                    />
                </div>
            </div>

            <div className="mb-6 px-3">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Operations</h2>
                <div className="space-y-1">
                    <SidebarItem
                        icon={Activity}
                        label="System Health"
                        active={activeSection === 'health'}
                        onClick={() => setActiveSection('health')}
                        badge="99.9%"
                    />
                    <SidebarItem
                        icon={Ticket}
                        label="Support Tickets"
                        active={activeSection === 'support'}
                        onClick={() => setActiveSection('support')}
                        badge={17}
                    />
                    <SidebarItem
                        icon={BookOpen}
                        label="Knowledge Base"
                        active={activeSection === 'kb'}
                        onClick={() => setActiveSection('kb')}
                    />
                </div>
            </div>

            <div className="mt-auto px-3">
                <div className="space-y-1">
                    <SidebarItem
                        icon={Settings}
                        label="Platform Settings"
                        active={activeSection === 'settings'}
                        onClick={() => setActiveSection('settings')}
                    />
                </div>
            </div>
        </div>
    );
}
