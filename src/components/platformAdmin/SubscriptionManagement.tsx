import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { StatCard } from '../ui/StatCard';
import { TrendingUp, CreditCard, Clock, AlertCircle, Building2 } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { useToast } from '../../hooks/useToast';

// Mock Subscription Data
const mockSubscriptions = [
    { id: 'SUB-101', fpo: 'Kissan Agro Producer Co.', plan: 'Enterprise', status: 'Active', mrr: 15000, renewalDate: '2025-12-15', farmers: 4500 },
    { id: 'SUB-102', fpo: 'Green Valley FPC', plan: 'Growth', status: 'Active', mrr: 5000, renewalDate: '2025-08-22', farmers: 1800 },
    { id: 'SUB-103', fpo: 'Sunrise Organics', plan: 'Starter', status: 'Past Due', mrr: 2500, renewalDate: '2025-02-10', farmers: 350 },
    { id: 'SUB-104', fpo: 'BlueSky Farmers Co.', plan: 'Enterprise', status: 'Active', mrr: 20000, renewalDate: '2026-01-05', farmers: 8200 },
    { id: 'SUB-105', fpo: 'Vindhya Agri Producers', plan: 'Growth', status: 'Active', mrr: 5000, renewalDate: '2025-09-30', farmers: 1200 },
    { id: 'SUB-106', fpo: 'Narmada Valley FPC', plan: 'Starter', status: 'Cancelled', mrr: 0, renewalDate: '2024-11-15', farmers: 410 },
];

export default function SubscriptionManagement() {
    const { toast } = useToast();
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [planFilter, setPlanFilter] = useState('All Plans');
    // Analytics Mock Data
    const mrrData = {
        labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        datasets: [
            {
                label: 'Monthly Recurring Revenue (₹)',
                data: [120000, 135000, 142000, 158000, 175000, 195000],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.3,
                fill: true,
            }
        ]
    };

    const filteredSubscriptions = mockSubscriptions.filter(sub =>
        (statusFilter === 'All Statuses' || sub.status === statusFilter) &&
        (planFilter === 'All Plans' || sub.plan === planFilter)
    );

    const handleReminders = () => {
        toast({ message: `Renewal reminders sent to ${mockSubscriptions.filter(s => s.status === 'Past Due' || s.status === 'Active').length} FPOs`, variant: 'success' });
    }

    const columns = [
        { header: 'Subscription ID', key: 'id' as const },
        { header: 'FPO Name', key: 'fpo' as const },
        {
            header: 'Plan',
            key: 'plan' as const,
            render: (row: any) => (
                <Badge variant={row.plan === 'Enterprise' ? 'default' : row.plan === 'Growth' ? 'success' : 'outline'} className="text-[10px]">
                    {row.plan}
                </Badge>
            )
        },
        {
            header: 'Status',
            key: 'status' as const,
            render: (row: any) => (
                <Badge variant={row.status === 'Active' ? 'success' : row.status === 'Past Due' ? 'warning' : 'destructive'} className="text-[10px]">
                    {row.status}
                </Badge>
            )
        },
        {
            header: 'MRR',
            key: 'mrr' as const,
            render: (row: any) => <span className="font-medium text-slate-700">₹{row.mrr.toLocaleString()}</span>
        },
        { header: 'Active Farmers', key: 'farmers' as const },
        { header: 'Renewal Date', key: 'renewalDate' as const },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    title="Total Annual Run Rate (ARR)"
                    value="₹23.4M"
                    trend="+15% y/y"
                    trendDirection="up"
                    icon={<TrendingUp size={24} className="text-emerald-600" />}
                />
                <StatCard
                    title="Monthly Recurring Rev (MRR)"
                    value="₹1.95M"
                    trend="+12% m/m"
                    trendDirection="up"
                    icon={<CreditCard size={24} className="text-blue-600" />}
                />
                <StatCard
                    title="Active Subscriptions"
                    value="142"
                    trend="+8 this month"
                    trendDirection="up"
                    icon={<Building2 size={24} className="text-indigo-600" />}
                />
                <StatCard
                    title="Past Due / Churned"
                    value="8"
                    trend="Needs attention"
                    trendDirection="down"
                    icon={<AlertCircle size={24} className="text-red-600" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 shadow-sm border-slate-200">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                        <CardTitle className="text-lg">MRR Growth Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 h-[300px]">
                        <Line
                            data={mrrData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                                    x: { grid: { display: false } }
                                }
                            }}
                        />
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-slate-200">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                        <CardTitle className="text-lg">Plan Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="space-y-4">
                            {[
                                { name: 'Enterprise', count: 42, pct: 30, color: 'bg-emerald-500' },
                                { name: 'Growth', count: 75, pct: 53, color: 'bg-blue-500' },
                                { name: 'Starter', count: 25, pct: 17, color: 'bg-slate-400' },
                            ].map(plan => (
                                <div key={plan.name}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-semibold text-slate-700">{plan.name}</span>
                                        <span className="text-slate-500">{plan.count} FPOs ({plan.pct}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className={`${plan.color} h-2 rounded-full`} style={{ width: `${plan.pct}%` }}></div>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock size={16} className="text-amber-600" />
                                    <h4 className="font-bold text-amber-800 text-sm">Upcoming Renewals</h4>
                                </div>
                                <p className="text-xs text-amber-700 mb-2">12 subscriptions are expiring in the next 30 days. Totalling ₹145,000 in MRR at risk.</p>
                                <button onClick={handleReminders} className="text-xs font-semibold text-amber-700 hover:text-amber-900 underline">Send Renewal Reminders</button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm border-slate-200">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Subscription Roster</CardTitle>
                    <div className="flex gap-2">
                        <select
                            className="border border-slate-200 rounded-lg text-sm px-3 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                        >
                            <option>All Statuses</option>
                            <option>Active</option>
                            <option>Past Due</option>
                            <option>Cancelled</option>
                        </select>
                        <select
                            className="border border-slate-200 rounded-lg text-sm px-3 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            value={planFilter}
                            onChange={e => setPlanFilter(e.target.value)}
                        >
                            <option>All Plans</option>
                            <option>Enterprise</option>
                            <option>Growth</option>
                            <option>Starter</option>
                        </select>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="p-0 overflow-x-auto">
                        <DataTable columns={columns} data={filteredSubscriptions} className="border-0 shadow-none rounded-none" />
                    </div>
                    <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                        <p className="text-sm text-slate-500">Showing {filteredSubscriptions.length} subscriptions</p>
                        <button onClick={handleReminders} className="text-xs font-semibold text-amber-700 hover:text-amber-900 underline">Send Renewal Reminders</button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
