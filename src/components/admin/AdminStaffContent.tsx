import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, Plus, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { Staff } from '../../data/mock/staff';

export default function AdminStaffContent() {
    const { toast } = useToast();
    const { state, addStaffMember } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [newStaff, setNewStaff] = useState({
        name: '',
        role: 'Moderator' as any,
        phone: '',
        email: '',
        cluster: ''
    });

    const filteredStaff = state.staff.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddStaff = (e: React.FormEvent) => {
        e.preventDefault();

        const staffMember: Staff = {
            id: `EMP-${String(state.staff.length + 1).padStart(3, '0')}`,
            name: newStaff.name,
            role: newStaff.role,
            phone: newStaff.phone,
            email: newStaff.email,
            cluster: newStaff.role === 'Moderator' ? newStaff.cluster : undefined,
            status: 'Active',
            attendanceToday: 'Not Marked',
            tasksAssigned: 0,
            tasksCompleted: 0
        };

        addStaffMember(staffMember);
        toast({ message: `Staff member ${staffMember.name} added successfully!`, variant: 'success' });
        setIsModalOpen(false);
        setNewStaff({ name: '', role: 'Moderator', phone: '', email: '', cluster: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Staff & Moderator Management</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage FPO employees, community moderators, and their performance.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> Add Staff
                    </button>
                </div>
            </div>

            <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 gap-4 pb-4">
                    <div className="flex gap-4">
                        <div className="text-center px-4 border-r border-slate-200">
                            <div className="text-2xl font-bold text-slate-900">{state.staff.length}</div>
                            <div className="text-xs text-slate-500">Total Staff</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="text-2xl font-bold text-emerald-600">{state.staff.filter(s => s.role === 'Moderator').length}</div>
                            <div className="text-xs text-slate-500">Moderators</div>
                        </div>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search personnel..."
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-slate-500">Employee</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Role & Territory</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-center">Tasks Handled</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-center">Performance Score</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredStaff.map(member => (
                                    <tr key={member.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800">{member.name}</div>
                                            <div className="text-xs text-slate-500">{member.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-700">{member.role}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">{member.cluster ? `Cluster: ${member.cluster}` : 'HQ'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-slate-700">
                                            {member.tasksAssigned > 0 ? `${member.tasksCompleted}/${member.tasksAssigned}` : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center justify-center font-bold px-2 py-1 rounded-md text-xs ${member.tasksAssigned === 0 ? 'bg-slate-100 text-slate-600' :
                                                (member.tasksCompleted / member.tasksAssigned) >= 0.8 ? 'bg-emerald-100 text-emerald-800' :
                                                    (member.tasksCompleted / member.tasksAssigned) >= 0.5 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {member.tasksAssigned > 0 ? `${Math.round((member.tasksCompleted / member.tasksAssigned) * 100)}%` : 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={member.status === 'Active' ? 'success' : 'danger'}>
                                                {member.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                                {filteredStaff.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500 bg-slate-50/50">
                                            No staff found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Add Staff Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-bold text-slate-900">Add New Staff / Moderator</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddStaff} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={newStaff.name}
                                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                                    <select
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newStaff.role}
                                        onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as any })}
                                    >
                                        <option value="Moderator">Moderator</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Accountant">Accountant</option>
                                        <option value="CEO">CEO</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Cluster / Territory</label>
                                    <select
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm disabled:opacity-50"
                                        value={newStaff.cluster}
                                        onChange={(e) => setNewStaff({ ...newStaff, cluster: e.target.value })}
                                        disabled={newStaff.role !== 'Moderator'}
                                        required={newStaff.role === 'Moderator'}
                                    >
                                        <option value="">Select Cluster</option>
                                        <option value="North Cluster">North Cluster</option>
                                        <option value="South Cluster">South Cluster</option>
                                        <option value="East Cluster">East Cluster</option>
                                        <option value="West Cluster">West Cluster</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newStaff.phone}
                                        onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newStaff.email}
                                        onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm">Save Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
