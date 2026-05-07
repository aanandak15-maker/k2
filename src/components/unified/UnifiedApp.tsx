import React, { useState } from 'react';
import '../../styles/mobile-tokens.css';
import MobileLogin from './MobileLogin';
import CEOMobileShell from './shells/CEOMobileShell';
import AdminMobileShell from './shells/AdminMobileShell';
import ModeratorMobileShell from './shells/ModeratorMobileShell';
import PlatformMobileShell from './shells/PlatformMobileShell';
import FarmerMobileShell from './shells/FarmerMobileShell';
import type { UserRole } from './MobileAppBar';

interface UnifiedAppProps {
  /** Called when user wants to go back to landing page */
  onHome?: () => void;
}

interface CurrentUser {
  role: UserRole;
  name: string;
}

/**
 * UnifiedApp
 *
 * The single, mobile-first application shell for ALL roles:
 * FPO CEO | FPO Admin | Moderator | Platform Admin | Farmer
 *
 * Flow:
 * 1. Show MobileLogin (role selector → phone → OTP)
 * 2. On login success → render role-specific shell
 * 3. Each shell reuses existing content screens inside mobile nav chrome
 */
export default function UnifiedApp({ onHome }: UnifiedAppProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const handleLogin = (role: UserRole, name: string) => {
    setCurrentUser({ role, name });
    // Scroll to top on role change
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    window.scrollTo(0, 0);
  };

  // Not logged in → show login
  if (!currentUser) {
    return (
      <div className="unified-app">
        <div className="mobile-frame">
          <MobileLogin onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  // Logged in → render role shell
  return (
    <div className="unified-app">
      {currentUser.role === 'ceo' && (
        <CEOMobileShell onLogout={handleLogout} userName={currentUser.name} />
      )}
      {currentUser.role === 'admin' && (
        <AdminMobileShell onLogout={handleLogout} userName={currentUser.name} />
      )}
      {currentUser.role === 'moderator' && (
        <ModeratorMobileShell onLogout={handleLogout} userName={currentUser.name} />
      )}
      {currentUser.role === 'platform' && (
        <PlatformMobileShell onLogout={handleLogout} userName={currentUser.name} />
      )}
      {currentUser.role === 'farmer' && (
        <FarmerMobileShell onLogout={handleLogout} />
      )}
    </div>
  );
}
