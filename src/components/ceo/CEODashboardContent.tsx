import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions, Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { StatCard } from '../ui/StatCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { AlertCircle, CheckCircle, Clock, TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Activity, CloudSun, ShieldCheck, PieChart, BarChart3, Truck, Package, Banknote, Landmark } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { mockWeather } from '../../data/mock/weather';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

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
      y: { ticks: { font: { size: 10 }, color: '#64748b' }, grid: { color: '#f1f5f9' }, beginAtZero: true }
    }
  };

  // Farmer Distribution Data
  const clusterCounts = state.farmers.reduce((acc, f) => {
    acc[f.cluster] = (acc[f.cluster] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const clusterData: ChartData<'bar'> = {
    labels: Object.keys(clusterCounts),
    datasets: [{
      label: 'Farmers by Cluster',
      data: Object.values(clusterCounts),
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
      borderRadius: 4
    }]
  };

  const barOptions: ChartOptions<'bar'> = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { padding: 10 } },
    scales: {
      x: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } },
      y: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  };

  const wheatCount = state.farmers.filter(f => f.crops.includes('Wheat')).length;
  const mustardCount = state.farmers.filter(f => f.crops.includes('Mustard')).length;
  const paddyCount = state.farmers.filter(f => f.crops.includes('Paddy')).length;
  const vegCount = state.farmers.filter(f => f.crops.includes('Vegetables') || f.crops.includes('Potato') || f.crops.includes('Tomato')).length;
  const otherCount = state.farmers.length - (wheatCount + mustardCount + paddyCount + vegCount);

  const cropData: ChartData<'doughnut'> = {
    labels: ['Wheat', 'Mustard', 'Paddy', 'Vegetables', 'Others'],
    datasets: [{
      data: [wheatCount, mustardCount, paddyCount, vegCount, Math.max(0, otherCount)],
      backgroundColor: ['#f59e0b', '#eab308', '#84cc16', '#10b981', '#cbd5e1'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: { legend: { position: 'right', labels: { boxWidth: 10, usePointStyle: true, font: { size: 11 } } } }
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
            <select className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-500 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20">
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

            <div className="rounded-lg border-l-4 border-[var(--brand)] bg-[var(--brand-wash)] p-4">
              <div className="font-semibold text-emerald-900 text-sm">Buyer Agri Corp placed new bid: ₹2,400/qtl for 200 qtl wheat</div>
              <div className="text-xs text-[var(--brand)] mt-1">Price is ₹120 above current Agra mandi rate (₹2,280). FPO margin = 5.3%. Recommended: Accept for confirmed lot.</div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => toast({ message: 'Buyer offer accepted', variant: 'success' })}
                  className="bg-[var(--brand)] text-white text-xs px-3 py-1.5 rounded-md font-medium hover:bg-[var(--brand-light)] transition-colors shadow-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => toast({ message: 'Counter-offer sent', variant: 'info' })}
                  className="bg-white border border-[var(--brand-muted)] text-[var(--brand)] text-xs px-3 py-1.5 rounded-md font-medium hover:bg-[var(--brand-wash)] transition-colors"
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
                <div className="text-[10px] font-medium text-[var(--brand)]">Excellent risk profile</div>
              </div>
            </CardContent>
          </Card>

          {/* Mandi Ticker */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-[var(--brand)]" />
                  Live Mandi Prices
                </CardTitle>
                <span className="text-[10px] text-[var(--brand)] font-medium bg-[var(--brand-wash)] px-2 py-0.5 rounded-full">Updated 7:30 AM</span>
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
                    <div className={`text-[10px] font-medium ${item.trendUp ? 'text-[var(--brand)]' : 'text-red-500'}`}>{item.trend}</div>
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
                    <item.icon className={`h-3.5 w-3.5 ${item.color === 'green' ? 'text-[var(--brand)]' :
                      item.color === 'yellow' ? 'text-amber-500' : 'text-red-500'
                      }`} />
                    {item.label}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${item.color === 'green' ? 'bg-[var(--brand-wash)] text-[var(--brand)]' :
                    item.color === 'yellow' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                    }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Scheme Tracker */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-indigo-500" />
                <CardTitle className="text-sm">Govt. Scheme Saturation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'PM-KISAN Samman Nidhi', eligible: 840, enrolled: 795, color: 'bg-[var(--brand)]' },
                { name: 'Soil Health Card', eligible: 1200, enrolled: 450, color: 'bg-amber-500' },
                { name: 'PMFBY (Crop Insurance)', eligible: 950, enrolled: 320, color: 'bg-indigo-500' }
              ].map((scheme, i) => {
                const percent = Math.round((scheme.enrolled / scheme.eligible) * 100);
                return (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-xs font-medium text-slate-700">{scheme.name}</span>
                      <span className="text-[10px] font-bold text-slate-900">{percent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${scheme.color}`} style={{ width: `${percent}%` }}></div>
                    </div>
                    <div className="text-[9px] text-slate-500 mt-1 flex justify-between">
                      <span>{scheme.enrolled} Enrolled</span>
                      <span>Target: {scheme.eligible}</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Row 4: Operations Snapshot Visual Pipelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Supply Pipeline */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2"><ShoppingCart className="h-5 w-5 text-indigo-600" /> Input Supply Pipeline</CardTitle>
            <CardDescription>Flow of fertilizer, seeds, and pesticides</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Demand Collected', count: 312, meta: '₹14.2L', active: false },
                { label: 'POs Raised', count: 8, meta: '₹12.5L', active: false },
                { label: 'In Transit', count: 3, meta: 'Expected by Friday', active: true, highlight: 'indigo' },
                { label: 'At Warehouse', count: 1250, meta: 'Items in Stock', active: false },
                { label: 'Distributed', count: 480, meta: 'To 145 farmers', active: false },
              ].map((stage, i, arr) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-36 text-right text-xs font-semibold ${stage.active ? 'text-indigo-700' : 'text-slate-600'}`}>
                    {stage.label}
                  </div>
                  <div className="relative flex items-center justify-center h-8 w-8 shrink-0">
                    {i !== arr.length - 1 && (
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-200"></div>
                    )}
                    <div className={`h-4 w-4 rounded-full border-2 z-10 ${stage.active ? 'border-indigo-600 bg-indigo-100 ring-4 ring-indigo-50' : 'border-slate-300 bg-white'}`}></div>
                  </div>
                  <div className={`flex-1 flex justify-between items-center p-3 rounded-lg border ${stage.active ? 'bg-indigo-50/50 border-indigo-100 shadow-sm' : 'bg-slate-50/50 border-slate-100'}`}>
                    <span className="font-bold text-slate-800">{stage.count}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{stage.meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Output/Sales Pipeline */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5 text-amber-600" /> Output Sales Pipeline</CardTitle>
            <CardDescription>Flow of procured harvest to buyers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Committed', count: '4,200 Qtl', meta: 'Wheat & Mustard', active: false },
                { label: 'QC Passed', count: '3,850 Qtl', meta: 'Grade A & B', active: false },
                { label: 'Buyer Matched', count: '3 Contracts', meta: 'Avg: ₹2,350/Qtl', active: true, highlight: 'amber' },
                { label: 'Dispatched', count: '1,200 Qtl', meta: '2 Trucks active', active: false },
                { label: 'Paid', count: '₹12.4L', meta: 'Received this week', active: false },
              ].map((stage, i, arr) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-36 text-right text-xs font-semibold ${stage.active ? 'text-amber-700' : 'text-slate-600'}`}>
                    {stage.label}
                  </div>
                  <div className="relative flex items-center justify-center h-8 w-8 shrink-0">
                    {i !== arr.length - 1 && (
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-200"></div>
                    )}
                    <div className={`h-4 w-4 rounded-full border-2 z-10 ${stage.active ? 'border-amber-600 bg-amber-100 ring-4 ring-amber-50' : 'border-slate-300 bg-white'}`}></div>
                  </div>
                  <div className={`flex-1 flex justify-between items-center p-3 rounded-lg border ${stage.active ? 'bg-amber-50/50 border-amber-100 shadow-sm' : 'bg-slate-50/50 border-slate-100'}`}>
                    <span className="font-bold text-slate-800">{stage.count}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{stage.meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 5: Financial Strip */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow - Last 8 Weeks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-3 rounded-lg border border-[var(--brand-pale)] bg-[var(--brand-wash)]/30 text-center">
              <div className="text-xs text-slate-500 mb-1 flex items-center justify-center gap-1"><Banknote className="h-3 w-3" /> Receivables</div>
              <div className="text-xl font-bold text-slate-900">₹8.4L</div>
              <div className="text-[10px] text-red-600 mt-1 font-medium">₹1.2L overdue</div>
            </div>
            <div className="p-3 rounded-lg border border-amber-100 bg-amber-50/30 text-center">
              <div className="text-xs text-slate-500 mb-1 flex items-center justify-center gap-1"><Package className="h-3 w-3" /> Payables</div>
              <div className="text-xl font-bold text-slate-900">₹5.1L</div>
              <div className="text-[10px] text-amber-600 mt-1 font-medium">₹0.4L overdue</div>
            </div>
            <div className="p-3 rounded-lg border border-indigo-100 bg-indigo-50/30 text-center">
              <div className="text-xs text-slate-500 mb-1 flex items-center justify-center gap-1"><Activity className="h-3 w-3" /> Net Working Capital</div>
              <div className="text-xl font-bold text-indigo-700">₹3.3L</div>
              <div className="text-[10px] text-indigo-600 mt-1 font-medium">↑ 12% MoM</div>
            </div>
          </div>
          <div className="h-48 w-full mt-4">
            <Bar data={cashflowData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Moderator Performance */}
      < Card >
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
                  <td className="px-6 py-4"><span className="inline-flex items-center rounded-full bg-[var(--brand-wash)] px-2 py-1 text-xs font-medium text-[var(--brand)] ring-1 ring-inset ring-emerald-600/20">85/100</span></td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Priya Singh</td>
                  <td className="px-6 py-4 text-slate-600">52</td>
                  <td className="px-6 py-4 text-slate-600">28</td>
                  <td className="px-6 py-4 text-slate-600">22</td>
                  <td className="px-6 py-4 text-slate-600">₹38,000</td>
                  <td className="px-6 py-4"><span className="inline-flex items-center rounded-full bg-[var(--brand-wash)] px-2 py-1 text-xs font-medium text-[var(--brand)] ring-1 ring-inset ring-emerald-600/20">78/100</span></td>
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
      </Card >
    </div >
  );
}
