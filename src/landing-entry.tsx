import React from 'react';
import { createRoot } from 'react-dom/client';
import LandingPage from './components/landing/LandingPage';
import './index.css';

// Simple handler for the Access Platform button
const handleLogin = () => {
  alert('In this isolated landing page build, platform access is disabled. Please refer to the full application for dashboard functionality.');
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <div className="landing-theme">
        <LandingPage onLogin={handleLogin} />
      </div>
    </React.StrictMode>
  );
}
