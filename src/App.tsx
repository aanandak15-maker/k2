import React, { useState } from 'react';
import './chartSetup';
import SplashScreen from './components/SplashScreen';
import CEODashboard from './components/CEODashboard';
import ModeratorApp from './components/ModeratorApp';
import PlatformAdmin from './components/PlatformAdmin';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [currentRole, setCurrentRole] = useState<string | null>(null);

  const handleEnterApp = (role: string) => {
    setCurrentRole(role);
  };

  const handleHome = () => {
    setCurrentRole(null);
  };

  if (!currentRole) {
    return <SplashScreen onEnterApp={handleEnterApp} />;
  }

  if (currentRole === 'ceo') {
    return <CEODashboard onHome={handleHome} />;
  }

  if (currentRole === 'moderator') {
    return <ModeratorApp onHome={handleHome} />;
  }

  if (currentRole === 'platform') {
    return <PlatformAdmin onHome={handleHome} />;
  }

  if (currentRole === 'admin') {
    return <AdminDashboard onHome={handleHome} />;
  }

  return <SplashScreen onEnterApp={handleEnterApp} />;
}
