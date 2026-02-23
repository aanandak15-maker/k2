import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, Plus, Filter, Download, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { exportToCsv } from '../../utils/exportUtils';

export default function AdminShareCapitalContent() {
    const { toast } = useToast();
    const { state, updateFarmer } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [paymentData, setPaymentData] = useState({
        farmerId: '',
        amount: 0,
        paymentMode: 'UPI',
        referenceNumber: ''
    });

    // Calculate totals
    const totalSubscribed = state.farmers.length * 1000; // Assuming 1000/share subscription
    const totalPaidUp = state.farmers.reduce((acc, f) => acc + f.shareCapital, 0);
    const totalArrears = totalSubscribed - totalPaidUp;

    const farmersWithArrears = state.farmers.filter(f => f.shareCapital < 1000);

    const filteredFarmers = state.farmers.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRecordPayment = (e: React.FormEvent) => {
        e.preventDefault();

        const farmer = state.farmers.find(f => f.id === paymentData.farmerId);
        if (!farmer) return;

        // Ensure we don't overpay beyond the 1000 limit, or just add it if they buy more shares
        const newShareCapital = Math.min((farmer.shareCapital || 0) + paymentData.amount, 1000);

        updateFarmer(farmer.id, { shareCapital: newShareCapital });

        toast({ message: `Recorded ₹${paymentData.amount} share capital for ${farmer.name}`, variant: 'success' });
        setIsModalOpen(false);
        setPaymentData({ farmerId: '', amount: 0, paymentMode: 'UPI', referenceNumber: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Share Capital Register</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage member share allotments, track dividends, and collect arrears.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            toast({ message: 'Share register exported', variant: 'success' });
                            exportToCsv('fpo_share_capital', state.payments.filter(p => p.purpose === 'Share Capital'));
                        }}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <Download size={16} /> Export Register
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> Record Payment
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-5">
                        <div className="text-slate-500 text-sm font-medium mb-1">Total Authorized Capital</div>
                        <div className="text-2xl font-bold text-slate-900">₹5,00,000</div>
                    </CardContent>
                </Card>
                <Card className="bg-emerald-50 border-emerald-100">
                    <CardContent className="p-5">
                        <div className="text-emerald-700 text-sm font-medium mb-1 flex items-center gap-1">
                            Paid-Up Capital <ArrowUpRight size={14} className="text-emerald-500" />
                        </div>
                        <div className="text-2xl font-bold text-emerald-800">₹{totalPaidUp.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="bg-red-50 border-red-100">
                    <CardContent className="p-5">
                        <div className="text-red-700 text-sm font-medium mb-1 flex items-center gap-1">
                            Calls in Arrears <ArrowDownRight size={14} className="text-red-500" />
                        </div>
                        <div className="text-2xl font-bold text-red-800">₹{totalArrears.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="bg-amber-50 border-amber-100">
                    <CardContent className="p-5">
                        <div className="text-amber-700 text-sm font-medium mb-1">Members in Arrears</div>
                        <div className="text-2xl font-bold text-amber-800">{farmersWithArrears.length}</div>
                        <div className="text-xs text-amber-600 mt-1">Actions needed</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 gap-4">
                    <CardTitle>Member Register Tracker</CardTitle>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search member name or ID..."
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-slate-500">Member ID / Name</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Shares Held</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Subscribed Val.</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Paid-Up</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Arrears</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredFarmers.map(member => {
                                    const subscribed = 1000;
                                    const paid = member.shareCapital;
                                    const arrears = subscribed - paid;

                                    return (
                                        <tr key={member.id} className="hover:bg-slate-50/50">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-800">{member.name}</div>
                                                <div className="text-xs text-slate-500 font-mono mt-0.5">{member.id}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-700">10 Shares</div>
                                                <div className="text-xs text-slate-500 mt-0.5">Cert: K2-{Math.floor(1000 + Math.random() * 9000)}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="font-medium text-slate-600">₹{subscribed.toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="font-bold text-emerald-700">₹{paid.toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className={`font-bold ${arrears > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                                                    ₹{arrears.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant={arrears === 0 ? 'success' : 'warning'}>
                                                    {arrears === 0 ? 'Fully Paid' : 'In Arrears'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {arrears > 0 ? (
                                                    <button
                                                        onClick={() => {
                                                            setPaymentData(prev => ({ ...prev, farmerId: member.id, amount: arrears }));
                                                            setIsModalOpen(true);
                                                        }}
                                                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded"
                                                    >
                                                        Collect
                                                    </button>
                                                ) : (
                                                    <span className="text-xs text-slate-400 font-medium">Cleared</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filteredFarmers.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-slate-500 bg-slate-50/50">
                                            No members found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Record Payment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6">
                            <h3 className="text-lg font-bold text-slate-900">Record Share Capital Payment</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleRecordPayment} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Select Member</label>
                                <select
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={paymentData.farmerId}
                                    onChange={(e) => {
                                        const farmer = state.farmers.find(f => f.id === e.target.value);
                                        const pending = farmer ? (1000 - farmer.shareCapital) : 0;
                                        setPaymentData({ ...paymentData, farmerId: e.target.value, amount: pending > 0 ? pending : 0 });
                                    }}
                                    required
                                >
                                    <option value="">-- Choose Member --</option>
                                    {state.farmers.map(f => (
                                        <option key={f.id} value={f.id}>
                                            {f.name} ({f.id}) - Due: ₹{Math.max(1000 - f.shareCapital, 0)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Amount (₹)</label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700"
                                    value={paymentData.amount || ''}
                                    onChange={(e) => setPaymentData({ ...paymentData, amount: parseInt(e.target.value) || 0 })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Payment Mode</label>
                                    <select
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={paymentData.paymentMode}
                                        onChange={(e) => setPaymentData({ ...paymentData, paymentMode: e.target.value })}
                                    >
                                        <option value="UPI">UPI / Scan</option>
                                        <option value="Cash">Cash App</option>
                                        <option value="Bank Transfer">NEFT</option>
                                        <option value="Cheque">Cheque</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Reference No.</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="UTR/Receipt No"
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={paymentData.referenceNumber}
                                        onChange={(e) => setPaymentData({ ...paymentData, referenceNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm">Save Record</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
