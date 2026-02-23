import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { StatCard } from '../ui/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { AlertCircle, CheckCircle, Clock, TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Activity, CloudSun, ShieldCheck } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { mockWeather } from '../../data/mock/weather';

interface CEODashboardContentProps {
  setActiveSection: (section: string) => void;
}

export default function CEODashboardContent({ setActiveSection }: CEODashboardContentProps) {
  const { toast } = useToast();
  const { state } = useAdminStore();

  // Computed KPIs from Store
  const totalFarmers = state.farmers.length;
  const activeFarmers = state.farmers.filter(f => f.status === 'Active').length;
  // Count farmers onboarding this month (mock logic using arbitrary date)
  const newFarmers = state.farmers.slice(-5).length;

  const pendingOrders = state.orders.filter(o => o.status === 'Pending').length;
  const completedOrders = state.orders.filter(o => o.status === 'Fulfilled').length;
  const totalOrders = state.orders.length;

  const totalRevenue = state.payments.filter(p => p.type === 'Inbound' && p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
  const totalBankBalance = totalRevenue - state.payments.filter(p => p.type === 'Outbound').reduce((sum, p) => sum + p.amount, 0);

  const cashflowData: ChartData<'bar'> = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
    datasets: [
      { label: 'Inflows', data: [120, 80, 150, 90, 200, 60, 180, 110], backgroundColor: 'rgba(16, 185, 129, 0.6)', borderRadius: 4 },
      { label: 'Outflows', data: [-85, -255, -95, -120, -80, -190, -70, -140], backgroundColor: 'rgba(239, 68, 68, 0.6)', borderRadius: 4 }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#64748b' } },
      y: { ticks: { font: { size: 10 }, color: '#64748b' }, grid: { color: '#f1f5f9' } }
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Farmer Strength"
          value={totalFarmers.toString()}
          subValue={`of ${totalFarmers + 150} registered target`}
          trend={`↑ ${newFarmers}`}
          trendDirection="up"
          pulseColor="green"
          icon={Users}
        />
        <StatCard
          title="Active Members"
          value={activeFarmers.toString()}
          subValue="Currently trading"
          trend={`${Math.round((activeFarmers / totalFarmers) * 100)}% active`}
          trendDirection="up"
          pulseColor="green"
          icon={Activity}
        />
        <StatCard
          title="Input Orders"
          value={totalOrders.toString()}
          subValue={`${completedOrders} completed`}
          trend={`${pendingOrders} pending`}
          trendDirection={pendingOrders > 0 ? "warning" : "neutral"}
          pulseColor="yellow"
          icon={ShoppingCart}
        />
        <StatCard
          title="Cash Position"
          value={`₹${(totalBankBalance / 100000).toFixed(2)}L`}
          subValue="Bank Balance"
          trend={totalBankBalance > 0 ? "Healthy" : "Low"}
          trendDirection="up"
          pulseColor="green"
          icon={DollarSign}
        />
        <StatCard
          title="Recorded Revenue"
          value={`₹${(totalRevenue / 100000).toFixed(2)}L`}
          subValue="All Inbound Payments"
          trend="Live data"
          trendDirection="up"
          pulseColor="green"
          icon={TrendingUp}
        />
        <StatCard
          title="New Farmers"
          value={newFarmers.toString()}
          subValue="Recent additions"
          trend="↑"
          trendDirection="up"
          pulseColor="green"
          icon={Users}
        />
      </div>

      {/* Two Column: Decision Feed + Right Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Decision Feed */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <CardTitle>CEO Co-Pilot — Decision Feed</CardTitle>
              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                7 Active
              </span>
            </div>
            <select className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-500 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
              <option>All Alerts</option><option>Critical</option><option>Financial</option>
            </select>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="font-semibold text-red-900 text-sm">₹82,000 overdue from 11 farmers — oldest 45 days</div>
                  <div className="text-xs text-red-700 mt-1">Collections at risk. Moderator Suresh assigned to Sikandrabad cluster needs to prioritize collection visits.</div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setActiveSection('farmers')} className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-md font-medium hover:bg-red-700 transition-colors shadow-sm">View Defaulters</button>
                    <button
                      onClick={() => toast({ message: 'SMS reminders sent to defaulters', variant: 'success' })}
                      className="bg-white border border-red-200 text-red-700 text-xs px-3 py-1.5 rounded-md font-medium hover:bg-red-50 transition-colors"
                    >
                      Send SMS Reminder
                    </button>
                  </div>
                </div>
                <span className="text-red-400 text-xs shrink-0 font-medium">10:42 AM</span>
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="font-semibold text-amber-900 text-sm">AGM must be conducted within 42 days — prepare agenda</div>
                  <div className="text-xs text-amber-700 mt-1">Companies Act compliance requires AGM within 6 months of financial year end. Board notice required 21 days in advance.</div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setActiveSection('compliance')} className="bg-amber-500 text-white text-xs px-3 py-1.5 rounded-md font-medium hover:bg-amber-600 transition-colors shadow-sm">Generate Agenda Template</button>
                    <button
                      onClick={() => toast({ message: 'AGM date updated', variant: 'success' })}
                      className="bg-white border border-amber-200 text-amber-700 text-xs px-3 py-1.5 rounded-md font-medium hover:bg-amber-50 transition-colors"
                    >
                      Set Date
                    </button>
                  </div>
                </div>
                <span className="text-amber-400 text-xs shrink-0 font-medium">9:15 AM</span>
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-4">
              <div className="font-semibold text-emerald-900 text-sm">Buyer Agri Corp placed new bid: ₹2,400/qtl for 200 qtl wheat</div>
              <div className="text-xs text-emerald-700 mt-1">Price is ₹120 above current Agra mandi rate (₹2,280). FPO margin = 5.3%. Recommended: Accept for confirmed lot.</div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => toast({ message: 'Buyer offer accepted', variant: 'success' })}
                  className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-md font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => toast({ message: 'Counter-offer sent', variant: 'info' })}
                  className="bg-white border border-emerald-200 text-emerald-700 text-xs px-3 py-1.5 rounded-md font-medium hover:bg-emerald-50 transition-colors"
                >
                  Counter
                </button>
                <button
                  onClick={() => toast({ message: 'Offer rejected', variant: 'warning' })}
                  className="bg-white border border-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-md font-medium hover:bg-slate-50 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right: Weather, Credit Score, Compliance + Mandi Ticker */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CloudSun className="h-4 w-4 text-sky-500" />
                <CardTitle className="text-sm">Local Weather (Agra)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-slate-800">{mockWeather[0].tempMax}°</div>
                  <div className="text-sm text-slate-500">{mockWeather[0].condition}</div>
                </div>
                <div className="text-right text-xs text-slate-500 space-y-1">
                  <div>Humidity: {mockWeather[0].humidity}%</div>
                  <div>Wind: {mockWeather[0].windSpeed} km/h</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                {mockWeather.slice(1, 4).map((day, i) => (
                  <div key={i}>
                    <div className="text-slate-500 mb-1">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className="font-semibold">{day.tempMax}°</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FPO Credit Score */}
          <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-indigo-800 font-medium text-sm mb-1">
                  <ShieldCheck size={16} /> K2 Credit Score
                </div>
                <div className="text-xs text-slate-600">Based on transaction history</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-700">785</div>
                <div className="text-[10px] font-medium text-emerald-600">Excellent risk profile</div>
              </div>
            </CardContent>
          </Card>

          {/* Mandi Ticker */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  Live Mandi Prices
                </CardTitle>
                <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">Updated 7:30 AM</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Wheat (Agra)', price: '₹2,280', trend: '↑ 3.2%', trendUp: true },
                { name: 'Mustard (Bharatpur)', price: '₹5,050', trend: '↓ 1.1%', trendUp: false },
                { name: 'Potato (Agra)', price: '₹1,420', trend: '↑ 8.5%', trendUp: true },
                { name: 'Tomato (Agra) 🔥', price: '₹3,200', trend: '↑ 18.2%', trendUp: true },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                  <span className="text-slate-600 font-medium">{item.name}</span>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{item.price}</div>
                    <div className={`text-[10px] font-medium ${item.trendUp ? 'text-emerald-600' : 'text-red-500'}`}>{item.trend}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Compliance Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Compliance Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'AGM 2024', status: 'Done', color: 'green', icon: CheckCircle },
                { label: 'NABARD MIS Q2', status: '12 days', color: 'yellow', icon: Clock },
                { label: 'ROC Annual Filing', status: 'Done', color: 'green', icon: CheckCircle },
                { label: 'GST Return', status: '8 days', color: 'red', icon: AlertCircle },
                { label: 'Statutory Audit', status: '45 days', color: 'yellow', icon: Clock },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <item.icon className={`h-3.5 w-3.5 ${item.color === 'green' ? 'text-emerald-500' :
                      item.color === 'yellow' ? 'text-amber-500' : 'text-red-500'
                      }`} />
                    {item.label}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${item.color === 'green' ? 'bg-emerald-50 text-emerald-700' :
                    item.color === 'yellow' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                    }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Farmer Pipeline + Financial Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Farmer Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-1 mb-6 overflow-x-auto pb-2">
              {[
                { label: 'Registered', value: '1,200', active: false },
                { label: 'KYC Done', value: '1,050', active: false },
                { label: 'Active', value: '847', active: true },
                { label: 'Transacting', value: '623', active: false },
              ].map((stage, i, arr) => (
                <React.Fragment key={i}>
                  <div className={`flex-1 min-w-[80px] text-center p-3 rounded-lg border ${stage.active ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'}`}>
                    <div className={`text-lg font-bold ${stage.active ? 'text-emerald-700' : 'text-slate-700'}`}>{stage.value}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-1">{stage.label}</div>
                  </div>
                  {i < arr.length - 1 && <div className="text-slate-300">→</div>}
                </React.Fragment>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span className="font-bold text-slate-900">623</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Active</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                  <span className="font-bold text-slate-900">142</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Dormant</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  <span className="font-bold text-slate-900">82</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Inactive</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-3 rounded-lg border border-emerald-100 bg-emerald-50/30 text-center">
                <div className="text-xs text-slate-500 mb-1">Receivables</div>
                <div className="font-bold text-slate-900">₹8.4L</div>
                <div className="text-[10px] text-red-600 mt-1 font-medium">₹1.2L overdue</div>
              </div>
              <div className="p-3 rounded-lg border border-amber-100 bg-amber-50/30 text-center">
                <div className="text-xs text-slate-500 mb-1">Payables</div>
                <div className="font-bold text-slate-900">₹5.1L</div>
                <div className="text-[10px] text-amber-600 mt-1 font-medium">₹0.4L overdue</div>
              </div>
              <div className="p-3 rounded-lg border border-emerald-100 bg-emerald-50/30 text-center">
                <div className="text-xs text-slate-500 mb-1">Net Working Capital</div>
                <div className="font-bold text-emerald-700">₹3.3L</div>
                <div className="text-[10px] text-emerald-600 mt-1 font-medium">↑ 12% MoM</div>
              </div>
            </div>
            <div className="h-24 w-full">
              <Bar data={cashflowData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Moderator Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Moderator Performance — January 2025</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium text-slate-500">Moderator</th>
                  <th className="px-6 py-3 font-medium text-slate-500">Farmers</th>
                  <th className="px-6 py-3 font-medium text-slate-500">Visits</th>
                  <th className="px-6 py-3 font-medium text-slate-500">Advisory Sent</th>
                  <th className="px-6 py-3 font-medium text-slate-500">Collections</th>
                  <th className="px-6 py-3 font-medium text-slate-500">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Suresh Kumar</td>
                  <td className="px-6 py-4 text-slate-600">47</td>
                  <td className="px-6 py-4 text-slate-600">32</td>
                  <td className="px-6 py-4 text-slate-600">18</td>
                  <td className="px-6 py-4 text-slate-600">₹42,000</td>
                  <td className="px-6 py-4"><span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">85/100</span></td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Priya Singh</td>
                  <td className="px-6 py-4 text-slate-600">52</td>
                  <td className="px-6 py-4 text-slate-600">28</td>
                  <td className="px-6 py-4 text-slate-600">22</td>
                  <td className="px-6 py-4 text-slate-600">₹38,000</td>
                  <td className="px-6 py-4"><span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">78/100</span></td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">Rajesh Pal <AlertCircle className="h-3 w-3 text-amber-500" /></td>
                  <td className="px-6 py-4 text-slate-600">43</td>
                  <td className="px-6 py-4 text-slate-600">15</td>
                  <td className="px-6 py-4 text-slate-600">8</td>
                  <td className="px-6 py-4 text-slate-600">₹12,000</td>
                  <td className="px-6 py-4"><span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">45/100</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
