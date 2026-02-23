import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { StatusBadge } from '../ui/StatusBadge';
import { Modal } from '../ui/Modal';
import { useToast } from '../../hooks/useToast';
import { Search, Filter, AlertTriangle, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';

// Mock Support Tickets
const mockTickets = [
    { id: 'TKT-9042', fpo: 'Kissan Agro Producer Co.', subject: 'Unable to generate e-Way bill for bulk order', status: 'Open', priority: 'High', assignee: 'Support Level 2', time: '2 hrs ago', sla: 'Breaching in 45m' },
    { id: 'TKT-9041', fpo: 'Green Valley FPC', subject: 'Data import error in farmer ledger', status: 'In Progress', priority: 'Medium', assignee: 'Tech Team', time: '5 hrs ago', sla: 'On Track' },
    { id: 'TKT-9039', fpo: 'Sunrise Organics', subject: 'Requesting custom training session', status: 'Open', priority: 'Low', assignee: 'Customer Success', time: '1 day ago', sla: 'On Track' },
    { id: 'TKT-9035', fpo: 'Vindhya Agri Producers', subject: 'Payment gateway sync issue', status: 'Resolved', priority: 'Critical', assignee: 'Finance Tech', time: '2 days ago', sla: 'Resolved' },
    { id: 'TKT-9030', fpo: 'BlueSky Farmers Co.', subject: 'How to add new commodity to catalog?', status: 'Resolved', priority: 'Low', assignee: 'Support Level 1', time: '3 days ago', sla: 'Resolved' },
    { id: 'TCK-2015', fpo: 'Godavari Farmers', subject: 'Invoice not generated for last quarter', priority: 'Medium', status: 'Pending', time: '1 day ago', sla: 'On Track' },
];

export default function SupportTickets() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const { toast } = useToast();

    const filteredTickets = mockTickets.filter(ticket =>
        (ticket.fpo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'All' || ticket.status === statusFilter) &&
        (priorityFilter === 'All' || ticket.priority === priorityFilter)
    );

    const handleReply = (e: React.FormEvent) => {
        e.preventDefault();
        toast({ message: 'Reply sent successfully', variant: 'success' });
        setSelectedTicket(null);
    };

    const columns = [
        { header: 'Ticket ID', key: 'id' as const, className: 'font-mono text-xs text-slate-500' },
        { header: 'Subject', key: 'subject' as const, className: 'font-medium text-slate-900 max-w-xs truncate' },
        { header: 'FPO Context', key: 'fpo' as const, className: 'text-sm text-slate-600' },
        {
            header: 'Priority',
            key: 'priority' as const,
            render: (row: any) => (
                <div className="flex items-center gap-1.5">
                    {row.priority === 'Critical' && <AlertTriangle size={12} className="text-red-500" />}
                    <span className={`text-xs font-semibold ${row.priority === 'Critical' ? 'text-red-700' :
                        row.priority === 'High' ? 'text-orange-600' :
                            row.priority === 'Medium' ? 'text-blue-600' : 'text-slate-600'
                        }`}>{row.priority}</span>
                </div>
            )
        },
        {
            header: 'Status',
            key: 'status' as const,
            render: (row: any) => (
                <Badge variant={row.status === 'Resolved' ? 'success' : row.status === 'In Progress' ? 'warning' : 'outline'} className="text-[10px]">
                    {row.status}
                </Badge>
            )
        },
        { header: 'Assignee', key: 'assignee' as const, className: 'text-sm text-slate-600' },
        {
            header: 'SLA Status',
            key: 'sla' as const,
            render: (row: any) => (
                <span className={`text-xs font-semibold ${row.sla.includes('Breaching') ? 'text-red-600 bg-red-50 px-2 py-0.5 rounded' : 'text-slate-500'}`}>
                    {row.sla}
                </span>
            )
        },
        { header: 'Created', key: 'time' as const, className: 'text-sm text-slate-500' },
        {
            key: 'actions' as const,
            header: '',
            render: (t: any) => (
                <button
                    onClick={() => setSelectedTicket(t)}
                    className="text-emerald-600 text-xs font-semibold hover:underline"
                >
                    View Detail
                </button>
            )
        },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-blue-500 shadow-sm border-y-0 border-r-0 rounded-r-xl">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Open Tickets</p>
                            <h3 className="text-2xl font-bold text-slate-900">142</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500 shadow-sm border-y-0 border-r-0 rounded-r-xl">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Critical / High</p>
                            <h3 className="text-2xl font-bold text-slate-900">18</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500 shadow-sm border-y-0 border-r-0 rounded-r-xl">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">SLA At Risk</p>
                            <h3 className="text-2xl font-bold text-slate-900">5</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-emerald-500 shadow-sm border-y-0 border-r-0 rounded-r-xl">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Avg Resolution</p>
                            <h3 className="text-2xl font-bold text-slate-900">4.2<span className="text-sm text-slate-500 font-normal ml-1">hrs</span></h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm border-slate-200">
                <CardContent className="p-0 flex flex-col h-full relative">
                    <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search tickets or FPOs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-colors shadow-sm shrink-0 text-sm font-medium ${isFilterOpen ? 'bg-slate-50 border-emerald-500 text-emerald-700' : 'border-slate-200 hover:bg-slate-50 text-slate-600 bg-white'}`}
                            >
                                <Filter size={16} /> Filters
                            </button>

                            {isFilterOpen && (
                                <div className="absolute top-12 right-0 bg-white border border-slate-200 shadow-xl rounded-xl p-4 w-64 z-20 animate-in fade-in zoom-in-95 duration-200">
                                    <h4 className="font-semibold text-sm text-slate-800 mb-3">Filter Tickets</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs font-medium text-slate-500 mb-1 block">Status</label>
                                            <select
                                                className="w-full text-sm border-slate-200 rounded-md focus:ring-emerald-500"
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                            >
                                                <option>All</option>
                                                <option>Open</option>
                                                <option>Pending</option>
                                                <option>Resolved</option>
                                                <option>In Progress</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-500 mb-1 block">Priority</label>
                                            <select
                                                className="w-full text-sm border-slate-200 rounded-md focus:ring-emerald-500"
                                                value={priorityFilter}
                                                onChange={(e) => setPriorityFilter(e.target.value)}
                                            >
                                                <option>All</option>
                                                <option>Critical</option>
                                                <option>High</option>
                                                <option>Medium</option>
                                                <option>Low</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <DataTable columns={columns} data={filteredTickets} className="border-0 shadow-none rounded-none" />
                    </div>
                    <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between text-sm text-slate-500 shrink-0">
                        <span>Showing {filteredTickets.length} tickets</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>Previous</button>
                            <button onClick={() => toast({ message: 'Pagination coming in v2', variant: 'info' })} className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 transition-colors">Next</button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Modal
                isOpen={!!selectedTicket}
                onClose={() => setSelectedTicket(null)}
                title={`Ticket ${selectedTicket?.id}`}
                size="slide-over"
            >
                {selectedTicket && (
                    <div className="flex flex-col h-full">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-2">{selectedTicket.subject}</h2>
                            <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                                <span>{selectedTicket.fpo}</span>
                                <span>•</span>
                                <span>{selectedTicket.time}</span>
                            </div>
                            <div className="flex gap-2">
                                <StatusBadge status={selectedTicket.status} />
                                <Badge variant={selectedTicket.priority === 'Critical' ? 'error' : selectedTicket.priority === 'High' ? 'warning' : 'default'}>{selectedTicket.priority}</Badge>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 flex-1">
                            <div className="font-medium text-sm text-slate-900 mb-2">Original Message:</div>
                            <p className="text-sm text-slate-600">The customer reported an issue regarding {selectedTicket.subject.toLowerCase()}. They are requesting immediate assistance to resolve this blocker.</p>
                        </div>

                        <form onSubmit={handleReply} className="mt-auto pt-6 border-t border-slate-100">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Reply to FPO</label>
                            <textarea
                                rows={4}
                                className="w-full border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none mb-3"
                                placeholder="Type your response here..."
                                required
                            />
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setSelectedTicket(null)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm">Send Reply</button>
                            </div>
                        </form>
                    </div>
                )}
            </Modal>
        </div>
    );
}
