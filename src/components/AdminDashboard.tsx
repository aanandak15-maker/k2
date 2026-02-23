import React, { useState } from 'react';
import { DashboardLayout } from './layout/DashboardLayout';
import AdminSidebar from './admin/AdminSidebar';
import AdminDashboardContent from './admin/AdminDashboardContent';
import AdminInputSalesContent from './admin/AdminInputSalesContent';
import AdminProcurementContent from './admin/AdminProcurementContent';
import AdminInventoryContent from './admin/AdminInventoryContent';
import AdminMembershipContent from './admin/AdminMembershipContent';
import AdminStaffContent from './admin/AdminStaffContent';
import AdminShareCapitalContent from './admin/AdminShareCapitalContent';
import AdminSupplierContent from './admin/AdminSupplierContent';
import AdminBuyerContent from './admin/AdminBuyerContent';
import AdminBillingContent from './admin/AdminBillingContent';
import AdminBankingContent from './admin/AdminBankingContent';
import AdminDocumentsContent from './admin/AdminDocumentsContent';
import AdminSettingsContent from './admin/AdminSettingsContent';

interface AdminDashboardProps {
  onHome: () => void;
}

export default function AdminDashboard({ onHome }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');

  const headerProps = {
    title: "Sikandrabad FPC Ltd",
    subtitle: "Operations Admin",
    user: {
      name: "Ramesh Gupta",
      role: "Operations Controller",
    }
  };

  return (
    <DashboardLayout
      sidebarContent={<AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />}
      headerProps={headerProps}
    >
      {activeSection === 'dashboard' && <AdminDashboardContent />}
      {activeSection === 'input-sales' && <AdminInputSalesContent />}
      {activeSection === 'suppliers' && <AdminSupplierContent />}
      {activeSection === 'procurement' && <AdminProcurementContent />}
      {activeSection === 'buyers' && <AdminBuyerContent />}
      {activeSection === 'inventory' && <AdminInventoryContent />}
      {activeSection === 'billing' && <AdminBillingContent />}
      {activeSection === 'banking' && <AdminBankingContent />}
      {activeSection === 'documents' && <AdminDocumentsContent />}
      {activeSection === 'membership' && <AdminMembershipContent />}
      {activeSection === 'share-capital' && <AdminShareCapitalContent />}
      {activeSection === 'staff' && <AdminStaffContent />}
      {activeSection === 'settings' && <AdminSettingsContent />}
    </DashboardLayout>
  );
}
