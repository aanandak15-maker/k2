import React from 'react';
import { Bar, Doughnut, Radar, Line, Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions, Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale, BarElement } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { Activity, TrendingUp, Users, Sprout, CreditCard, ShoppingBag, Landmark, Download } from 'lucide-react';
import { useAdminStore } from '../../store/AdminStore';
import { useToast } from '../../hooks/useToast';

// Register Chart.js components
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale
);

export default function CEOAnalyticsContent() {
  const { state } = useAdminStore();
  const { toast } = useToast();

  const handleExport = () => {
    toast({ message: 'Compiling 13-chart analytics report to PDF...', variant: 'info' });
  };

  // --- Dynamic Data Calculation ---
  const inputSales = state.payments.filter(p => p.purpose === 'Input Sales' && p.status === 'Completed').reduce((acc, p) => acc + p.amount, 0) / 100000;
  const cropSales = state.payments.filter(p => p.purpose === 'Crop Procurement' && p.status === 'Completed').reduce((acc, p) => acc + p.amount, 0) / 100000;

  const wheatCount = state.farmers.filter(f => f.crops.includes('Wheat')).length;
  const mustardCount = state.farmers.filter(f => f.crops.includes('Mustard')).length;
  const paddyCount = state.farmers.filter(f => f.crops.includes('Paddy')).length;
  const vegCount = state.farmers.filter(f => f.crops.includes('Vegetables')).length;
  const otherCount = state.farmers.length - (wheatCount + mustardCount + paddyCount + vegCount);


  // --- 1. Farmer Onboarding Trend (Bar) ---
  const farmerGrowthData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{ label: 'New Farmers', data: [12, 19, 15, 25, 32, 28, 45, 52, 48, 60, 65, 72], backgroundColor: '#10b981', borderRadius: 4 }]
  };

  // --- 2. Revenue Trend by Source (Stacked Bar) ---
  const revenueSourceData: ChartData<'bar'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      { label: 'Outputs (Crop Sales)', data: [12.5, 14.2, 8.5, 18.2], backgroundColor: '#f59e0b', borderRadius: 4 },
      { label: 'Inputs (Fert/Seeds)', data: [4.2, 5.1, 9.4, 3.2], backgroundColor: '#10b981', borderRadius: 4 },
      { label: 'Services', data: [1.1, 1.2, 1.5, 1.8], backgroundColor: '#3b82f6', borderRadius: 4 }
    ]
  };

  // --- 3. Operational Cost vs Surplus (Line) ---
  const costSurplusData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Revenue (₹L)', data: [5.2, 6.1, 8.5, 4.2, 7.8, 9.5], borderColor: '#10b981', backgroundColor: '#10b981', tension: 0.4 },
      { label: 'OpEx (₹L)', data: [4.0, 4.2, 5.5, 3.8, 4.9, 5.2], borderColor: '#ef4444', backgroundColor: '#ef4444', tension: 0.4 },
      { label: 'Net Surplus', data: [1.2, 1.9, 3.0, 0.4, 2.9, 4.3], borderColor: '#3b82f6', backgroundColor: '#3b82f6', borderDash: [5, 5] }
    ]
  };

  // --- 4. Crop Distribution (Doughnut) ---
  const cropDistributionData: ChartData<'doughnut'> = {
    labels: ['Wheat', 'Mustard', 'Paddy', 'Vegetables', 'Others'],
    datasets: [{ data: [wheatCount, mustardCount, paddyCount, vegCount, Math.max(0, otherCount)], backgroundColor: ['#f59e0b', '#eab308', '#84cc16', '#10b981', '#cbd5e1'], borderWidth: 0 }]
  };

  // --- 5. Farmer Demographics by Age (Doughnut) ---
  const ageDemographicsData: ChartData<'doughnut'> = {
    labels: ['18-30 yrs', '31-45 yrs', '46-60 yrs', '60+ yrs'],
    datasets: [{ data: [15, 42, 33, 10], backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#64748b'], borderWidth: 0 }]
  };

  // --- 6. Gender Ratio (Pie) ---
  const genderRatioData: ChartData<'pie'> = {
    labels: ['Male', 'Female', 'Joint Holding'],
    datasets: [{ data: [78, 18, 4], backgroundColor: ['#1e40af', '#ec4899', '#8b5cf6'], borderWidth: 0 }]
  };

  // --- 7. FPO Credit Score (Radar) ---
  const creditScoreData: ChartData<'radar'> = {
    labels: ['Governance', 'Financial Health', 'Operations', 'Market Linkage', 'Compliance'],
    datasets: [
      { label: 'K2 Target Score', data: [90, 85, 95, 80, 100], borderColor: '#94a3b8', borderDash: [5, 5], backgroundColor: 'transparent', pointRadius: 0 },
      { label: 'Current FPO Score', data: [85, 72, 90, 65, 95], borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.3)', pointBackgroundColor: '#10b981' }
    ]
  };

  // --- 8. Input Consumption Trend (Grouped Bar) ---
  const inputConsumptionData: ChartData<'bar'> = {
    labels: ['Urea', 'DAP', 'Seeds', 'Pesticides'],
    datasets: [
      { label: 'Last Year (MT)', data: [120, 80, 45, 30], backgroundColor: '#cbd5e1', borderRadius: 4 },
      { label: 'This Year (MT)', data: [135, 92, 51, 34], backgroundColor: '#3b82f6', borderRadius: 4 }
    ]
  };

  // --- 9. Output Sales Volume by Crop (Bar) ---
  const outputSalesData: ChartData<'bar'> = {
    labels: ['Wheat', 'Mustard', 'Paddy', 'Potato'],
    datasets: [{ label: 'Procured Volume (MT)', data: [450, 120, 380, 210], backgroundColor: '#f59e0b', borderRadius: 4 }]
  };

  // --- 10. Member Retention / Churn (Bar) ---
  const retentionData: ChartData<'bar'> = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      { label: 'Active Members', data: [250, 410, 580, 820, 1050], backgroundColor: '#10b981' },
      { label: 'Dormant/Churned', data: [12, 28, 45, 62, 85], backgroundColor: '#ef4444' }
    ]
  };

  // --- 11. Repayment vs Default Ratio (Doughnut) ---
  const repaymentData: ChartData<'doughnut'> = {
    labels: ['On-Time Repayment', 'Late Repayment (<30d)', 'Default / Bad Debt'],
    datasets: [{ data: [82, 14, 4], backgroundColor: ['#10b981', '#f59e0b', '#ef4444'], borderWidth: 0 }]
  };

  // --- 12. Landholding Distribution (Bar) ---
  const landholdingData: ChartData<'bar'> = {
    labels: ['Marginal (<1 Ha)', 'Small (1-2 Ha)', 'Medium (2-4 Ha)', 'Large (>4 Ha)'],
    datasets: [{ label: '% of Total Farmers', data: [65, 22, 10, 3], backgroundColor: '#8b5cf6', borderRadius: 4 }]
  };

  // --- 13. Meeting Attendance Trend (Line) ---
  const attendanceData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May (AGM)'],
    datasets: [{ label: 'Attendance %', data: [45, 52, 48, 55, 88], fill: true, backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3b82f6', tension: 0.3 }]
  };


  // --- Common Options ---
  const barOptions: ChartOptions<'bar'> = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false }, ticks: { font: { size: 10 } } }, y: { ticks: { font: { size: 10 } }, grid: { color: '#f1f5f9' } } }
  };

  const stackedBarOptions: ChartOptions<'bar'> = {
    ...barOptions,
    plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } },
    scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, grid: { color: '#f1f5f9' } } }
  };

  const lineOptions: ChartOptions<'line'> = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } },
    scales: { x: { grid: { display: false } }, y: { grid: { color: '#f1f5f9' } } }
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'right', labels: { boxWidth: 10, usePointStyle: true, font: { size: 10 } } } }
  };

  const pieOptions: ChartOptions<'pie'> = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'right', labels: { boxWidth: 10, usePointStyle: true, font: { size: 10 } } } }
  };

  const radarOptions: ChartOptions<'radar'> = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, usePointStyle: true, font: { size: 10 } } } },
    scales: { r: { ticks: { display: false }, grid: { color: '#e2e8f0' } } }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">CEO Analytics & Intelligence</h2>
          <p className="text-sm text-slate-500">13-Dimensional deep dive into operations, finance, and organizational health.</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          <Download className="h-4 w-4" /> Export Full Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Keeping original KPI cards for continuity */}
        <StatCard title="Total Surplus (YTD)" value={`₹${(12.4).toLocaleString()}L`} trend="+4.2%" trendDirection="up" pulseColor="green" icon={Landmark} />
        <StatCard title="Revenue per Farmer" value="₹4,250" trend="↑ ₹320" trendDirection="up" pulseColor="green" icon={TrendingUp} />
        <StatCard title="Input Sales Growth" value="+18%" trend="This Season" trendDirection="up" pulseColor="green" icon={ShoppingBag} />
        <StatCard title="Credit Utilization" value="65%" trend="Healthy" trendDirection="neutral" pulseColor="green" icon={CreditCard} />
      </div>

      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mt-8">1. Financial Performance</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="text-sm text-slate-600 uppercase">Operational Cost vs Surplus Trend</CardTitle></CardHeader><CardContent><div className="h-64 w-full"><Line data={costSurplusData} options={lineOptions} /></div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm text-slate-600 uppercase">Revenue Composition (Stacked)</CardTitle></CardHeader><CardContent><div className="h-64 w-full"><Bar data={revenueSourceData} options={stackedBarOptions} /></div></CardContent></Card>
      </div>

      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mt-8">2. Operational Velocity</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="text-sm text-slate-600 uppercase">Input Consumption Trend Year-over-Year</CardTitle></CardHeader><CardContent><div className="h-64 w-full"><Bar data={inputConsumptionData} options={{ ...barOptions, plugins: { legend: { display: true, position: 'bottom' } } }} /></div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm text-slate-600 uppercase">Aggregated Output Volume by Crop</CardTitle></CardHeader><CardContent><div className="h-64 w-full"><Bar data={outputSalesData} options={barOptions} /></div></CardContent></Card>
      </div>

      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mt-8">3. Organizational Health & Governance</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card><CardHeader><CardTitle className="text-sm text-slate-600 uppercase">FPO Credit & Risk Score</CardTitle></CardHeader><CardContent><div className="h-64 w-full"><Radar data={creditScoreData} options={radarOptions} /></div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm text-slate-600 uppercase">Farmer Retention & Churn</CardTitle></CardHeader><CardContent><div className="h-64 w-full"><Bar data={retentionData} options={stackedBarOptions} /></div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm text-slate-600 uppercase">Repayment Integrity Ratio</CardTitle></CardHeader><CardContent><div className="h-64 w-full"><Doughnut data={repaymentData} options={doughnutOptions} /></div></CardContent></Card>
        <Card className="lg:col-span-3"><CardHeader><CardTitle className="text-sm text-slate-600 uppercase">General Body Meeting Attendance</CardTitle></CardHeader><CardContent><div className="h-48 w-full"><Line data={attendanceData} options={lineOptions} /></div></CardContent></Card>
      </div>

      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mt-8">4. Farmer Demographics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card><CardHeader><CardTitle className="text-xs text-slate-600 uppercase truncate">Primary Crop Distribution</CardTitle></CardHeader><CardContent><div className="h-48 w-full"><Doughnut data={cropDistributionData} options={{ ...doughnutOptions, plugins: { legend: { position: 'bottom', labels: { boxWidth: 8, font: { size: 9 } } } } }} /></div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-xs text-slate-600 uppercase truncate">Age Demographics</CardTitle></CardHeader><CardContent><div className="h-48 w-full"><Doughnut data={ageDemographicsData} options={{ ...doughnutOptions, plugins: { legend: { position: 'bottom', labels: { boxWidth: 8, font: { size: 9 } } } } }} /></div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-xs text-slate-600 uppercase truncate">Gender Parity</CardTitle></CardHeader><CardContent><div className="h-48 w-full"><Pie data={genderRatioData} options={{ ...pieOptions, plugins: { legend: { position: 'bottom', labels: { boxWidth: 8, font: { size: 9 } } } } }} /></div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-xs text-slate-600 uppercase truncate">Landholding Classes</CardTitle></CardHeader><CardContent><div className="h-48 w-full pt-4"><Bar data={landholdingData} options={{ ...barOptions, indexAxis: 'y' }} /></div></CardContent></Card>
      </div>

    </div>
  );
}
