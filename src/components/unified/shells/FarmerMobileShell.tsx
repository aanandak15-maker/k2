import React, { useState } from 'react';
import FarmerApp from '../../farmer/FarmerApp';

interface FarmerMobileShellProps {
  onLogout: () => void;
}

/**
 * FarmerMobileShell
 * 
 * The Farmer app is already fully mobile-native with its own design system
 * (farmer-tokens.css), bottom nav, language selector and auth flow.
 * This thin shell just wires the unified app's logout to the farmer app's
 * onHome callback.
 */
export default function FarmerMobileShell({ onLogout }: FarmerMobileShellProps) {
  return (
    <div className="mobile-frame" data-role="farmer">
      {/* FarmerApp manages its own layout, auth flow, bottom nav entirely */}
      <FarmerApp onHome={onLogout} />
    </div>
  );
}
