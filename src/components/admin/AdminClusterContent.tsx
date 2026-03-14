import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MapPin, Users, Edit2, Trash2, Plus, Search } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export default function AdminClusterContent() {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');

    const [clusters, setClusters] = useState([
        { id: 'CL-01', name: 'Sikandrabad North', villages: ['Rampur', 'Kishanpur', 'Bhadrol'], moderator: 'Suresh Kumar', farmers: 145, status: 'Active' },
        { id: 'CL-02', name: 'Sikandrabad South', villages: ['Gokalpur', 'Nangla', 'Phariha'], moderator: 'Priya Singh', farmers: 120, status: 'Active' },
        { id: 'CL-03', name: 'Tundla East', villages: ['Mohammadpur', 'Nawabganj'], moderator: 'Rajesh Pal', farmers: 85, status: 'Active' },
        { id: 'CL-04', name: 'Tundla West', villages: ['Ratauli', 'Paharpur', 'Jarauli'], moderator: 'Unassigned', farmers: 0, status: 'Planned' }
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Cluster & Geography Management</h2>
                    <p className="text-sm text-slate-500">Manage operational clusters, mapped villages, and assigned moderators.</p>
                </div>
                <button
                    onClick={() => toast({ message: 'Add Cluster modal will appear here', variant: 'info' })}
                    className="bg-[var(--brand)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--brand-light)] transition-colors flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" /> Add New Cluster
                </button>
            </div>

            <Card>
                <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Active Clusters</CardTitle>
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search clusters or villages..."
                            className="pl-9 w-full text-sm border border-slate-200 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Cluster Name & ID</th>
                                    <th className="px-6 py-4 font-medium">Mapped Villages</th>
                                    <th className="px-6 py-4 font-medium">Assigned Moderator</th>
                                    <th className="px-6 py-4 font-medium text-right">Registered Farmers</th>
                                    <th className="px-6 py-4 font-medium text-center">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {clusters.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.villages.join(', ').toLowerCase().includes(searchQuery.toLowerCase())).map((cluster) => (
                                    <tr key={cluster.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900">{cluster.name}</div>
                                            <div className="text-xs text-slate-500 mt-1">{cluster.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {cluster.villages.map((v, i) => (
                                                    <span key={i} className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                                        <MapPin className="h-3 w-3" /> {v}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {cluster.moderator === 'Unassigned' ? (
                                                <span className="text-amber-600 text-xs font-medium bg-amber-50 px-2 py-1 rounded">Unassigned</span>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-[var(--brand-pale)] flex items-center justify-center text-[var(--brand)] font-bold text-xs">
                                                        {cluster.moderator.charAt(0)}
                                                    </div>
                                                    <span className="text-slate-700 font-medium">{cluster.moderator}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 font-semibold text-slate-700">
                                                <Users className="h-4 w-4 text-slate-400" /> {cluster.farmers}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Badge variant={cluster.status === 'Active' ? 'success' : 'warning'}>{cluster.status}</Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => toast({ message: 'Edit Cluster', variant: 'info' })} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Edit">
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => toast({ message: 'Delete Cluster', variant: 'error' })} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
