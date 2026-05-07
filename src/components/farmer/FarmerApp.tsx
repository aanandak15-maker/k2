import React, { useState } from 'react';
import './farmer-tokens.css';
import BottomNav from './ui/BottomNav';
import HomeScreen from './screens/HomeScreen';
import PassbookScreen from './screens/PassbookScreen';
import MyFarmScreen from './screens/MyFarmScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShopScreen from './screens/ShopScreen';
import MandiScreen from './screens/MandiScreen';
import LanguageScreen from './screens/LanguageScreen';
import LoginScreen from './screens/LoginScreen';
import OTPScreen from './screens/OTPScreen';
import WelcomeScreen from './screens/WelcomeScreen';

interface FarmerAppProps {
  onHome: () => void;
}

export type FarmerScreen = 'language' | 'login' | 'otp' | 'welcome' | 'home' | 'farm' | 'shop' | 'passbook' | 'mandi' | 'profile';

export default function FarmerApp({ onHome }: FarmerAppProps) {
  // Start at language screen for new users
  const [currentScreen, setCurrentScreen] = useState<FarmerScreen>('language');
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');

  const navigate = (screen: FarmerScreen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  return (
    <div className="farmer-app sm:max-w-md sm:mx-auto sm:border-x sm:border-slate-200 sm:shadow-2xl relative bg-[var(--farmer-surface)] min-h-screen">
      
      {/* Temporary mobile debug header */}
      <div className="p-2 bg-[var(--farmer-primary)] text-white text-xs flex justify-between items-center sm:hidden">
        <span>K2 Farmer App Preview</span>
        <button onClick={onHome} className="underline">Exit</button>
      </div>

      <div className="flex-1">
        {/* Auth Flow */}
        {currentScreen === 'language' && (
          <LanguageScreen 
            currentLang={language} 
            onSelectLang={setLanguage} 
            onNavigate={navigate} 
          />
        )}
        {currentScreen === 'login' && <LoginScreen lang={language} onNavigate={navigate} />}
        {currentScreen === 'otp' && <OTPScreen lang={language} onNavigate={navigate} />}
        {currentScreen === 'welcome' && <WelcomeScreen lang={language} onNavigate={navigate} />}

        {/* Main App */}
        {currentScreen === 'home' && <HomeScreen onNavigate={navigate} lang={language} />}
        {currentScreen === 'farm' && <MyFarmScreen lang={language} />}
        {currentScreen === 'passbook' && <PassbookScreen lang={language} />}
        {currentScreen === 'shop' && <ShopScreen lang={language} />}
        {currentScreen === 'mandi' && <MandiScreen lang={language} />}
        {currentScreen === 'profile' && <ProfileScreen lang={language} onLogout={() => onHome()} />}
      </div>

      {/* Only show Bottom Nav for main app screens */}
      {!['language', 'login', 'otp', 'welcome'].includes(currentScreen) && (
        <BottomNav currentScreen={currentScreen} onNavigate={navigate} />
      )}
    </div>
  );
}
