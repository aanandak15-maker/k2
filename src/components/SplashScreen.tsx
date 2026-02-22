import React from 'react';

interface SplashScreenProps {
  onEnterApp: (role: string) => void;
}

export default function SplashScreen({ onEnterApp }: SplashScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-emerald-600">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
          <span style={{ fontSize: '38px' }}>🌾</span>
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">K2 FPO Platform</h1>
        <p className="text-green-200 mt-2 text-lg">Intelligent FPO Management — Empowering Farmer Collectives</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl w-full px-6">
        <div className="role-card bg-white rounded-2xl p-6 text-center shadow-lg" onClick={() => onEnterApp('ceo')}>
          <div className="text-4xl mb-3">👔</div>
          <div className="font-bold text-gray-800 text-lg">FPO CEO</div>
          <div className="text-gray-500 text-sm mt-1">Command Centre Dashboard</div>
          <div className="mt-4 bg-green-50 text-green-700 text-xs font-semibold py-1 px-3 rounded-full inline-block">Strategic View</div>
        </div>
        <div className="role-card bg-white rounded-2xl p-6 text-center shadow-lg" onClick={() => onEnterApp('admin')}>
          <div className="text-4xl mb-3">⚙️</div>
          <div className="font-bold text-gray-800 text-lg">FPO Admin</div>
          <div className="text-gray-500 text-sm mt-1">Operations Controller</div>
          <div className="mt-4 bg-blue-50 text-blue-700 text-xs font-semibold py-1 px-3 rounded-full inline-block">Full Access</div>
        </div>
        <div className="role-card bg-white rounded-2xl p-6 text-center shadow-lg" onClick={() => onEnterApp('moderator')}>
          <div className="text-4xl mb-3">🚜</div>
          <div className="font-bold text-gray-800 text-lg">Moderator</div>
          <div className="text-gray-500 text-sm mt-1">Field Coordinator App</div>
          <div className="mt-4 bg-amber-50 text-amber-700 text-xs font-semibold py-1 px-3 rounded-full inline-block">Mobile Field</div>
        </div>
        <div className="role-card bg-white rounded-2xl p-6 text-center shadow-lg" onClick={() => onEnterApp('platform')}>
          <div className="text-4xl mb-3">🏢</div>
          <div className="font-bold text-gray-800 text-lg">K2 Admin</div>
          <div className="text-gray-500 text-sm mt-1">Platform Master Dashboard</div>
          <div className="mt-4 bg-purple-50 text-purple-700 text-xs font-semibold py-1 px-3 rounded-full inline-block">Super Admin</div>
        </div>
      </div>
      <p className="text-green-300 mt-10 text-sm">Select a role to preview the prototype</p>
    </div>
  );
}
