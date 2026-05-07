import React, { useState } from 'react';
import ModeratorHome from '../../moderator/ModeratorHome';
import { ModeratorTaskList } from '../../moderator/ModeratorTaskList';
import { ModeratorFarmerList } from '../../moderator/ModeratorFarmerList';
import { ModeratorFarmerDetail } from '../../moderator/ModeratorFarmerDetail';
import { ModeratorVisitLog } from '../../moderator/ModeratorVisitLog';
import { ModeratorPaymentCollection } from '../../moderator/ModeratorPaymentCollection';
import { ModeratorAdvisoryPush } from '../../moderator/ModeratorAdvisoryPush';
import { ModeratorIssueFlagging } from '../../moderator/ModeratorIssueFlagging';
import { MobileAppBar } from '../MobileAppBar';
import { MobileBottomNav, NavItem } from '../MobileBottomNav';
import { OfflineIndicator } from '../../ui/OfflineIndicator';
import { useToast } from '../../../hooks/useToast';
import { LayoutDashboard, CheckSquare, Users, UserCircle } from 'lucide-react';

interface ModeratorMobileShellProps {
  onLogout: () => void;
  userName?: string;
}

type ModeratorView = 'main' | 'farmer_detail' | 'visit_log' | 'payment' | 'advisory' | 'issue';

const navItems: NavItem[] = [
  { id: 'home', icon: LayoutDashboard, label: 'Home' },
  { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
  { id: 'farmers', icon: Users, label: 'Farmers' },
  { id: 'profile', icon: UserCircle, label: 'Profile' },
];

export default function ModeratorMobileShell({ onLogout, userName = 'Suresh Kumar' }: ModeratorMobileShellProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [activeView, setActiveView] = useState<ModeratorView>('main');
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null);
  const { toast } = useToast();

  const isDeepView = activeView !== 'main';

  const handleBack = () => {
    if (activeView === 'visit_log' || activeView === 'payment') {
      setActiveView('farmer_detail');
    } else {
      setActiveView('main');
    }
  };

  const getTitle = () => {
    if (activeView === 'farmer_detail') return 'Farmer Profile';
    if (activeView === 'visit_log') return 'Log Visit';
    if (activeView === 'payment') return 'Collect Payment';
    if (activeView === 'advisory') return 'Push Advisory';
    if (activeView === 'issue') return 'Flag Issue';
    const map: Record<string, string> = { home: 'Home', tasks: 'My Tasks', farmers: 'Farmers', profile: 'Profile' };
    return map[activeTab] || 'Home';
  };

  return (
    <div className="mobile-frame" data-role="moderator">
      <OfflineIndicator />

      <MobileAppBar
        title="K2 Moderator"
        subtitle={getTitle()}
        role="moderator"
        userName={userName}
        showBack={isDeepView}
        onBack={handleBack}
        onLogout={onLogout}
      />

      {/* Content area — reuse existing moderator screens */}
      <div className="mobile-content">
        {/* Main tabbed views */}
        {activeView === 'main' && (
          <div className="px-4 py-2">
            {activeTab === 'home' && (
              <ModeratorHome
                onViewTasks={() => setActiveTab('tasks')}
                onViewFarmers={() => setActiveTab('farmers')}
                onPushAdvisory={() => setActiveView('advisory')}
                onFlagIssue={() => setActiveView('issue')}
              />
            )}
            {activeTab === 'tasks' && <ModeratorTaskList />}
            {activeTab === 'farmers' && (
              <ModeratorFarmerList
                onSelectFarmer={(id) => {
                  setSelectedFarmerId(id);
                  setActiveView('farmer_detail');
                }}
              />
            )}
            {activeTab === 'profile' && (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-2xl font-black text-amber-700">
                  {userName.charAt(0)}
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-900 text-lg">{userName}</p>
                  <p className="text-slate-500 text-sm">Field Moderator</p>
                  <p className="text-slate-400 text-xs mt-0.5">North Cluster</p>
                </div>
                <button
                  onClick={onLogout}
                  className="mt-4 px-8 py-3 bg-red-50 text-red-600 font-semibold rounded-2xl border border-red-100 text-sm"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}

        {/* Deep screens — full width, no side padding (they manage their own layout) */}
        {activeView === 'farmer_detail' && selectedFarmerId && (
          <ModeratorFarmerDetail
            farmerId={selectedFarmerId}
            onBack={() => setActiveView('main')}
            onLogVisit={() => setActiveView('visit_log')}
            onCollectPayment={() => setActiveView('payment')}
          />
        )}
        {activeView === 'visit_log' && selectedFarmerId && (
          <ModeratorVisitLog
            farmerId={selectedFarmerId}
            farmerName="Selected Farmer"
            onBack={() => setActiveView('farmer_detail')}
          />
        )}
        {activeView === 'payment' && selectedFarmerId && (
          <ModeratorPaymentCollection
            farmerId={selectedFarmerId}
            farmerName="Selected Farmer"
            outstandingAmount={5000}
            onBack={() => setActiveView('farmer_detail')}
          />
        )}
        {activeView === 'advisory' && (
          <ModeratorAdvisoryPush clusterName="North Cluster" onBack={() => setActiveView('main')} />
        )}
        {activeView === 'issue' && (
          <ModeratorIssueFlagging farmerName="Anonymous" onBack={() => setActiveView('main')} />
        )}
      </div>

      {/* Bottom nav — only in main views */}
      {activeView === 'main' && (
        <MobileBottomNav
          items={navItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          role="moderator"
        />
      )}
    </div>
  );
}
