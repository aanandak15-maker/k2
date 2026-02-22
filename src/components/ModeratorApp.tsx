import React from 'react';

interface ModeratorAppProps {
  onHome: () => void;
}

export default function ModeratorApp({ onHome }: ModeratorAppProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 py-10">
      <div style={{ width: '375px' }} className="bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 relative">
        {/* Phone top bar */}
        <div className="bg-green-700 px-5 pt-4 pb-3">
          <div className="flex items-center justify-between text-white text-xs mb-1 opacity-70">
            <span>9:41 AM</span>
            <span>📶 🔋</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-bold text-base">Good Morning, Suresh 🌾</div>
              <div className="text-green-200 text-xs">Cluster: Sikandrabad · 47 Farmers</div>
            </div>
            <button onClick={onHome} className="text-green-200 text-xs bg-green-600 px-2 py-1 rounded-lg">← Back</button>
          </div>
        </div>

        {/* App Body */}
        <div className="overflow-y-auto" style={{ maxHeight: '600px', paddingBottom: '70px' }}>
          {/* Today's Tasks Card */}
          <div className="m-3 bg-red-50 rounded-2xl p-4 border border-red-100">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-gray-800 text-sm">📋 TODAY'S TASKS</div>
              <span className="badge badge-red">2 Overdue</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-xl p-2 text-center shadow-sm">
                <div className="font-bold text-gray-800 text-lg">6</div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
              <div className="bg-white rounded-xl p-2 text-center shadow-sm border border-red-200">
                <div className="font-bold text-red-600 text-lg">2</div>
                <div className="text-xs text-gray-500">Overdue</div>
              </div>
            </div>
            <button className="mt-2 w-full text-center text-green-600 font-semibold text-xs py-2 bg-white rounded-xl border border-green-100">View Tasks →</button>
          </div>

          {/* My Farmers */}
          <div className="m-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="font-bold text-gray-800 text-sm mb-2">👨‍🌾 MY FARMERS</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-green-50 rounded-xl p-2">
                <div className="font-bold text-green-700">38</div>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-0.5"><span className="pulse-dot pulse-green w-2 h-2"></span>Active</div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-2">
                <div className="font-bold text-yellow-600">6</div>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-0.5"><span className="pulse-dot pulse-yellow w-2 h-2"></span>Dormant</div>
              </div>
              <div className="bg-red-50 rounded-xl p-2">
                <div className="font-bold text-red-600">3</div>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-0.5"><span className="pulse-dot pulse-red w-2 h-2"></span>Inactive</div>
              </div>
            </div>
            <button className="mt-2 w-full text-center text-green-600 font-semibold text-xs py-2 bg-green-50 rounded-xl">View All →</button>
          </div>

          {/* Collections */}
          <div className="m-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="font-bold text-gray-800 text-sm mb-2">💰 COLLECTIONS TODAY</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Collected</span>
              <span className="font-bold text-green-700">₹4,500</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">Target</span>
              <span className="font-bold text-gray-800">₹8,000</span>
            </div>
            <div className="progress-bar h-2 mb-1"><div className="progress-fill" style={{ width: '56%' }}></div></div>
            <div className="text-xs text-gray-400 mb-2">56% of daily target</div>
            <button className="w-full bg-green-600 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-green-700">+ Record Payment</button>
          </div>

          {/* Farmer Cards */}
          <div className="mx-3 mb-3">
            <div className="font-bold text-gray-800 text-sm mb-2">Recent Farmers</div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 mb-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5"><span className="pulse-dot pulse-green w-2.5 h-2.5"></span><span className="font-bold text-gray-800 text-sm">Raju Yadav</span></div>
                  <div className="text-xs text-gray-500 mt-0.5">Wheat · 1.2 Ha · Pilkhana</div>
                  <div className="text-xs text-blue-600 mt-0.5">Stage: 3rd Irrigation Due</div>
                  <div className="text-xs text-gray-400 mt-0.5">Last Visit: 3 days ago</div>
                  <div className="text-xs text-yellow-600 font-medium mt-0.5">Dues: ₹1,800</div>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="flex-1 bg-green-50 text-green-700 text-xs font-semibold py-1.5 rounded-lg border border-green-100">📍 Visit</button>
                <button className="flex-1 bg-blue-50 text-blue-700 text-xs font-semibold py-1.5 rounded-lg border border-blue-100">📞 Call</button>
                <button className="flex-1 bg-yellow-50 text-yellow-700 text-xs font-semibold py-1.5 rounded-lg border border-yellow-100">📢 Advisory</button>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-yellow-200 shadow-sm p-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5"><span className="pulse-dot pulse-yellow w-2.5 h-2.5"></span><span className="font-bold text-gray-800 text-sm">Seema Devi</span></div>
                  <div className="text-xs text-gray-500 mt-0.5">Wheat · 0.8 Ha · Rampur</div>
                  <div className="text-xs text-red-500 mt-0.5">⚠ Spray Due (Overdue)</div>
                  <div className="text-xs text-red-400 mt-0.5">Last Visit: 12 days ago ⚠</div>
                  <div className="text-xs text-red-600 font-medium mt-0.5">Dues: ₹4,100</div>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="flex-1 bg-green-50 text-green-700 text-xs font-semibold py-1.5 rounded-lg border border-green-100">📍 Visit</button>
                <button className="flex-1 bg-blue-50 text-blue-700 text-xs font-semibold py-1.5 rounded-lg border border-blue-100">📞 Call</button>
                <button className="flex-1 bg-red-50 text-red-700 text-xs font-semibold py-1.5 rounded-lg border border-red-100">⚠ Flag</button>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="m-3 bg-yellow-50 rounded-2xl p-4 border border-yellow-100">
            <div className="font-bold text-gray-800 text-sm mb-2">⚠️ ALERTS</div>
            <div className="text-xs text-gray-600 mb-1">• Weather: Heavy rain expected in 48 hrs</div>
            <div className="text-xs text-gray-600">• 3 farmers not reachable for 7 days</div>
            <button className="mt-2 w-full text-center text-yellow-700 font-semibold text-xs py-1.5 bg-white rounded-xl border border-yellow-200">View All →</button>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-2.5 rounded-b-3xl">
          <button className="flex flex-col items-center text-green-600"><span className="text-lg">🏠</span><span className="text-xs font-medium">Home</span></button>
          <button className="flex flex-col items-center text-gray-400"><span className="text-lg">👨‍🌾</span><span className="text-xs">Farmers</span></button>
          <button className="flex flex-col items-center text-gray-400"><span className="text-lg">📋</span><span className="text-xs">Tasks</span></button>
          <button className="flex flex-col items-center text-gray-400"><span className="text-lg">📊</span><span className="text-xs">More</span></button>
        </div>
      </div>
      <p className="text-gray-500 text-sm mt-4">Moderator Mobile App — React Native</p>
    </div>
  );
}
