import React, { useState } from 'react';
import { ComplianceOverview } from '../compliance/ComplianceOverview';
import { ComplianceCalendar } from '../compliance/ComplianceCalendar';
import { AuditDashboard } from '../compliance/AuditDashboard';
import { SchemeTracker } from '../compliance/SchemeTracker';
import { GovernanceModule } from '../compliance/GovernanceModule';
import { DocumentVault } from '../compliance/DocumentVault';
import { ComplianceTaskDetail } from '../compliance/ComplianceTaskDetail';
import { AutomationDashboard } from '../compliance/AutomationDashboard';
import { ReportCenter } from '../compliance/ReportCenter';
import { CreditReadinessPanel } from '../compliance/CreditReadinessPanel';
import { mockComplianceTasks } from '../../data/mock/complianceCalendar';
import { ComplianceTask } from '../../data/mock/compliance';
import { ShieldCheck, CalendarCheck, FileText, ClipboardCheck, BarChart3, Zap, FileBox, Landmark } from 'lucide-react';

export default function CEOComplianceContent() {
  const [activeTab, setActiveTab] = useState<'overview' | 'automation' | 'reports' | 'credit' | 'calendar' | 'audit' | 'documents' | 'schemes'>('overview');
  const [selectedTask, setSelectedTask] = useState<ComplianceTask | null>(null);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'automation', label: 'Automation', icon: Zap },
    { id: 'reports', label: 'Auto-Reports', icon: FileBox },
    { id: 'credit', label: 'Credit Gateway', icon: Landmark },
    { id: 'calendar', label: 'Calendar', icon: CalendarCheck },
    { id: 'audit', label: 'Audit Ready', icon: ClipboardCheck },
    { id: 'documents', label: 'Vault', icon: FileText },
    { id: 'schemes', label: 'Governance & Schemes', icon: ShieldCheck }
  ] as const;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Compliance OS</h1>
          <p className="text-gray-500 text-sm mt-0.5">Control center for FPO governance</p>
        </div>
      </div>

      {/* Internal Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide py-1 -mx-4 px-4 gap-2">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-brand text-white shadow-md shadow-brand/20' 
                  : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="mt-4">
        {activeTab === 'overview' && <ComplianceOverview tasks={mockComplianceTasks} />}
        {activeTab === 'automation' && <AutomationDashboard />}
        {activeTab === 'reports' && <ReportCenter />}
        {activeTab === 'credit' && <CreditReadinessPanel tasks={mockComplianceTasks} />}
        {activeTab === 'calendar' && <ComplianceCalendar tasks={mockComplianceTasks} onTaskClick={setSelectedTask} />}
        {activeTab === 'audit' && <AuditDashboard />}
        {activeTab === 'documents' && <DocumentVault />}
        {activeTab === 'schemes' && (
            <div className="space-y-6">
                <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3 px-1">Governance</h2>
                    <GovernanceModule />
                </section>
                <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3 px-1">Schemes & Grants</h2>
                    <SchemeTracker />
                </section>
            </div>
        )}
      </div>

      {/* Modals */}
      <ComplianceTaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}
