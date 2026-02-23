import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, Plus, Filter, Download, Truck, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';

// Initial Mock Data
const initialProcurement = [
    { id: 'PR-25-001', date: '2025-02-23T10:00:00Z', farmerName: 'Raju Yadav', crop: 'Wheat HD-2967', quantity: 42, rate: 2350, amount: 98700, status: 'Received', payment: 'Pending' },
    { id: 'PR-25-002', date: '2025-02-23T11:30:00Z', farmerName: 'Mohan Singh', crop: 'Wheat HD-2967', quantity: 18, rate: 2350, amount: 42300, status: 'Quality Check', payment: 'Hold' },
    { id: 'PR-25-003', date: '2025-02-22T09:15:00Z', farmerName: 'Seema Devi', crop: 'Mustard Pusa Bold', quantity: 12, rate: 5100, amount: 61200, status: 'In Transit', payment: 'Pending' },
    { id: 'PR-25-004', date: '2025-02-21T14:45:00Z', farmerName: 'Vikram Thakur', crop: 'Potato', quantity: 150, rate: 1420, amount: 213000, status: 'Completed', payment: 'Paid' },
];

export default function AdminProcurementContent() {
    const { toast } = useToast();
    const { addPayment } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [procurements, setProcurements] = useState(initialProcurement);

    // Form State
    const [newReceipt, setNewReceipt] = useState({
        farmerName: '',
        crop: 'Wheat HD-2967',
        quantity: 0,
        rate: 0
    });

    const handleAddReceipt = (e: React.FormEvent) => {
        e.preventDefault();

        const amount = newReceipt.quantity * newReceipt.rate;

        const receipt = {
            id: `PR-25-${String(procurements.length + 1).padStart(3, '0')}`,
            date: new Date().toISOString(),
            farmerName: newReceipt.farmerName,
            crop: newReceipt.crop,
            quantity: newReceipt.quantity,
            rate: newReceipt.rate,
            amount: amount,
            status: 'Received',
            payment: 'Pending'
        };

        setProcurements([receipt, ...procurements]);

        // Also log this as a pending outbound payment in AdminStore
        addPayment({
            id: `PAY-${receipt.id}`,
            date: receipt.date,
            entityId: `FPO-F-${Math.floor(1000 + Math.random() * 9000)}`,
            entityName: receipt.farmerName,
            entityType: 'Farmer',
            type: 'Outbound',
            amount: amount,
            paymentMode: 'Bank Transfer',
            referenceNumber: 'PENDING',
            status: 'Pending',
            purpose: 'Crop Procurement'
        });

        toast({ message: `Procurement Receipt ${receipt.id} generated! Farmer payout pended.`, variant: 'success' });
        setIsModalOpen(false);
        setNewReceipt({ farmerName: '', crop: 'Wheat HD-2967', quantity: 0, rate: 0 });
    };

    // KPIs
    const todayVolume = procurements
        .filter(p => new Date(p.date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0))
        .reduce((acc, p) => acc + p.quantity, 0);

    const pendingQA = procurements.filter(p => p.status === 'Quality Check' || p.status === 'In Transit').length;

    const pendingPayouts = procurements
        .filter(p => p.payment === 'Pending' || p.payment === 'Hold')
        .reduce((acc, p) => acc + p.amount, 0);

    const filteredProcurements = procurements.filter(p =>
        p.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Crop Procurement</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage inward crop receipts, quality checks, and farmer payouts.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> New Receipt
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-emerald-50 border-emerald-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-emerald-800 mb-1">Today's Procurement Volume</div>
                        <div className="text-2xl font-bold text-emerald-900">{todayVolume} Qtl</div>
                        <div className="text-xs text-emerald-700 mt-1 flex items-center gap-1">Receipts recorded today</div>
                    </CardContent>
                </Card>
                <Card className="bg-amber-50 border-amber-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-amber-800 mb-1">Pending QA Clearance</div>
                        <div className="text-2xl font-bold text-amber-900">{pendingQA} Shipments</div>
                        <div className="text-xs text-amber-700 mt-1">Awaiting lab results</div>
                    </CardContent>
                </Card>
                <Card className="bg-red-50 border-red-100">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-red-800 mb-1">Pending Farmer Payouts</div>
                        <div className="text-2xl font-bold text-red-900">₹{pendingPayouts.toLocaleString()}</div>
                        <div className="text-xs text-red-700 mt-1">Awaiting account settlement</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 gap-4">
                    <CardTitle>Procurement Log</CardTitle>
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search ID or Farmer..."
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
                                    <th className="px-6 py-3 font-medium text-slate-500">Receipt ID</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Date</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Farmer</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Crop Details</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Amount (₹)</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Payout</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProcurements.map(item => (
                                    <tr key={item.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4 font-medium text-slate-500">{item.id}</td>
                                        <td className="px-6 py-4 text-slate-600">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 font-semibold text-slate-800">{item.farmerName}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{item.crop}</div>
                                            <div className="text-xs text-slate-500">{item.quantity} Qtl @ ₹{item.rate}/Qtl</div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-slate-900">₹{item.amount.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={
                                                item.status === 'Completed' || item.status === 'Received' ? 'success' :
                                                    item.status === 'Quality Check' ? 'warning' : 'default'
                                            }>
                                                {item.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={
                                                item.payment === 'Paid' ? 'success' :
                                                    item.payment === 'Pending' ? 'warning' : 'danger'
                                            }>
                                                {item.payment}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProcurements.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-slate-500 bg-slate-50/50">
                                            No procurement records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* New Receipt Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6">
                            <h3 className="text-lg font-bold text-slate-900">Generate Procurement Receipt</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddReceipt} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Farmer Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Raju Yadav"
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={newReceipt.farmerName}
                                    onChange={(e) => setNewReceipt({ ...newReceipt, farmerName: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Crop Type</label>
                                <select
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={newReceipt.crop}
                                    onChange={(e) => setNewReceipt({ ...newReceipt, crop: e.target.value })}
                                >
                                    <option value="Wheat HD-2967">Wheat (HD-2967)</option>
                                    <option value="Mustard Pusa Bold">Mustard (Pusa Bold)</option>
                                    <option value="Potato">Potato</option>
                                    <option value="Tomato">Tomato</option>
                                    <option value="Paddy PR-126">Paddy (PR-126)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Quantity (Qtl)</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700"
                                        value={newReceipt.quantity || ''}
                                        onChange={(e) => setNewReceipt({ ...newReceipt, quantity: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Rate per Qtl (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700"
                                        value={newReceipt.rate || ''}
                                        onChange={(e) => setNewReceipt({ ...newReceipt, rate: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 mt-2 flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-600">Total Purchase Value:</span>
                                <span className="text-lg font-bold text-slate-900">₹{(newReceipt.quantity * newReceipt.rate).toLocaleString() || 0}</span>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm">Generate Receipt</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
