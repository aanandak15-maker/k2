import React, { useState } from 'react';
import CEOSidebar from './ceo/CEOSidebar';
import CEODashboardContent from './ceo/CEODashboardContent';
import CEOFarmersContent from './ceo/CEOFarmersContent';
import CEOOperationsContent from './ceo/CEOOperationsContent';
import CEOFinanceContent from './ceo/CEOFinanceContent';
import CEOMandiPricesContent from './ceo/CEOMandiPricesContent';
import CEOAnalyticsContent from './ceo/CEOAnalyticsContent';
import CEOComplianceContent from './ceo/CEOComplianceContent';
import CEOReportsContent from './ceo/CEOReportsContent';
import { DashboardLayout } from './layout/DashboardLayout';

interface CEODashboardProps {
  onHome: () => void;
}

export default function CEODashboard({ onHome }: CEODashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');

  const headerProps = {
    title: "Sikandrabad FPC Ltd",
    subtitle: "CEO Command Centre",
    user: {
      name: "Ramesh Kumar",
      role: "CEO",
    }
  };

  return (
    <DashboardLayout
      sidebarContent={<CEOSidebar activeSection={activeSection} setActiveSection={setActiveSection} />}
      headerProps={headerProps}
    >
      {activeSection === 'dashboard' && <CEODashboardContent setActiveSection={setActiveSection} />}
      {activeSection === 'farmers' && <CEOFarmersContent />}
      {activeSection === 'operations' && <CEOOperationsContent />}
      {activeSection === 'finance' && <CEOFinanceContent />}
      {activeSection === 'mandi' && <CEOMandiPricesContent />}
      {activeSection === 'analytics' && <CEOAnalyticsContent />}
      {activeSection === 'compliance' && <CEOComplianceContent />}
      {activeSection === 'reports' && <CEOReportsContent />}
    </DashboardLayout>
  );
}
