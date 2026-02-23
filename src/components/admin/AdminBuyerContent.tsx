import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, Plus, Filter, Download, Phone, Mail, Building2, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { Buyer } from '../../data/mock/buyers';

export default function AdminBuyerContent() {
    const { toast } = useToast();
    const { state, addBuyer } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Statement Modal State
    const [isStatementOpen, setIsStatementOpen] = useState(false);
    const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);

    // Form State
    const [newBuyer, setNewBuyer] = useState({
        name: '',
        type: 'Corporate' as any,
        contactPerson: '',
        phone: '',
        email: '',
        gstNumber: ''
    });

    const filteredBuyers = state.buyers.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // KPIs
    const activeContracts = state.buyers.filter(b => b.contractStatus === 'Active Contract').length;
    const totalReceivables = state.buyers.reduce((acc, b) => acc + b.outstandingAmount, 0);

    const handleAddBuyer = (e: React.FormEvent) => {
        e.preventDefault();

        const buyer: Buyer = {
            id: `BYR-${String(state.buyers.length + 1).padStart(3, '0')}`,
            name: newBuyer.name,
            type: newBuyer.type,
            contactPerson: newBuyer.contactPerson,
            phone: newBuyer.phone,
            email: newBuyer.email,
            gstNumber: newBuyer.gstNumber,
            totalVolumePurchased: 0,
            outstandingAmount: 0,
            status: 'Active',
            contractStatus: 'No Contract'
        };

        addBuyer(buyer);
        toast({ message: `Buyer ${buyer.name} onboarded successfully!`, variant: 'success' });
        setIsModalOpen(false);
        setNewBuyer({ name: '', type: 'Corporate', contactPerson: '', phone: '', email: '', gstNumber: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Buyer & Offtaker Network</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage institutional buyers, mandis, contracts, and receivables.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> Onboard Buyer
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-slate-900 text-white">
                    <CardContent className="p-5">
                        <div className="text-slate-400 text-sm font-medium mb-1">Total Buyers</div>
                        <div className="text-2xl font-bold">{state.buyers.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5">
                        <div className="text-slate-500 text-sm font-medium mb-1">Active Contracts</div>
                        <div className="text-2xl font-bold text-emerald-600">{activeContracts}</div>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2 bg-emerald-50 border-emerald-100">
                    <CardContent className="p-5 flex justify-between items-center">
                        <div>
                            <div className="text-emerald-800 text-sm font-medium mb-1">Total Outstanding Receivables</div>
                            <div className="text-2xl font-bold text-emerald-900">₹{totalReceivables.toLocaleString()}</div>
                        </div>
                        <button
                            onClick={() => setIsReceiptOpen(true)}
                            className="bg-white text-emerald-700 border border-emerald-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 shadow-sm"
                        >
                            Record Receipt
                        </button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 gap-4">
                    <CardTitle>Buyer Roster</CardTitle>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search buyer name or firm type..."
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
                                    <th className="px-6 py-3 font-medium text-slate-500">Buyer Firm</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Firm Type</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Contact Person</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Volume (YTD)</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Outstanding (₹)</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Contract</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredBuyers.map(buyer => (
                                    <tr key={buyer.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800 flex items-center gap-2">
                                                {buyer.type === 'Corporate' && <Building2 size={14} className="text-slate-400" />}
                                                {buyer.name}
                                            </div>
                                            <div className="text-xs text-slate-500 font-mono mt-0.5">GST: {buyer.gstNumber}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-700">{buyer.type}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-700">{buyer.contactPerson}</div>
                                            <div className="flex items-center gap-3 mt-1">
                                                <a href={`tel:${buyer.phone}`} className="text-slate-400 hover:text-emerald-600 hint--top" aria-label="Call"><Phone size={14} /></a>
                                                <a href={`mailto:${buyer.email}`} className="text-slate-400 hover:text-emerald-600 hint--top" aria-label="Email"><Mail size={14} /></a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="font-medium text-slate-600">{buyer.totalVolumePurchased.toLocaleString()} Qtl</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className={`font-bold ${buyer.outstandingAmount > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
                                                {buyer.outstandingAmount.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={
                                                buyer.contractStatus === 'Active Contract' ? 'success' :
                                                    buyer.contractStatus === 'Expired' ? 'danger' : 'default'
                                            }>
                                                {buyer.contractStatus}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedBuyer(buyer);
                                                    setIsStatementOpen(true);
                                                }}
                                                className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                View Sales
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredBuyers.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-slate-500 bg-slate-50/50">
                                            No buyers found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Add Buyer Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-bold text-slate-900">Onboard New Buyer</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddBuyer} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Buyer Firm Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={newBuyer.name}
                                    onChange={(e) => setNewBuyer({ ...newBuyer, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Firm Type</label>
                                    <select
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newBuyer.type}
                                        onChange={(e) => setNewBuyer({ ...newBuyer, type: e.target.value as any })}
                                    >
                                        <option value="Corporate">Corporate</option>
                                        <option value="Mandi">Mandi</option>
                                        <option value="Direct Consumer">Direct Consumer</option>
                                        <option value="Exporter">Exporter</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">GST Number</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. 29AAACF3456..."
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm uppercase"
                                        value={newBuyer.gstNumber}
                                        onChange={(e) => setNewBuyer({ ...newBuyer, gstNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={newBuyer.contactPerson}
                                    onChange={(e) => setNewBuyer({ ...newBuyer, contactPerson: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newBuyer.phone}
                                        onChange={(e) => setNewBuyer({ ...newBuyer, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newBuyer.email}
                                        onChange={(e) => setNewBuyer({ ...newBuyer, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm">Onboard Buyer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Buyer Statement Modal */}
            {isStatementOpen && selectedBuyer && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6 sticky top-0 bg-white z-10">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{selectedBuyer.name} - Statement of Account</h3>
                                <p className="text-sm text-slate-500">{selectedBuyer.type} Buyer • GST: {selectedBuyer.gstNumber}</p>
                            </div>
                            <button onClick={() => setIsStatementOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-200 flex justify-between items-center">
                                <div>
                                    <h4 className="text-sm font-medium text-slate-500">Total Outstanding Due From Buyer</h4>
                                    <div className={`text-2xl font-bold ${selectedBuyer.outstandingAmount > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
                                        ₹{selectedBuyer.outstandingAmount.toLocaleString()}
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsStatementOpen(false);
                                        setIsReceiptOpen(true);
                                    }}
                                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                                >
                                    Record Receipt
                                </button>
                            </div>
                            <h4 className="font-semibold text-slate-900 mb-4">Recent Sales & Payments</h4>
                            <div className="border border-slate-200 rounded-lg overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-slate-500">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">Date</th>
                                            <th className="px-4 py-3 font-medium">Type</th>
                                            <th className="px-4 py-3 font-medium text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr>
                                            <td className="px-4 py-3">2025-02-18</td>
                                            <td className="px-4 py-3"><Badge variant="info">Invoice (Crop Sale)</Badge></td>
                                            <td className="px-4 py-3 text-right font-medium text-slate-900">₹85,000</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3">2025-02-10</td>
                                            <td className="px-4 py-3"><Badge variant="success">Receipt (Payment Received)</Badge></td>
                                            <td className="px-4 py-3 text-right font-medium text-emerald-600">₹50,000</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3">2025-01-05</td>
                                            <td className="px-4 py-3"><Badge variant="info">Invoice (Crop Sale)</Badge></td>
                                            <td className="px-4 py-3 text-right font-medium text-slate-900">₹120,000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Record Receipt Modal */}
            {isReceiptOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6">
                            <h3 className="text-lg font-bold text-slate-900">Record Payment Receipt</h3>
                            <button onClick={() => setIsReceiptOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Select Buyer</label>
                                <select
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all focus:ring-2 focus:ring-emerald-500 outline-none"
                                >
                                    <option value="">-- Choose Buyer --</option>
                                    {state.buyers.map(b => (
                                        <option key={b.id} value={b.id}>{b.name} (Outstanding: ₹{b.outstandingAmount})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Amount Received (₹)</label>
                                <input type="number" min="1" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all focus:ring-2 focus:ring-emerald-500 outline-none" />
                            </div>
                            <button
                                onClick={() => {
                                    toast({ message: 'Receipt recorded successfully.', variant: 'success' });
                                    setIsReceiptOpen(false);
                                }}
                                className="w-full bg-emerald-600 text-white p-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors mt-4"
                            >
                                Confirm Receipt
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
