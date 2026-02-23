import React, { useState } from 'react';
import { DashboardLayout } from './layout/DashboardLayout';
import PlatformAdminSidebar from './platformAdmin/PlatformAdminSidebar';
import PlatformDashboardContent from './platformAdmin/PlatformDashboardContent';
import FPODirectory from './platformAdmin/FPODirectory';
import SystemHealthDashboard from './platformAdmin/SystemHealthDashboard';
import FPOOnboardingWizard from './platformAdmin/FPOOnboardingWizard';
import SubscriptionManagement from './platformAdmin/SubscriptionManagement';
import SupportTickets from './platformAdmin/SupportTickets';
import KnowledgeBase from './platformAdmin/KnowledgeBase';
import PlatformSettings from './platformAdmin/PlatformSettings';
import { EmptyState } from './ui/EmptyState';
import { Building2 } from 'lucide-react';

interface PlatformAdminProps {
  onHome: () => void;
}

export default function PlatformAdmin({ onHome }: PlatformAdminProps) {
  const [activeSection, setActiveSection] = useState('dashboard');

  const headerProps = {
    title: "K2 Platform Admin",
    subtitle: "Master Dashboard",
    user: {
      name: "Super Admin",
      role: "Platform Administrator",
    }
  };

  // Placeholder components for the deferred sub-pages
  const PlaceholderView = ({ title }: { title: string }) => (
    <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm min-h-[60vh] flex items-center justify-center">
      <EmptyState
        icon={<Building2 size={32} />}
        title={title}
        description="This module is under development and will be available in the next release."
      />
    </div>
  );

  return (
    <DashboardLayout
      sidebarContent={<PlatformAdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />}
      headerProps={headerProps}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {activeSection === 'dashboard' && 'Platform Overview'}
            {activeSection === 'directory' && 'FPO Directory'}
            {activeSection === 'onboarding' && 'FPO Onboarding'}
            {activeSection === 'subscriptions' && 'Subscription Management'}
            {activeSection === 'health' && 'System Health'}
            {activeSection === 'support' && 'Support Tickets'}
            {activeSection === 'kb' && 'Knowledge Base'}
            {activeSection === 'settings' && 'Platform Settings'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {activeSection === 'dashboard' && 'High-level metrics and platform performance.'}
            {activeSection !== 'dashboard' && 'Manage platform operations and settings.'}
          </p>
        </div>

        <button
          onClick={onHome}
          className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          Exit Platform
        </button>
      </div>

      {activeSection === 'dashboard' && <PlatformDashboardContent setActiveSection={setActiveSection} />}
      {activeSection === 'directory' && <FPODirectory setActiveSection={setActiveSection} />}
      {activeSection === 'onboarding' && <FPOOnboardingWizard setActiveSection={setActiveSection} />}
      {activeSection === 'subscriptions' && <SubscriptionManagement />}
      {activeSection === 'health' && <SystemHealthDashboard />}
      {activeSection === 'support' && <SupportTickets />}
      {activeSection === 'kb' && <KnowledgeBase />}
      {activeSection === 'settings' && <PlatformSettings />}

    </DashboardLayout>
  );
}
