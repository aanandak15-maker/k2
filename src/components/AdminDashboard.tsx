import React from 'react';

interface AdminDashboardProps {
  onHome: () => void;
}

export default function AdminDashboard({ onHome }: AdminDashboardProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="topbar">
        <div className="flex items-center gap-3">
          <button onClick={onHome} className="text-gray-400 hover:text-green-600 mr-1"><span style={{ fontSize: '20px' }}>🏠</span></button>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white text-xs font-bold">K2</span></div>
          <div><div className="font-bold text-gray-800 text-sm">Sikandrabad FPC — Admin</div><div className="text-blue-600 text-xs">Ramesh Gupta · Operations Controller</div></div>
        </div>
        <div className="flex items-center gap-4">
          <span className="relative cursor-pointer"><span style={{ fontSize: '22px' }}>🔔</span><span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">5</span></span>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">RG</div>
        </div>
      </div>
      <div className="p-6">
        {/* Quick Actions */}
        <div className="flex gap-3 mb-5 overflow-x-auto pb-1 scrollbar-hide">
          <button className="shrink-0 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-green-700 shadow-sm">➕ Add Farmer</button>
          <button className="shrink-0 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-blue-700 shadow-sm">📦 Create PO</button>
          <button className="shrink-0 flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-emerald-700 shadow-sm">💳 Record Payment</button>
          <button className="shrink-0 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-indigo-700 shadow-sm">📄 Upload Document</button>
          <button className="shrink-0 flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-orange-700 shadow-sm">🏪 Add Stock Entry</button>
        </div>
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          <div className="kpi-card bg-white rounded-xl p-4 shadow-sm border border-gray-100"><div className="text-xs text-gray-500 mb-1">Pending Data Tasks</div><div className="text-xl font-bold text-orange-600">12</div><div className="text-xs text-gray-400">Need action today</div></div>
          <div className="kpi-card bg-white rounded-xl p-4 shadow-sm border border-gray-100"><div className="text-xs text-gray-500 mb-1">Unreconciled Payments</div><div className="text-xl font-bold text-yellow-600">8</div><div className="text-xs text-gray-400">Manual review needed</div></div>
          <div className="kpi-card bg-white rounded-xl p-4 shadow-sm border border-gray-100"><div className="text-xs text-gray-500 mb-1">Documents Expiring</div><div className="text-xl font-bold text-red-600">3</div><div className="text-xs text-gray-400">Within 30 days</div></div>
          <div className="kpi-card bg-white rounded-xl p-4 shadow-sm border border-gray-100"><div className="text-xs text-gray-500 mb-1">Staff Attendance Today</div><div className="text-xl font-bold text-green-700">4/5</div><div className="text-xs text-gray-400">Rajesh absent</div></div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {/* Overdue Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="font-bold text-gray-800 mb-3 text-sm flex items-center gap-2">💸 Overdue Management <span className="badge badge-red">38 Farmers</span></div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="stat-mini text-center border border-red-100">
                <div className="text-xl font-bold text-red-600">₹4,82,000</div>
                <div className="text-xs text-gray-400">Total Overdue</div>
              </div>
              <div className="stat-mini text-center border border-gray-100">
                <div className="text-xl font-bold text-gray-700">24 days</div>
                <div className="text-xs text-gray-400">Avg Overdue Age</div>
              </div>
            </div>
            <table className="data-table w-full text-left text-xs">
              <thead><tr><th>Age Bucket</th><th>Farmers</th><th>Amount</th></tr></thead>
              <tbody>
                <tr><td>1–15 days</td><td>14</td><td>₹1,20,000</td></tr>
                <tr><td>16–30 days</td><td>12</td><td>₹1,80,000</td></tr>
                <tr><td className="text-orange-600 font-semibold">31–60 days ⚠</td><td>8</td><td>₹1,22,000</td></tr>
                <tr><td className="text-red-600 font-bold">60+ days 🔴</td><td>4</td><td>₹60,000</td></tr>
              </tbody>
            </table>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 bg-yellow-500 text-white text-xs font-semibold py-2 rounded-lg hover:bg-yellow-600">📲 Send Bulk SMS</button>
              <button className="flex-1 bg-blue-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-blue-700">📋 View All</button>
            </div>
          </div>
          {/* Inventory Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="font-bold text-gray-800 mb-3 text-sm">🏪 Live Inventory Status</div>
            <table className="data-table w-full text-left text-xs">
              <thead><tr><th>Product</th><th>Stock</th><th>Reorder Level</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>DAP Fertilizer</td><td className="text-red-600 font-bold">18 bags</td><td>50 bags</td><td><span className="badge badge-red">🔴 Critical</span></td></tr>
                <tr><td>Propiconazole</td><td>55 L</td><td>30 L</td><td><span className="badge badge-green">✅ OK</span></td></tr>
                <tr><td>Wheat Seed</td><td>185 kg</td><td>200 kg</td><td><span className="badge badge-yellow">🟡 Near Reorder</span></td></tr>
                <tr><td>Urea</td><td>120 bags</td><td>80 bags</td><td><span className="badge badge-green">✅ OK</span></td></tr>
              </tbody>
            </table>
            <div className="mt-3 p-2.5 bg-orange-50 rounded-lg border border-orange-100">
              <div className="text-xs font-semibold text-orange-700">⚠ Expiry Alert: Propiconazole Batch B-2024-03</div>
              <div className="text-xs text-orange-600">Expires Feb 28, 2025 · 55L remaining · Action needed</div>
            </div>
            <div className="mt-3">
              <div className="font-semibold text-sm text-gray-800 mb-2">Share Capital Summary</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-50 rounded-lg p-2"><div className="text-gray-500">Total Paid-Up</div><div className="font-bold text-gray-800">₹1,08,500</div></div>
                <div className="bg-red-50 rounded-lg p-2"><div className="text-gray-500">Calls in Arrears</div><div className="font-bold text-red-600">₹11,500</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
