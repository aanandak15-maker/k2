import React, { useState } from 'react';
import { MobileAppBar } from '../MobileAppBar';
import { MobileBottomNav, NavItem } from '../MobileBottomNav';
import { MobileDrawer, DrawerSection } from '../MobileDrawer';
import { MobilePageWrapper } from '../MobilePageWrapper';

// Platform Admin Content Screens
import PlatformDashboardContent from '../../platformAdmin/PlatformDashboardContent';
import FPODirectory from '../../platformAdmin/FPODirectory';
import FPOOnboardingWizard from '../../platformAdmin/FPOOnboardingWizard';
import SubscriptionManagement from '../../platformAdmin/SubscriptionManagement';
import SystemHealthDashboard from '../../platformAdmin/SystemHealthDashboard';
import AuditLogViewer from '../../platformAdmin/AuditLogViewer';
import SupportTickets from '../../platformAdmin/SupportTickets';
import KnowledgeBase from '../../platformAdmin/KnowledgeBase';
import PlatformSettings from '../../platformAdmin/PlatformSettings';

import {
  LayoutDashboard, Building2, Ticket,
  UserPlus, CreditCard, Activity, ShieldCheck, BookOpen, Settings
} from 'lucide-react';

interface PlatformMobileShellProps {
  onLogout: () => void;
  userName?: string;
}

const primaryTabs: NavItem[] = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
  { id: 'directory', icon: Building2, label: 'FPOs' },
  { id: 'support', icon: Ticket, label: 'Support', badge: 17 },
];

const drawerSections: DrawerSection[] = [
  {
    label: 'Management',
    items: [
      { id: 'onboarding', icon: UserPlus, label: 'Onboarding' },
      { id: 'subscriptions', icon: CreditCard, label: 'Subscriptions' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { id: 'health', icon: Activity, label: 'System Health', badge: '✓' },
      { id: 'audit', icon: ShieldCheck, label: 'Audit Logs' },
      { id: 'kb', icon: BookOpen, label: 'Knowledge Base' },
      { id: 'settings', icon: Settings, label: 'Settings' },
    ],
  },
];

const drawerIds = drawerSections.flatMap(s => s.items.map(i => i.id));

const sectionTitles: Record<string, string> = {
  dashboard: 'Platform Overview',
  directory: 'FPO Directory',
  support: 'Support Tickets',
  onboarding: 'FPO Onboarding',
  subscriptions: 'Subscriptions',
  health: 'System Health',
  audit: 'Audit Logs',
  kb: 'Knowledge Base',
  settings: 'Platform Settings',
};

export default function PlatformMobileShell({ onLogout, userName = 'Super Admin' }: PlatformMobileShellProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMoreActive = drawerIds.includes(activeSection);

  return (
    <div className="mobile-frame" data-role="platform">
      <MobileAppBar
        title="K2 Platform"
        subtitle={sectionTitles[activeSection] || 'Admin'}
        role="platform"
        userName={userName}
        onLogout={onLogout}
      />

      <MobilePageWrapper noPadding>
        <div className="mobile-shell px-4 pt-2 pb-2">
          {activeSection === 'dashboard' && <PlatformDashboardContent setActiveSection={setActiveSection} />}
          {activeSection === 'directory' && <FPODirectory setActiveSection={setActiveSection} />}
          {activeSection === 'onboarding' && <FPOOnboardingWizard setActiveSection={setActiveSection} />}
          {activeSection === 'subscriptions' && <SubscriptionManagement />}
          {activeSection === 'health' && <SystemHealthDashboard />}
          {activeSection === 'audit' && <AuditLogViewer />}
          {activeSection === 'support' && <SupportTickets />}
          {activeSection === 'kb' && <KnowledgeBase />}
          {activeSection === 'settings' && <PlatformSettings />}
        </div>
      </MobilePageWrapper>

      <MobileBottomNav
        items={primaryTabs}
        activeTab={isMoreActive ? '__more__' : activeSection}
        onTabChange={setActiveSection}
        role="platform"
        hasMore
        onMoreOpen={() => setDrawerOpen(true)}
        moreActive={isMoreActive}
      />

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSelect={setActiveSection}
        activeItem={activeSection}
        sections={drawerSections}
        role="platform"
        title="More Sections"
      />
    </div>
  );
}
