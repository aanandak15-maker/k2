import React, { useState } from 'react';
import './chartSetup';
import SplashScreen from './components/SplashScreen';
import CEODashboard from './components/CEODashboard';
import ModeratorApp from './components/ModeratorApp';
import PlatformAdmin from './components/PlatformAdmin';
import AdminDashboard from './components/AdminDashboard';
import LandingPage from './components/landing/LandingPage';

import { ToastProvider } from './hooks/useToast';
import { ToastContainer } from './components/ui/Toast';
import { AdminProvider } from './store/AdminStore';
import { erpComplianceBridge } from './lib/erpComplianceBridge';

// Initialize bridge
(window as any).erpComplianceBridge = erpComplianceBridge;

export default function App() {
  const [currentRole, setCurrentRole] = useState<string | null>('ceo');

  const handleEnterApp = (role: string) => {
    setCurrentRole(role);
  };

  const handleHome = () => {
    setCurrentRole('selector');
  };

  const renderContent = () => {
    if (currentRole === 'selector') return <SplashScreen onEnterApp={handleEnterApp} onHome={() => setCurrentRole('ceo')} />;
    if (currentRole === 'ceo') return <CEODashboard onHome={handleHome} />;
    if (currentRole === 'moderator') return <ModeratorApp onHome={handleHome} />;
    if (currentRole === 'platform') return <PlatformAdmin onHome={handleHome} />;
    if (currentRole === 'admin') return <AdminDashboard onHome={handleHome} />;
    if (currentRole === 'farmer') return <FarmerApp onHome={handleHome} />;
    
    return <CEODashboard onHome={handleHome} />;
  };

  return (
    <AdminProvider>
      <ToastProvider>
        {renderContent()}
        <ToastContainer />
      </ToastProvider>
    </AdminProvider>
  );
}
