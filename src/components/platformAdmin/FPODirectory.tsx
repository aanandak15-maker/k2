import React, { useState } from 'react';
import { Search, Plus, Filter, Download } from 'lucide-react';
import { DataTable } from '../ui/DataTable';
import { StatusBadge } from '../ui/StatusBadge';
import { useToast } from '../../hooks/useToast';

export default function FPODirectory({ setActiveSection }: { setActiveSection?: (s: string) => void }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [planFilter, setPlanFilter] = useState('All Plans');
    const [page, setPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { toast } = useToast();

    const mockFPOs = [
        { id: 'FPO-001', name: 'Sikandrabad FPC Ltd', state: 'Uttar Pradesh', ceo: 'Ramesh Kumar', farmers: 1200, score: 82, plan: 'Growth', status: 'Healthy' },
        { id: 'FPO-002', name: 'Mathura Kisan FPC', state: 'Uttar Pradesh', ceo: 'Suresh Sharma', farmers: 856, score: 74, plan: 'Basic', status: 'Healthy' },
        { id: 'FPO-003', name: 'Firozabad FPC Ltd', state: 'Uttar Pradesh', ceo: 'Anita Gupta', farmers: 420, score: 52, plan: 'Basic', status: 'Attention' },
        { id: 'FPO-004', name: 'Rajkot Kisan FPC', state: 'Gujarat', ceo: 'Ramji Patel', farmers: 1540, score: 91, plan: 'Enterprise', status: 'Healthy' },
        { id: 'FPO-005', name: 'Bhopal Agro Producer Co.', state: 'Madhya Pradesh', ceo: 'Manoj Tiwari', farmers: 950, score: 65, plan: 'Growth', status: 'Attention' },
        { id: 'FPO-006', name: 'Pune Farmers Collective', state: 'Maharashtra', ceo: 'Sunil Jadhav', farmers: 2100, score: 88, plan: 'Enterprise', status: 'Healthy' },
        { id: 'FPO-007', name: 'Kurnool Agri Producers', state: 'Andhra Pradesh', ceo: 'V. Reddy', farmers: 310, score: 38, plan: 'Basic', status: 'Critical' },
    ];

    let filteredFPOs = mockFPOs.filter(fpo =>
        (fpo.name.toLowerCase().includes(searchTerm.toLowerCase()) || fpo.state.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'All Statuses' || fpo.status === statusFilter) &&
        (planFilter === 'All Plans' || fpo.plan === planFilter)
    );

    const ITEMS_PER_PAGE = 5;
    const totalPages = Math.ceil(filteredFPOs.length / ITEMS_PER_PAGE);
    const paginatedFPOs = filteredFPOs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handleExport = () => {
        toast({ message: `Exported ${filteredFPOs.length} FPOs to CSV`, variant: 'success' });
    };

    const columns = [
        { key: 'name' as const, header: 'FPO Name', render: (fpo: any) => <span className="font-semibold text-slate-800">{fpo.name}</span> },
        { key: 'state' as const, header: 'State' },
        { key: 'ceo' as const, header: 'CEO' },
        { key: 'farmers' as const, header: 'Farmers', render: (fpo: any) => fpo.farmers.toLocaleString() },
        {
            key: 'score' as const, header: 'Health Score', render: (fpo: any) => (
                <span className={`font-bold ${fpo.score >= 70 ? 'text-emerald-600' : fpo.score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                    {fpo.score}/100
                </span>
            )
        },
        { key: 'plan' as const, header: 'Plan', render: (fpo: any) => <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">{fpo.plan}</span> },
        { key: 'status' as const, header: 'Status', render: (fpo: any) => <StatusBadge status={fpo.status} /> }
    ];

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[60vh]">
            <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search FPOs by name or state..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto relative">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors border rounded-lg ${isFilterOpen ? 'bg-slate-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                    >
                        <Filter size={16} /> Filters
                    </button>

                    {isFilterOpen && (
                        <div className="absolute top-12 left-0 sm:right-auto sm:left-0 lg:right-40 lg:left-auto bg-white border border-slate-200 shadow-xl rounded-xl p-4 w-64 z-20 animate-in fade-in zoom-in-95 duration-200">
                            <h4 className="font-semibold text-sm text-slate-800 mb-3">Filter FPOs</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-1 block">Health Status</label>
                                    <select
                                        className="w-full text-sm border-slate-200 rounded-md focus:ring-emerald-500"
                                        value={statusFilter}
                                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                                    >
                                        <option>All Statuses</option>
                                        <option>Healthy</option>
                                        <option>Attention</option>
                                        <option>Critical</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-1 block">Subscription Plan</label>
                                    <select
                                        className="w-full text-sm border-slate-200 rounded-md focus:ring-emerald-500"
                                        value={planFilter}
                                        onChange={(e) => { setPlanFilter(e.target.value); setPage(1); }}
                                    >
                                        <option>All Plans</option>
                                        <option>Basic</option>
                                        <option>Growth</option>
                                        <option>Enterprise</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        <Download size={16} /> Export
                    </button>
                    <button
                        onClick={() => setActiveSection?.('onboarding')}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> Onboard FPO
                    </button>
                </div>
            </div>

            <div className="p-0 overflow-x-auto flex-1">
                <DataTable columns={columns} data={paginatedFPOs} className="border-0 shadow-none rounded-none" />
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500 mt-auto">
                <span>Showing {paginatedFPOs.length} of {filteredFPOs.length} FPOs</span>
                <div className="flex gap-1">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 rounded transition-colors ${page === i + 1 ? 'bg-emerald-600 text-white' : 'border border-slate-200 hover:bg-white'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages || totalPages === 0}
                        className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
