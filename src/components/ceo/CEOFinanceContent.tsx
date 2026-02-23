import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { StatCard } from '../ui/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { useAdminStore } from '../../store/AdminStore';

export default function CEOFinanceContent() {
  const { state } = useAdminStore();

  const totalRevenue = state.payments.filter(p => p.type === 'Inbound' && p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
  const totalExpenses = state.payments.filter(p => p.type === 'Outbound').reduce((sum, p) => sum + p.amount, 0);
  const netSurplus = totalRevenue - totalExpenses;

  const financeData: ChartData<'line'> = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [
      { label: 'Revenue', data: [12, 15, 18, 22, 24, 28, 32, 35, 38, 42], borderColor: '#10b981', tension: 0.4, pointRadius: 2 },
      { label: 'Expenses', data: [10, 12, 14, 18, 20, 22, 25, 28, 30, 32], borderColor: '#ef4444', tension: 0.4, pointRadius: 2 }
    ]
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top', align: 'end', labels: { boxWidth: 10, usePointStyle: true } } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#64748b' } },
      y: { ticks: { font: { size: 10 }, color: '#64748b' }, grid: { color: '#f1f5f9' } }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Financial Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue (YTD)"
          value={`₹${(totalRevenue / 100000).toFixed(2)}L`}
          trend="Recorded Inbound"
          trendDirection="up"
          pulseColor="green"
          icon={DollarSign}
        />
        <StatCard
          title="Total Expenses (YTD)"
          value={`₹${(totalExpenses / 100000).toFixed(2)}L`}
          trend="Recorded Outbound"
          trendDirection="neutral"
          pulseColor="yellow"
          icon={TrendingDown}
        />
        <StatCard
          title="Net Surplus"
          value={`₹${(netSurplus / 100000).toFixed(2)}L`}
          trend={totalRevenue ? `${((netSurplus / totalRevenue) * 100).toFixed(1)}% Margin` : '0% Margin'}
          trendDirection={netSurplus >= 0 ? "up" : "down"}
          pulseColor="green"
          icon={TrendingUp}
        />
        <StatCard
          title="Grant Utilization"
          value="₹8.5L"
          subValue="of ₹10L sanctioned"
          trend="85% utilized"
          trendDirection="neutral"
          pulseColor="yellow"
          icon={PieChart}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <Line data={financeData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grant & Subsidy Tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-slate-900 text-sm">SFAC Equity Grant</div>
                  <div className="text-xs text-slate-500">Sanctioned: ₹10,00,000</div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Utilized: ₹8,50,000</span>
                  <span>85%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="text-xs text-slate-400 mt-1">Next Tranche: Pending UC submission</div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-slate-900 text-sm">AIF Infrastructure Loan</div>
                  <div className="text-xs text-slate-500">Sanctioned: ₹25,00,000</div>
                </div>
                <Badge variant="warning">Processing</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Disbursed: ₹0</span>
                  <span>0%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="text-xs text-slate-400 mt-1">Status: Bank query on collateral</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
