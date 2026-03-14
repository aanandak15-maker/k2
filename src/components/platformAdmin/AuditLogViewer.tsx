import React, { useState } from 'react';
import { Search, Filter, Download, Activity, ShieldAlert, ArrowUpRight, ShieldCheck, Settings, Users, Database } from 'lucide-react';
import { DataTable } from '../ui/DataTable';
import { useToast } from '../../hooks/useToast';

export default function AuditLogViewer() {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All Events');
    const [page, setPage] = useState(1);
    const { toast } = useToast();

    // Mock Audit Logs
    const mockAuditLogs = [
        { id: 'AL-9012', timestamp: '2024-03-15T10:23:45Z', actor: 'SysAdmin_Anand', role: 'Platform Admin', action: 'Config Update', resource: 'SMS Gateway Settings', status: 'Success', fpo: 'System', ip: '192.168.1.105' },
        { id: 'AL-9011', timestamp: '2024-03-15T09:12:11Z', actor: 'Ramesh Gupta', role: 'CEO', action: 'Exported Data', resource: 'Farmer Roster', status: 'Success', fpo: 'Sikandrabad FPC', ip: '117.201.44.12' },
        { id: 'AL-9010', timestamp: '2024-03-14T18:45:00Z', actor: 'System Worker', role: 'Cron', action: 'Auto-Billing Run', resource: 'Subscription Invoices', status: 'Success', fpo: 'System', ip: 'Internal' },
        { id: 'AL-9009', timestamp: '2024-03-14T15:30:22Z', actor: 'Amit Singh', role: 'Operations', action: 'Failed Login', resource: 'Auth Service', status: 'Failed', fpo: 'Mathura Kisan FPC', ip: '103.45.22.99' },
        { id: 'AL-9008', timestamp: '2024-03-14T14:10:05Z', actor: 'PlatformAdmin_Deepak', role: 'Super Admin', action: 'Impersonated User', resource: 'Ramesh Gupta (CEO)', status: 'Warning', fpo: 'Sikandrabad FPC', ip: '192.168.1.210' },
        { id: 'AL-9007', timestamp: '2024-03-14T11:05:40Z', actor: 'Suresh Sharma', role: 'CEO', action: 'Changed Password', resource: 'User Profile', status: 'Success', fpo: 'Mathura Kisan FPC', ip: '45.112.55.88' },
        { id: 'AL-9006', timestamp: '2024-03-13T16:20:15Z', actor: 'API_Integration_01', role: 'Service Account', action: 'Bulk Import', resource: 'Input Inventory', status: 'Success', fpo: 'Rajkot Kisan FPC', ip: 'Backend Sync' },
        { id: 'AL-9005', timestamp: '2024-03-13T09:00:00Z', actor: 'PlatformAdmin_Riya', role: 'Platform Admin', action: 'Deleted Resource', resource: 'FPO-009 Draft Profile', status: 'Danger', fpo: 'System', ip: '192.168.1.188' },
    ];

    const filteredLogs = mockAuditLogs.filter(log =>
        (log.actor.toLowerCase().includes(searchTerm.toLowerCase()) || log.action.toLowerCase().includes(searchTerm.toLowerCase()) || log.fpo.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (typeFilter === 'All Events' || log.status === typeFilter || (typeFilter === 'Security' && (log.action.includes('Login') || log.action.includes('Impersonate') || log.action.includes('Password'))))
    );

    const ITEMS_PER_PAGE = 6;
    const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
    const paginatedLogs = filteredLogs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handleExport = () => {
        toast({ message: `Exporting ${filteredLogs.length} audit records to CSV object storage...`, variant: 'info' });
    };

    const getActionIcon = (action: string) => {
        if (action.includes('Config') || action.includes('Settings')) return <Settings size={14} className="text-slate-500" />;
        if (action.includes('Login') || action.includes('Password') || action.includes('Impersonate')) return <ShieldAlert size={14} className="text-indigo-500" />;
        if (action.includes('Export') || action.includes('Import')) return <Database size={14} className="text-amber-500" />;
        if (action.includes('Role') || action.includes('User')) return <Users size={14} className="text-blue-500" />;
        return <Activity size={14} className="text-slate-400" />;
    };

    const columns = [
        {
            key: 'timestamp' as const,
            header: 'Timestamp (UTC)',
            render: (log: any) => <span className="text-slate-500 font-mono text-xs">{new Date(log.timestamp).toLocaleString()}</span>
        },
        {
            key: 'action' as const,
            header: 'Action / Event',
            render: (log: any) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        {getActionIcon(log.action)} {log.action}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">Target: {log.resource}</span>
                </div>
            )
        },
        {
            key: 'actor' as const,
            header: 'Actor',
            render: (log: any) => (
                <div>
                    <div className="font-medium text-slate-700">{log.actor}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">{log.role}</div>
                </div>
            )
        },
        {
            key: 'fpo' as const,
            header: 'Context (FPO)',
            render: (log: any) => <span className={log.fpo === 'System' ? 'text-indigo-600 font-medium' : 'text-slate-600'}>{log.fpo}</span>
        },
        {
            key: 'ip' as const,
            header: 'Origin IP',
            render: (log: any) => <span className="font-mono text-xs text-slate-400">{log.ip}</span>
        },
        {
            key: 'status' as const,
            header: 'Status',
            render: (log: any) => {
                let colorClass = 'bg-slate-100 text-slate-600';
                if (log.status === 'Success') colorClass = 'bg-[var(--brand-wash)] text-[var(--brand)]';
                if (log.status === 'Failed') colorClass = 'bg-red-50 text-red-700';
                if (log.status === 'Warning') colorClass = 'bg-amber-50 text-amber-700';
                if (log.status === 'Danger') colorClass = 'bg-rose-100 text-rose-800 font-bold';

                return <span className={`text-xs font-semibold px-2 py-1 rounded-md ${colorClass}`}>{log.status}</span>;
            }
        }
    ];

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[70vh]">

            {/* Header Area */}
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <ShieldCheck className="text-indigo-600" />
                        Global Security & Audit Log
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Immutable ledger of all administrative and system events across the K2 platform.</p>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--brand)] bg-[var(--brand-pale)] px-2.5 py-1 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse"></span>
                        Live Logging Active
                    </span>
                </div>
            </div>

            {/* Controls */}
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search by actor, action, or context..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto relative">
                    <select
                        className="w-40 text-sm border-slate-200 rounded-lg focus:ring-indigo-500 cursor-pointer bg-slate-50 hover:bg-slate-100"
                        value={typeFilter}
                        onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
                    >
                        <option>All Events</option>
                        <option>Security</option>
                        <option>Success</option>
                        <option>Failed</option>
                        <option>Warning</option>
                        <option>Danger</option>
                    </select>

                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        title="Export compliant log archive"
                    >
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="p-0 overflow-x-auto flex-1">
                <DataTable columns={columns} data={paginatedLogs} className="border-0 shadow-none rounded-none" />
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500 mt-auto">
                <span>Showing {paginatedLogs.length} of {filteredLogs.length} events logged</span>
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
                            className={`px-3 py-1 rounded transition-colors ${page === i + 1 ? 'bg-indigo-600 text-white border border-indigo-600' : 'border border-slate-200 hover:bg-white'}`}
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
