import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, Plus, Download, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { exportToCsv } from '../../utils/exportUtils';
import { Farmer } from '../../data/mock/farmers';

export default function AdminMembershipContent() {
    const { toast } = useToast();
    const { state, addFarmer } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [newFarmer, setNewFarmer] = useState({
        name: '',
        phone: '',
        village: '',
        cluster: '',
        landSizeDb: 0,
        crops: ''
    });

    const filteredFarmers = state.farmers.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // KPI Computations
    const totalMembers = state.farmers.length;
    const activeShareCapital = state.farmers.reduce((sum, f) => sum + f.shareCapital, 0);
    const pendingKycCount = state.farmers.filter(f => f.status !== 'Active').length;

    const handleOnboardSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const farmer: Farmer = {
            id: `F-${1000 + state.farmers.length + 1}`,
            name: newFarmer.name,
            phone: newFarmer.phone,
            village: newFarmer.village,
            cluster: newFarmer.cluster,
            landSizeDb: newFarmer.landSizeDb,
            crops: newFarmer.crops.split(',').map(c => c.trim()).filter(Boolean),
            status: 'Active',
            membershipDate: new Date().toISOString().split('T')[0],
            outstandingDues: 0,
            shareCapital: 1000, // Default minimum share capital
            lastVisit: new Date().toISOString().split('T')[0],
            riskScore: 'Low'
        };

        addFarmer(farmer);
        toast({ message: `Farmer ${farmer.name} onboarded successfully!`, variant: 'success' });
        setIsModalOpen(false);
        setNewFarmer({ name: '', phone: '', village: '', cluster: '', landSizeDb: 0, crops: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Farmer Membership CRM</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage farmer profiles, share capital, and KYC compliance.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            toast({ message: 'KYC data export started', variant: 'success' });
                            exportToCsv('fpo_farmers_kyc', state.farmers);
                        }}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <Download size={16} /> Export KYC
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> Onboard Farmer
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-5">
                        <div className="text-slate-500 text-sm font-medium mb-1">Total Members</div>
                        <div className="text-2xl font-bold text-slate-900">{totalMembers}</div>
                    </CardContent>
                </Card>
                <Card className="bg-emerald-50 border-emerald-100">
                    <CardContent className="p-5">
                        <div className="text-emerald-700 text-sm font-medium mb-1">Total Share Capital</div>
                        <div className="text-2xl font-bold text-emerald-800">₹{activeShareCapital.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="bg-amber-50 border-amber-100">
                    <CardContent className="p-5">
                        <div className="text-amber-700 text-sm font-medium mb-1">Pending KYC</div>
                        <div className="text-2xl font-bold text-amber-800">{pendingKycCount}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 gap-4">
                    <CardTitle>Member Roster</CardTitle>
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search name, village, or ID..."
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
                                    <th className="px-6 py-3 font-medium text-slate-500">Member ID / Name</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Village Location</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-center">Land (Acres)</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Share Capital</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredFarmers.map(farmer => (
                                    <tr key={farmer.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800">{farmer.name}</div>
                                            <div className="text-xs text-slate-500 font-mono mt-0.5">{farmer.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-700">{farmer.village}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">{farmer.cluster}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-slate-700">
                                            {farmer.landSizeDb}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-emerald-700 text-right">
                                            ₹{farmer.shareCapital.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={farmer.status === 'Active' ? 'success' : 'warning'}>
                                                {farmer.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                                {filteredFarmers.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500 bg-slate-50/50">
                                            No farmers found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Onboard Farmer Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-bold text-slate-900">Onboard New Farmer</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleOnboardSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newFarmer.name}
                                        onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newFarmer.phone}
                                        onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Village</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newFarmer.village}
                                        onChange={(e) => setNewFarmer({ ...newFarmer, village: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Cluster</label>
                                    <select
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newFarmer.cluster}
                                        onChange={(e) => setNewFarmer({ ...newFarmer, cluster: e.target.value })}
                                        required
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
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Land Size (Acres)</label>
                                    <input
                                        type="number"
                                        required
                                        min="0.1"
                                        step="0.1"
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newFarmer.landSizeDb || ''}
                                        onChange={(e) => setNewFarmer({ ...newFarmer, landSizeDb: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Crops (comma separated)</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Wheat, Mustard, etc."
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newFarmer.crops}
                                        onChange={(e) => setNewFarmer({ ...newFarmer, crops: e.target.value })}
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
