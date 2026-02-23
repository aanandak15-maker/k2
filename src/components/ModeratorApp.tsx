import React, { useState } from 'react';
import ModeratorHome from './moderator/ModeratorHome';
import { ModeratorTaskList } from './moderator/ModeratorTaskList';
import { ModeratorFarmerList } from './moderator/ModeratorFarmerList';
import { ModeratorFarmerDetail } from './moderator/ModeratorFarmerDetail';
import { ModeratorVisitLog } from './moderator/ModeratorVisitLog';
import { ModeratorPaymentCollection } from './moderator/ModeratorPaymentCollection';
import { ModeratorAdvisoryPush } from './moderator/ModeratorAdvisoryPush';
import { ModeratorIssueFlagging } from './moderator/ModeratorIssueFlagging';
import { BottomNav } from './ui/BottomNav';
import { useToast } from '../hooks/useToast';
import { OfflineIndicator } from './ui/OfflineIndicator';
import { LayoutDashboard, CheckSquare, Users, UserCircle, BellRing } from 'lucide-react';

interface ModeratorAppProps {
  onHome: () => void;
}

export default function ModeratorApp({ onHome }: ModeratorAppProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null);
  const { toast } = useToast();

  // New distinct active view states for deep screens
  const [activeView, setActiveView] = useState<'main' | 'farmer_detail' | 'visit_log' | 'payment' | 'advisory' | 'issue'>('main');

  const navItems = [
    { id: 'home', icon: LayoutDashboard, label: 'Home' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'farmers', icon: Users, label: 'Farmers' },
    { id: 'profile', icon: UserCircle, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 selection:text-emerald-900 flex justify-center">
      {/* 
        Mobile constraint container. This forces the app to look like a mobile 
        app even on desktop browsers, maintaining the spec's intent.
      */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        <OfflineIndicator />

        {/* App Bar (conditionally styled based on tab) */}
        {activeView === 'main' && activeTab !== 'home' && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30">
            <h1 className="font-bold text-lg text-slate-800 capitalize">{activeTab}</h1>
            <button onClick={() => toast({ message: '3 new notifications', variant: 'info' })} className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full">
              <BellRing size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        )}

        {/* Status bar spacer for PWA/Mobile feel */}
        {activeView === 'main' && activeTab === 'home' && <div className="h-6 bg-emerald-600"></div>}

        {/* Main Scrollable Content */}
        <div className={`flex-1 overflow-y-auto ${activeView === 'main' && activeTab === 'home' ? 'px-4' : 'px-4 py-4'} ${activeView !== 'main' ? 'p-0' : ''}`}>

          {/* Main Tabbed Views */}
          {activeView === 'main' && activeTab === 'home' && (
            <ModeratorHome
              onViewTasks={() => setActiveTab('tasks')}
              onViewFarmers={() => setActiveTab('farmers')}
              onPushAdvisory={() => setActiveView('advisory')}
              onFlagIssue={() => setActiveView('issue')}
            />
          )}
          {activeView === 'main' && activeTab === 'tasks' && <ModeratorTaskList />}
          {activeView === 'main' && activeTab === 'farmers' && (
            <ModeratorFarmerList
              onSelectFarmer={(id) => {
                setSelectedFarmerId(id);
                setActiveView('farmer_detail');
              }}
            />
          )}
          {activeView === 'main' && activeTab === 'profile' && (
            <div className="pb-20 flex flex-col items-center justify-center h-full space-y-4">
              <div className="text-slate-500 text-sm">Profile view coming soon...</div>
              <button
                onClick={onHome}
                className="px-6 py-2 bg-red-50 text-red-600 font-medium rounded-full border border-red-100"
              >
                Sign Out / Exit
              </button>
            </div>
          )}
        </div>

        {/* Deep Screens */}
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
            farmerName="Selected Farmer" // Should pass actual name, simplifying here
            onBack={() => setActiveView('farmer_detail')}
          />
        )}
        {activeView === 'payment' && selectedFarmerId && (
          <ModeratorPaymentCollection
            farmerId={selectedFarmerId}
            farmerName="Selected Farmer" // Should pass actual name
            outstandingAmount={5000} // Should pass actual amount
            onBack={() => setActiveView('farmer_detail')}
          />
        )}

        {/* Ad-hoc screens from home */}
        {activeView === 'advisory' && (
          <ModeratorAdvisoryPush clusterName="North Cluster" onBack={() => setActiveView('main')} />
        )}
        {activeView === 'issue' && (
          <ModeratorIssueFlagging farmerName="Anonymous" onBack={() => setActiveView('main')} />
        )}

        {/* Bottom Navigation */}
        {activeView === 'main' && (
          <BottomNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            items={navItems}
          />
        )}
      </div>
    </div>
  );
}
