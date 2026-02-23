import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface PlatformDashboardContentProps {
    setActiveSection: (section: string) => void;
}

export default function PlatformDashboardContent({ setActiveSection }: PlatformDashboardContentProps) {
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
        <>
            <div className="grid grid-cols-5 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div className="text-xs font-medium text-slate-500 mb-1">Total FPOs Onboarded</div>
                    <div className="text-2xl font-bold text-slate-900">342</div>
                    <div className="text-xs font-medium text-emerald-600 mt-2 bg-emerald-50 w-fit px-2 py-0.5 rounded-full flex items-center gap-1">↑ 12 this month</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div className="text-xs font-medium text-slate-500 mb-1">Total Farmers</div>
                    <div className="text-2xl font-bold text-slate-900">41,200</div>
                    <div className="text-xs text-slate-500 mt-2">Across all FPOs</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div className="text-xs font-medium text-slate-500 mb-1">Active FPOs (Month)</div>
                    <div className="text-2xl font-bold text-slate-900">298</div>
                    <div className="text-xs text-amber-600 mt-2 bg-amber-50 w-fit px-2 py-0.5 rounded-full">44 inactive</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div className="text-xs font-medium text-slate-500 mb-1">MIS Reports (Quarter)</div>
                    <div className="text-2xl font-bold text-slate-900">1,204</div>
                    <div className="text-xs font-medium text-emerald-600 mt-2 bg-emerald-50 w-fit px-2 py-0.5 rounded-full flex items-center gap-1">↑ 8% vs last qtr</div>
                </div>
                <div
                    className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between cursor-pointer hover:border-indigo-200 transition-colors"
                    onClick={() => setActiveSection('support')}
                >
                    <div className="text-xs font-medium text-slate-500 mb-1">Open Support Tickets</div>
                    <div className="text-2xl font-bold text-red-600">17</div>
                    <div className="text-xs text-red-600 mt-2 bg-red-50 w-fit px-2 py-0.5 rounded-full">3 critical priority</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                            <span className="text-xl">🗺</span> FPO Health Map — India
                        </h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Healthy (70+)
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Attention (40-69)
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Critical (&lt;40)
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 text-center relative overflow-hidden h-72 border border-slate-100">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-8xl opacity-10">🗺</div>
                        </div>
                        {/* Simulate FPO dots on map */}
                        <div className="relative w-full h-full">
                            <div className="absolute top-[30%] left-[38%]"><div className="w-5 h-5 bg-emerald-500 rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-125 transition-transform" title="Uttar Pradesh: 48 FPOs"></div></div>
                            <div className="absolute top-[45%] left-[35%]"><div className="w-4 h-4 bg-emerald-500 rounded-full shadow border-2 border-white cursor-pointer hover:scale-125 transition-transform" title="Rajasthan: 36 FPOs"></div></div>
                            <div className="absolute top-[55%] left-[60%]"><div className="w-5 h-5 bg-emerald-500 rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-125 transition-transform" title="Madhya Pradesh: 44 FPOs"></div></div>
                            <div className="absolute top-[60%] left-[45%]"><div className="w-3.5 h-3.5 bg-amber-400 rounded-full shadow border-2 border-white cursor-pointer hover:scale-125 transition-transform" title="Gujarat: 28 FPOs"></div></div>
                            <div className="absolute top-[70%] left-[50%]"><div className="w-4 h-4 bg-emerald-500 rounded-full shadow border-2 border-white cursor-pointer hover:scale-125 transition-transform" title="Maharashtra: 52 FPOs"></div></div>
                            <div className="absolute top-[75%] left-[62%]"><div className="w-3 h-3 bg-red-500 rounded-full shadow border-2 border-white cursor-pointer hover:scale-125 transition-transform animate-pulse" title="Andhra Pradesh: 18 FPOs (Critical)"></div></div>
                            <div className="absolute top-[80%] left-[45%]"><div className="w-4 h-4 bg-emerald-500 rounded-full shadow border-2 border-white cursor-pointer hover:scale-125 transition-transform" title="Karnataka: 38 FPOs"></div></div>
                            <div className="absolute top-[35%] left-[70%]"><div className="w-4 h-4 bg-amber-400 rounded-full shadow border-2 border-white cursor-pointer hover:scale-125 transition-transform" title="Bihar: 32 FPOs"></div></div>

                            <div className="absolute bottom-2 left-2 text-xs font-medium text-slate-500 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm border border-slate-200">
                                342 FPOs across 18 states
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex-1">
                        <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center justify-between">
                            <span>📋 Activity Feed</span>
                            <button
                                onClick={() => setActiveSection('support')}
                                className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                            >
                                View All
                            </button>
                        </h3>
                        <div className="space-y-4">
                            <div className="relative pl-4 border-l-2 border-emerald-500 pb-4">
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-white" />
                                <p className="text-sm font-medium text-slate-900">New FPO Created</p>
                                <p className="text-sm text-slate-600 mt-0.5">Sitapur FPC Ltd → UP</p>
                                <span className="text-xs text-slate-400 mt-1 block">Platform Admin · 2 min ago</span>
                            </div>
                            <div className="relative pl-4 border-l-2 border-indigo-500 pb-4">
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-white" />
                                <p className="text-sm font-medium text-slate-900">Subscription Renewed</p>
                                <p className="text-sm text-slate-600 mt-0.5">Sikandrabad FPC Ltd → Growth Plan</p>
                                <span className="text-xs text-slate-400 mt-1 block">Auto-payment · 45 min ago</span>
                            </div>
                            <div className="relative pl-4 border-l-2 border-red-500">
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-red-500 ring-4 ring-white" />
                                <p className="text-sm font-medium text-slate-900">Support Ticket Opened</p>
                                <p className="text-sm text-slate-600 mt-0.5">Firozabad FPC · Payment issue</p>
                                <span className="text-xs font-medium text-red-600 mt-1 block">Priority: High · 4 hrs ago</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                        <h3 className="text-base font-semibold text-slate-900 mb-1">Platform Revenue</h3>
                        <p className="text-sm text-slate-500 mb-4">Monthly Recurring Revenue (MRR)</p>
                        <div className="h-24">
                            <Line data={revenueData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
