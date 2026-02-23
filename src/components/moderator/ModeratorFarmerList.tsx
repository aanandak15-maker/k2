import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, Phone, MapPin, ChevronRight, UserPlus } from 'lucide-react';
import { mockFarmers } from '../../data/mock/farmers';
import { useToast } from '../../hooks/useToast';

export function ModeratorFarmerList({ onSelectFarmer }: { onSelectFarmer: (id: string) => void }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();

    // Get first 10 for display to avoid mobile layout breaking with too much data
    // In a real app we'd use pagination/infinite scroll here
    const farmersList = mockFarmers
        .filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.phone.includes(searchTerm))
        .slice(0, 10);

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 mt-4">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-slate-800 text-sm">Directory</h2>
                <button onClick={() => toast({ message: 'Farmer registration form coming in v2', variant: 'info' })} className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-full flex items-center gap-1 text-xs font-medium">
                    <UserPlus size={14} /> Add New
                </button>
            </div>

            <div className="relative shadow-sm rounded-xl">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 sm:text-sm"
                    placeholder="Search by name or mobile..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                {farmersList.map((farmer) => (
                    <Card
                        key={farmer.id}
                        className="border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"
                        onClick={() => onSelectFarmer(farmer.id)}
                    >
                        <CardContent className="p-3 flex items-center gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                                    {farmer.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {farmer.status === 'Active' && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-sm text-slate-900 truncate pr-2">{farmer.name}</h3>
                                    <Badge variant={farmer.status === 'Active' ? 'success' : farmer.status === 'Inactive' ? 'warning' : 'danger'} className="text-[9px] px-1 py-0 h-3.5">
                                        {farmer.status}
                                    </Badge>
                                </div>

                                <div className="flex flex-col gap-0.5 mt-1">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                        <Phone size={10} /> {farmer.phone}
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <MapPin size={10} /> <span className="truncate">{farmer.village} ({farmer.landSizeDb} Ac)</span>
                                        </div>
                                        {farmer.outstandingDues > 0 && (
                                            <span className="text-[10px] font-bold text-red-600">Dues: ₹{farmer.outstandingDues}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="text-slate-400 pl-1 border-l border-slate-100 py-2">
                                <ChevronRight size={18} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {farmersList.length === 0 && (
                    <div className="text-center py-8 text-slate-500 text-sm">
                        No farmers found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
}
