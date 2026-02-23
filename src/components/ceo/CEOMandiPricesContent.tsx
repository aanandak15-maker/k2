import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { DataTable } from '../ui/DataTable';
import { mockMandiPrices } from '../../data/mock/mandiPrices';
import { TrendingUp, TrendingDown, Minus, Search, Calendar, Download } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { useToast } from '../../hooks/useToast';

export default function CEOMandiPricesContent() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPrices = mockMandiPrices.filter(item =>
        item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mandi.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { key: 'commodity' as const, header: 'Commodity', render: (item: any) => <span className="font-semibold text-slate-800">{item.commodity}</span> },
        { key: 'variety' as const, header: 'Variety', render: (item: any) => <span className="text-slate-600">{item.variety}</span> },
        { key: 'mandi' as const, header: 'Mandi', render: (item: any) => <span className="text-slate-600">{item.mandi}</span> },
        { key: 'modalPrice' as const, header: 'Modal Price (₹/Qtl)', render: (item: any) => <span className="font-bold text-slate-900">₹{item.modalPrice.toLocaleString()}</span> },
        { key: 'minPrice' as const, header: 'Min-Max Price', render: (item: any) => <span className="text-xs text-slate-500">₹{item.minPrice} - ₹{item.maxPrice}</span> },
        {
            key: 'trend' as const, header: 'Trend', render: (item: any) => (
                <div className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full w-fit ${item.trend === 'Up' ? 'text-emerald-700 bg-emerald-50' :
                    item.trend === 'Down' ? 'text-red-700 bg-red-50' : 'text-slate-600 bg-slate-100'
                    }`}>
                    {item.trend === 'Up' ? <TrendingUp size={14} /> : item.trend === 'Down' ? <TrendingDown size={14} /> : <Minus size={14} />}
                    {item.trendPercentage}%
                </div>
            )
        },
        { key: 'date' as const, header: 'Last Updated', render: (item: any) => <span className="text-slate-500 text-xs">{new Date(item.date).toLocaleDateString()}</span> }
    ];

    const chartData = {
        labels: ['1 Feb', '5 Feb', '10 Feb', '15 Feb', '20 Feb', '22 Feb'],
        datasets: [
            {
                label: 'Wheat (Agra)',
                data: [2150, 2180, 2220, 2210, 2250, 2280],
                borderColor: '#10b981',
                tension: 0.4,
            },
            {
                label: 'Mustard (Bharatpur)',
                data: [5100, 5150, 5200, 5120, 5080, 5050],
                borderColor: '#f59e0b',
                tension: 0.4,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' as const }
        },
        scales: {
            y: { border: { dash: [4, 4] }, grid: { color: '#f1f5f9' }, title: { display: true, text: 'Price (₹/Qtl)', font: { size: 10 } } },
            x: { grid: { display: false } }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Commodity Market Analysis</h2>
                    <p className="text-sm text-slate-500 mt-1">Track live mandi prices and historical trends to optimize output sales.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => toast({ message: 'Date range picker coming in v2', variant: 'info' })}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <Calendar size={16} /> Date Range
                    </button>
                    <button
                        onClick={() => toast({ message: 'Mandi price report exported', variant: 'success' })}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Download size={16} /> Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Price Trends (30 Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-emerald-50 border-emerald-100">
                        <CardContent className="p-6">
                            <div className="text-sm font-semibold text-emerald-800 mb-2">Market Intelligence Alert</div>
                            <p className="text-sm text-emerald-700 mb-4">Wheat prices in Agra mandi are trending <strong>5% higher</strong> than last month. Consider liquidating 30% of stored inventory within the next 7 days to capture peak pricing.</p>
                            <button
                                onClick={() => toast({ message: 'Sale order initiated', variant: 'success' })}
                                className="w-full bg-emerald-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                                Initiate Sale Order
                            </button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-slate-500 font-medium">Top Gainers & Losers (24h)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-slate-900">Tomato (Agra)</div>
                                    <div className="text-xs text-slate-500">₹3,200/Qtl</div>
                                </div>
                                <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm bg-emerald-50 px-2.5 py-1 rounded-md">
                                    <TrendingUp size={16} /> +18.2%
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-slate-900">Potato (Agra)</div>
                                    <div className="text-xs text-slate-500">₹1,420/Qtl</div>
                                </div>
                                <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm bg-emerald-50 px-2.5 py-1 rounded-md">
                                    <TrendingUp size={16} /> +8.5%
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-slate-900">Mustard (Bharatpur)</div>
                                    <div className="text-xs text-slate-500">₹5,050/Qtl</div>
                                </div>
                                <div className="flex items-center gap-1 text-red-600 font-bold text-sm bg-red-50 px-2.5 py-1 rounded-md">
                                    <TrendingDown size={16} /> -1.1%
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 gap-4">
                    <CardTitle>Live Mandi Rates</CardTitle>
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search commodity or mandi..."
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <DataTable columns={columns} data={filteredPrices} className="border-0 shadow-none rounded-none" />
                </CardContent>
            </Card>
        </div>
    );
}
