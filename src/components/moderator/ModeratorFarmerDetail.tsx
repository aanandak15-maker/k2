import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ChevronLeft, MapPin, Phone, History, IndianRupee, FileText, Plus, Navigation } from 'lucide-react';
import { mockFarmers } from '../../data/mock/farmers';
import { useToast } from '../../hooks/useToast';

export function ModeratorFarmerDetail({
    farmerId,
    onBack,
    onLogVisit,
    onCollectPayment
}: {
    farmerId: string,
    onBack: () => void,
    onLogVisit: () => void,
    onCollectPayment: () => void
}) {
    const [activeTab, setActiveTab] = useState<'overview' | 'ledger' | 'visits'>('overview');
    const { toast } = useToast();

    const farmer = mockFarmers.find(f => f.id === farmerId);

    if (!farmer) return (
        <div className="flex flex-col items-center justify-center h-full p-4 mt-10">
            <p className="text-slate-500">Farmer not found.</p>
            <button onClick={onBack} className="mt-4 text-emerald-600 font-medium">Go Back</button>
        </div>
    );

    return (
        <div className="animate-in slide-in-from-right-4 duration-300 pb-20 bg-slate-50 min-h-screen">
            {/* Header with back button */}
            <div className="sticky top-0 z-30 bg-white border-b border-slate-100 flex items-center px-2 py-3">
                <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-full text-slate-600 mr-2">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-slate-900 truncate">{farmer.name}</h2>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                        <span className="font-mono">{farmer.id}</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-medium">{farmer.status}</span>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* Profile Card */}
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl font-bold border-2 border-emerald-200 shrink-0">
                                {farmer.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Phone size={14} className="text-slate-400" />
                                    <a href={`tel:${farmer.phone}`} className="text-emerald-600 hover:underline">{farmer.phone}</a>
                                </div>
                                <div className="flex items-start gap-2 text-sm text-slate-600">
                                    <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                                    <span className="leading-tight">{farmer.village}, {farmer.cluster}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <button onClick={() => toast({ message: 'Opening navigation to farmer...', variant: 'info' })} className="flex-1 bg-emerald-50 text-emerald-700 py-1.5 rounded text-xs font-semibold hover:bg-emerald-100 flex items-center justify-center gap-1">
                                    <Navigation size={12} /> Navigate
                                </button>
                                <button onClick={() => toast({ message: `Calling ${farmer.phone}...`, variant: 'info' })} className="flex-1 border border-slate-200 text-slate-700 py-1.5 rounded text-xs font-semibold hover:bg-slate-50 flex items-center justify-center gap-1">
                                    <Phone size={12} /> Call
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100">
                            <div className="text-center">
                                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Land</div>
                                <div className="font-bold text-slate-800 text-sm mt-0.5">{farmer.landSizeDb} Ac</div>
                            </div>
                            <div className="text-center border-x border-slate-100">
                                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Crops</div>
                                <div className="font-bold text-slate-800 text-sm mt-0.5 truncate px-1">
                                    {farmer.crops.slice(0, 2).join(', ')}{farmer.crops.length > 2 && '+'}
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Dues</div>
                                <div className={`font-bold text-sm mt-0.5 ${farmer.outstandingDues > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                    ₹{farmer.outstandingDues}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tab Navigation */}
                <div className="flex bg-slate-200/50 p-1 rounded-lg">
                    {
                        [
                            { id: 'overview', label: 'Overview', icon: FileText },
                            { id: 'ledger', label: 'Ledger', icon: IndianRupee },
                            { id: 'visits', label: 'Visits', icon: History }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-all ${activeTab === tab.id ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'
                                    }`}
                                onClick={() => setActiveTab(tab.id as any)}
                            >
                                <tab.icon size={14} />
                                {tab.label}
                            </button>
                        ))
                    }
                </div>

                {/* Tab Content */}
                {
                    activeTab === 'overview' && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                            <Card className="border-0 shadow-sm">
                                <CardContent className="p-4 space-y-3">
                                    <h3 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-2">Active Crops (Kharif)</h3>
                                    {farmer.crops.map((crop, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm">
                                            <span className="font-medium text-slate-700">{crop}</span>
                                            <span className="text-slate-500">-</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-sm bg-blue-50/50 border border-blue-100">
                                <CardContent className="p-4">
                                    <h3 className="font-bold text-sm text-blue-900 mb-2">Next Recommended Action</h3>
                                    <p className="text-xs text-blue-800">Urea application due for Wheat in 3 days. Ensure farmer has sufficient stock.</p>
                                    <button onClick={() => toast({ message: 'SMS advisory pushed to farmer', variant: 'success' })} className="mt-3 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded shadow-sm w-full block text-center">
                                        Push SMS Advisory
                                    </button>
                                </CardContent>
                            </Card>
                        </div>
                    )
                }

                {
                    activeTab === 'ledger' && (
                        <div className="space-y-3 animate-in fade-in duration-300">
                            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">Total Outstanding</div>
                                    <div className="text-lg font-bold text-red-600">₹{farmer.outstandingDues.toLocaleString()}</div>
                                </div>
                                <button onClick={onCollectPayment} className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm flex items-center gap-1">
                                    <IndianRupee size={14} /> Collect
                                </button>
                            </div>

                            <h3 className="font-bold text-slate-800 text-sm mt-4 px-1">Recent Transactions</h3>
                            {/* Mock Transactions */}
                            {[
                                { id: 'TXN-1', desc: 'Fertilizer Purchase (Urea)', date: '12 Feb 2025', amt: -1500, type: 'dr' },
                                { id: 'TXN-2', desc: 'Cash Payment', date: '05 Feb 2025', amt: 2000, type: 'cr' },
                                { id: 'TXN-3', desc: 'Seed Purchase (Wheat)', date: '15 Jan 2025', amt: -3400, type: 'dr' },
                            ].map(txn => (
                                <div key={txn.id} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center">
                                    <div>
                                        <div className="font-semibold text-sm text-slate-800">{txn.desc}</div>
                                        <div className="text-xs text-slate-500">{txn.date} • {txn.id}</div>
                                    </div>
                                    <div className={`font-bold ${txn.type === 'cr' ? 'text-emerald-600' : 'text-slate-800'}`}>
                                        {txn.type === 'cr' ? '+' : '-'}₹{Math.abs(txn.amt)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }

                {
                    activeTab === 'visits' && (
                        <div className="space-y-3 animate-in fade-in duration-300">
                            <button onClick={onLogVisit} className="w-full bg-emerald-50 border border-emerald-200 border-dashed text-emerald-700 text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors">
                                <Plus size={18} /> Log New Visit
                            </button>

                            {/* Mock Visit History */}
                            <div className="relative pl-4 border-l-2 border-slate-200 ml-2 mt-6 space-y-6">
                                <div className="relative">
                                    <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-50"></div>
                                    <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-sm text-slate-800">Crop Inspection</span>
                                            <span className="text-xs text-slate-500">10 Feb 2025</span>
                                        </div>
                                        <p className="text-xs text-slate-600 line-clamp-2">Visited field to check for aphid infestation in Mustard. Minor presence found, advised neem spray.</p>
                                        <div className="mt-2 flex gap-2">
                                            <Badge variant="default" className="text-[9px] bg-slate-100 text-slate-600 py-0 h-4 border-0">Field Visit</Badge>
                                            <Badge variant="warning" className="text-[9px] py-0 h-4 border-0">Advisory</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-slate-300 border-4 border-slate-50"></div>
                                    <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm opacity-70">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-sm text-slate-800">Payment Collection</span>
                                            <span className="text-xs text-slate-500">25 Jan 2025</span>
                                        </div>
                                        <p className="text-xs text-slate-600 line-clamp-1">Collected ₹2000 cash for outstanding dues.</p>
                                        <div className="mt-2 text-[10px] font-medium text-emerald-600">
                                            <IndianRupee size={10} className="inline mr-1" /> Receipt generated
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
