import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface PlatformAdminProps {
  onHome: () => void;
}

export default function PlatformAdmin({ onHome }: PlatformAdminProps) {
  const revenueData: ChartData<'line'> = {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    datasets: [{ label: 'MRR (₹L)', data: [12, 13, 14, 15, 17, 18, 20, 21, 23, 25, 27, 29], borderColor: '#7c3aed', fill: true, backgroundColor: 'rgba(124,58,237,0.1)', tension: 0.4, pointRadius: 2 }]
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { ticks: { font: { size: 8 } } }, y: { ticks: { font: { size: 9 } } } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="topbar">
        <div className="flex items-center gap-3">
          <button onClick={onHome} className="text-gray-400 hover:text-green-600 mr-1"><span style={{ fontSize: '20px' }}>🏠</span></button>
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center"><span className="text-white text-xs font-bold">K2</span></div>
          <div><div className="font-bold text-gray-800 text-sm">K2 Platform Admin</div><div className="text-purple-600 text-xs">Master Dashboard</div></div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">admin@k2agri.in</span>
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">SA</div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="kpi-card bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500 mb-1">Total FPOs Onboarded</div>
            <div className="text-2xl font-bold text-purple-700">342</div>
            <div className="text-xs text-green-600 mt-1">↑ 12 this month</div>
          </div>
          <div className="kpi-card bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500 mb-1">Total Farmers</div>
            <div className="text-2xl font-bold text-gray-800">41,200</div>
            <div className="text-xs text-green-600 mt-1">Across all FPOs</div>
          </div>
          <div className="kpi-card bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500 mb-1">Active FPOs (Month)</div>
            <div className="text-2xl font-bold text-gray-800">298</div>
            <div className="text-xs text-yellow-600 mt-1">44 inactive</div>
          </div>
          <div className="kpi-card bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500 mb-1">MIS Reports (Quarter)</div>
            <div className="text-2xl font-bold text-gray-800">1,204</div>
            <div className="text-xs text-green-600 mt-1">↑ 8% vs last qtr</div>
          </div>
          <div className="kpi-card bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500 mb-1">Open Support Tickets</div>
            <div className="text-2xl font-bold text-red-600">17</div>
            <div className="text-xs text-red-500 mt-1">3 critical</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="font-bold text-gray-800 mb-4 text-sm flex items-center justify-between">
              🗺 FPO Health Map — India
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>Healthy (70+)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>Attention (40-69)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>Critical (&lt;40)</span>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center relative overflow-hidden" style={{ height: '260px' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-20">🗺</div>
              </div>
              {/* Simulate FPO dots on map */}
              <div className="relative w-full h-full">
                <div className="absolute" style={{ top: '30%', left: '38%' }}><div className="w-4 h-4 bg-green-500 rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-150 transition-transform" title="UP: 48 FPOs"></div></div>
                <div className="absolute" style={{ top: '45%', left: '35%' }}><div className="w-3 h-3 bg-green-500 rounded-full shadow border-2 border-white cursor-pointer hover:scale-150 transition-transform" title="Rajasthan: 36 FPOs"></div></div>
                <div className="absolute" style={{ top: '55%', left: '60%' }}><div className="w-4 h-4 bg-green-500 rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-150 transition-transform" title="MP: 44 FPOs"></div></div>
                <div className="absolute" style={{ top: '60%', left: '45%' }}><div className="w-3 h-3 bg-yellow-400 rounded-full shadow border-2 border-white cursor-pointer hover:scale-150 transition-transform" title="Gujarat: 28 FPOs"></div></div>
                <div className="absolute" style={{ top: '70%', left: '50%' }}><div className="w-3 h-3 bg-green-500 rounded-full shadow border-2 border-white cursor-pointer" title="Maharashtra: 52 FPOs"></div></div>
                <div className="absolute" style={{ top: '75%', left: '62%' }}><div className="w-2 h-2 bg-red-500 rounded-full shadow border border-white cursor-pointer hover:scale-150 transition-transform" title="AP: 18 FPOs (needs attention)"></div></div>
                <div className="absolute" style={{ top: '80%', left: '45%' }}><div className="w-3 h-3 bg-green-500 rounded-full shadow border-2 border-white cursor-pointer" title="Karnataka: 38 FPOs"></div></div>
                <div className="absolute" style={{ top: '35%', left: '70%' }}><div className="w-3 h-3 bg-yellow-400 rounded-full shadow border-2 border-white cursor-pointer" title="Bihar: 32 FPOs"></div></div>
                <div className="absolute bottom-2 left-2 text-xs text-gray-400 bg-white rounded px-2 py-1 shadow-sm">342 FPOs across 18 states</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="font-bold text-gray-800 mb-4 text-sm">📋 Recent Activity Feed</div>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              <div className="text-xs"><span className="text-green-600 font-semibold">New FPO Created</span> · Sitapur FPC Ltd → UP<div className="text-gray-400">Platform Admin · 2 min ago</div></div>
              <div className="border-t pt-2 text-xs"><span className="text-blue-600 font-semibold">Subscription Renewed</span> · Sikandrabad FPC Ltd → Growth Plan<div className="text-gray-400">Auto-payment · 45 min ago</div></div>
              <div className="border-t pt-2 text-xs"><span className="text-yellow-600 font-semibold">CEO Changed</span> · Muzaffarnagar FPC → New CEO: Rajiv Verma<div className="text-gray-400">Admin · 2 hrs ago</div></div>
              <div className="border-t pt-2 text-xs"><span className="text-green-600 font-semibold">MIS Report Generated</span> · Mathura FPC Q2 NABARD<div className="text-gray-400">Admin · 3 hrs ago</div></div>
              <div className="border-t pt-2 text-xs"><span className="text-red-600 font-semibold">Support Ticket Opened</span> · Firozabad FPC · Payment issue<div className="text-gray-400">CEO · 4 hrs ago · Priority: High</div></div>
              <div className="border-t pt-2 text-xs"><span className="text-purple-600 font-semibold">New FPO Created</span> · Etawah FPC Ltd → UP<div className="text-gray-400">Platform Admin · 5 hrs ago</div></div>
            </div>
            <div className="mt-4">
              <div className="font-bold text-gray-800 text-sm mb-2">Revenue Dashboard</div>
              <div style={{ height: '100px' }}>
                <Line data={revenueData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="font-bold text-gray-800 mb-4 text-sm flex items-center justify-between">
            🏢 FPO Directory
            <div className="flex gap-2">
              <input placeholder="Search FPO..." className="text-xs border rounded-lg px-2 py-1 w-40" />
              <button className="bg-purple-600 text-white text-xs px-3 py-1 rounded-lg font-semibold hover:bg-purple-700">+ Onboard New FPO</button>
            </div>
          </div>
          <table className="data-table w-full text-left">
            <thead><tr><th>FPO Name</th><th>State</th><th>CEO</th><th>Farmers</th><th>Credit Score</th><th>Subscription</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td className="font-medium">Sikandrabad FPC Ltd</td><td>Uttar Pradesh</td><td>Ramesh Kumar</td><td>1,200</td><td><span className="font-bold text-green-600">82</span></td><td><span className="badge badge-green">Growth · Active</span></td><td><span className="badge badge-green">Healthy</span></td></tr>
              <tr><td className="font-medium">Mathura Kisan FPC</td><td>Uttar Pradesh</td><td>Suresh Sharma</td><td>856</td><td><span className="font-bold text-green-600">74</span></td><td><span className="badge badge-green">Basic · Active</span></td><td><span className="badge badge-green">Healthy</span></td></tr>
              <tr><td className="font-medium">Firozabad FPC Ltd</td><td>Uttar Pradesh</td><td>Anita Gupta</td><td>420</td><td><span className="font-bold text-yellow-600">52</span></td><td><span className="badge badge-yellow">Basic · Grace</span></td><td><span className="badge badge-yellow">Attention</span></td></tr>
              <tr><td className="font-medium">Rajkot Kisan FPC</td><td>Gujarat</td><td>Ramji Patel</td><td>1,540</td><td><span className="font-bold text-green-600">91</span></td><td><span className="badge badge-green">Enterprise · Active</span></td><td><span className="badge badge-green">Healthy</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
