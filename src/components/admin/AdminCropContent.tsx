import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Leaf, Edit2, Trash2, Plus, Search, ThermometerSun } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export default function AdminCropContent() {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');

    const [crops, setCrops] = useState([
        { id: 'CRP-01', name: 'Wheat', varieties: ['HD-2967', 'PBW-343', 'DBW-187'], season: 'Rabi', duration: '120-135 Days', waterRequirement: 'Medium', activeFarmers: 450, status: 'Active' },
        { id: 'CRP-02', name: 'Mustard', varieties: ['Pusa Bold', 'Giriraj', 'RH-30'], season: 'Rabi', duration: '110-140 Days', waterRequirement: 'Low', activeFarmers: 320, status: 'Active' },
        { id: 'CRP-03', name: 'Paddy', varieties: ['PR-126', 'Pusa Basmati 1509'], season: 'Kharif', duration: '115-130 Days', waterRequirement: 'High', activeFarmers: 280, status: 'Active' },
        { id: 'CRP-04', name: 'Potato', varieties: ['Kufri Bahar', 'Kufri Jyoti'], season: 'Rabi / Zaid', duration: '90-110 Days', waterRequirement: 'Medium', activeFarmers: 115, status: 'Active' },
        { id: 'CRP-05', name: 'Tomato', varieties: ['Pusa Ruby', 'Arka Saurabh'], season: 'All', duration: '75-90 Days', waterRequirement: 'High', activeFarmers: 45, status: 'Draft' }
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-[var(--brand-light)]">Crop Master Management</h2>
                    <p className="text-sm text-slate-500">Configure crops, seasons, varieties, and agronomic parameters.</p>
                </div>
                <button
                    onClick={() => toast({ message: 'Add Crop modal will appear here', variant: 'success' })}
                    className="bg-[var(--brand)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--brand-light)] transition-colors flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" /> Add New Crop
                </button>
            </div>

            <Card>
                <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Supported Crops Catalog</CardTitle>
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search crops or varieties..."
                            className="pl-9 w-full text-sm border border-slate-200 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[var(--brand-wash)] text-[var(--brand-light)] border-b border-[var(--brand-pale)]">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Crop Name</th>
                                    <th className="px-6 py-4 font-semibold">Season</th>
                                    <th className="px-6 py-4 font-semibold">Recommended Varieties</th>
                                    <th className="px-6 py-4 font-semibold text-center">Duration</th>
                                    <th className="px-6 py-4 font-semibold text-right">Growing Farmers</th>
                                    <th className="px-6 py-4 font-semibold text-center">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {crops.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.varieties.join(', ').toLowerCase().includes(searchQuery.toLowerCase())).map((crop) => (
                                    <tr key={crop.id} className="hover:bg-slate-50/70 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 font-bold text-slate-900">
                                                <Leaf className="h-4 w-4 text-[var(--brand)]" /> {crop.name}
                                            </div>
                                            <div className="text-[10px] text-slate-400 mt-0.5 font-medium ml-6">{crop.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                                                <ThermometerSun className="h-4 w-4 text-amber-500" /> {crop.season}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {crop.varieties.map((v, i) => (
                                                    <span key={i} className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                                                        {v}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-slate-600 font-medium">{crop.duration}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="font-semibold text-slate-700">
                                                {crop.activeFarmers}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Badge variant={crop.status === 'Active' ? 'success' : 'neutral'}>{crop.status}</Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => toast({ message: 'Edit Crop', variant: 'info' })} className="p-1.5 text-slate-400 hover:text-[var(--brand)] hover:bg-[var(--brand-wash)] rounded-md transition-colors" title="Edit">
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => toast({ message: 'Delete Crop', variant: 'error' })} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
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
