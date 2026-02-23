import React from 'react';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { TrendingUp, Users, Sprout, CreditCard, ShoppingBag } from 'lucide-react';
import { useAdminStore } from '../../store/AdminStore';

export default function CEOAnalyticsContent() {
  const { state } = useAdminStore();

  const farmerGrowthData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{ label: 'New Farmers', data: [12, 19, 15, 25, 32, 28, 45, 52, 48, 60, 65, 72], backgroundColor: '#10b981', borderRadius: 4 }]
  };

  // Compute live revenue
  const inputSales = state.payments.filter(p => p.purpose === 'Input Sales' && p.status === 'Completed').reduce((acc, p) => acc + p.amount, 0) / 100000;
  const cropSales = state.payments.filter(p => p.purpose === 'Crop Procurement' && p.status === 'Completed').reduce((acc, p) => acc + p.amount, 0) / 100000;

  const revenueSourceData: ChartData<'bar'> = {
    labels: ['Outputs (Crop)', 'Inputs', 'Share Capital', 'Services'],
    datasets: [{ label: 'Revenue (₹L)', data: [cropSales, inputSales, 0.45, 0.25], backgroundColor: ['#f59e0b', '#10b981', '#3b82f6', '#84cc16'], borderRadius: 4 }]
  };

  // Compute live crop distribution
  const wheatCount = state.farmers.filter(f => f.crops.includes('Wheat')).length;
  const mustardCount = state.farmers.filter(f => f.crops.includes('Mustard')).length;
  const paddyCount = state.farmers.filter(f => f.crops.includes('Paddy')).length;
  const vegCount = state.farmers.filter(f => f.crops.includes('Vegetables')).length;
  const otherCount = state.farmers.length - (wheatCount + mustardCount + paddyCount + vegCount);

  const cropDistributionData: ChartData<'doughnut'> = {
    labels: ['Wheat', 'Mustard', 'Paddy', 'Vegetables', 'Others'],
    datasets: [{ data: [wheatCount, mustardCount, paddyCount, vegCount, Math.max(0, otherCount)], backgroundColor: ['#f59e0b', '#eab308', '#84cc16', '#10b981', '#cbd5e1'], borderWidth: 0 }]
  };

  const creditScoreData: ChartData<'radar'> = {
    labels: ['Governance', 'Financials', 'Operations', 'Market Linkage', 'Compliance'],
    datasets: [{ label: 'FPO Score', data: [85, 72, 90, 65, 95], borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.2)', pointBackgroundColor: '#10b981' }]
  };

  const inputConsumptionData: ChartData<'bar'> = {
    labels: ['Urea', 'DAP', 'Seeds', 'Pesticides'],
    datasets: [
      { label: 'Last Year', data: [1200, 800, 450, 300], backgroundColor: '#cbd5e1', borderRadius: 4 },
      { label: 'This Year', data: [1350, 920, 510, 340], backgroundColor: '#3b82f6', borderRadius: 4 }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#64748b' } }, y: { ticks: { font: { size: 10 }, color: '#64748b' }, grid: { color: '#f1f5f9' } } }
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right', labels: { boxWidth: 10, usePointStyle: true, font: { size: 11 } } } }
  };

  const radarOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { r: { ticks: { display: false }, grid: { color: '#e2e8f0' }, pointLabels: { font: { size: 11 } } } }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Analytics & Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Farmer Growth Rate"
          value="+12%"
          trend="YoY"
          trendDirection="up"
          pulseColor="green"
          icon={Users}
        />
        <StatCard
          title="Revenue per Farmer"
          value="₹4,250"
          trend="↑ ₹320"
          trendDirection="up"
          pulseColor="green"
          icon={TrendingUp}
        />
        <StatCard
          title="Input Sales Growth"
          value="+18%"
          trend="This Season"
          trendDirection="up"
          pulseColor="green"
          icon={ShoppingBag}
        />
        <StatCard
          title="Credit Utilization"
          value="65%"
          trend="Healthy"
          trendDirection="neutral"
          pulseColor="green"
          icon={CreditCard}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Farmer Onboarding Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <Bar data={farmerGrowthData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <Bar data={revenueSourceData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Crop Distribution (Ha)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <Doughnut data={cropDistributionData} options={doughnutOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FPO Credit Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <Radar data={creditScoreData} options={radarOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <Bar data={inputConsumptionData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
