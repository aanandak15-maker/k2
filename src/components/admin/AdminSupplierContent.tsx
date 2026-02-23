import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, Plus, Filter, Download, Phone, Mail, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { Supplier } from '../../data/mock/suppliers';

export default function AdminSupplierContent() {
    const { toast } = useToast();
    const { state, addSupplier } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Ledger Modal State
    const [isLedgerOpen, setIsLedgerOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    // Form State
    const [newSupplier, setNewSupplier] = useState({
        name: '',
        category: 'Fertilizer' as any,
        contactPerson: '',
        phone: '',
        email: '',
        gstNumber: ''
    });

    const filteredSuppliers = state.suppliers.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // KPIs
    const activeSuppliers = state.suppliers.filter(s => s.status === 'Active').length;
    const totalOutstanding = state.suppliers.reduce((acc, s) => acc + s.outstandingBalance, 0);

    const handleAddSupplier = (e: React.FormEvent) => {
        e.preventDefault();

        const supplier: Supplier = {
            id: `SUP-${String(state.suppliers.length + 1).padStart(3, '0')}`,
            name: newSupplier.name,
            category: newSupplier.category,
            contactPerson: newSupplier.contactPerson,
            phone: newSupplier.phone,
            email: newSupplier.email,
            gstNumber: newSupplier.gstNumber,
            totalOrders: 0,
            outstandingBalance: 0,
            status: 'Active',
            rating: 5.0
        };

        addSupplier(supplier);
        toast({ message: `Supplier ${supplier.name} added successfully!`, variant: 'success' });
        setIsModalOpen(false);
        setNewSupplier({ name: '', category: 'Fertilizer', contactPerson: '', phone: '', email: '', gstNumber: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Supplier Directory & Ledger</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage input suppliers (seeds, fertilizers, equipment) and balances.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> Add Supplier
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-5">
                        <div className="text-slate-500 text-sm font-medium mb-1">Total Suppliers</div>
                        <div className="text-2xl font-bold text-slate-900">{state.suppliers.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5">
                        <div className="text-slate-500 text-sm font-medium mb-1">Active Accounts</div>
                        <div className="text-2xl font-bold text-emerald-600">{activeSuppliers}</div>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2 bg-red-50 border-red-100">
                    <CardContent className="p-5 flex justify-between items-center">
                        <div>
                            <div className="text-red-700 text-sm font-medium mb-1">Total Outstanding Payables</div>
                            <div className="text-2xl font-bold text-red-800">₹{totalOutstanding.toLocaleString()}</div>
                        </div>
                        <button
                            onClick={() => setIsPaymentOpen(true)}
                            className="bg-white text-red-700 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 shadow-sm"
                        >
                            Settle Payments
                        </button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 gap-4">
                    <CardTitle>Supplier Roster</CardTitle>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search vendor name or category..."
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
                                    <th className="px-6 py-3 font-medium text-slate-500">Supplier Details</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Category</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Contact Person</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Outstanding (₹)</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredSuppliers.map(supplier => (
                                    <tr key={supplier.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800">{supplier.name}</div>
                                            <div className="text-xs text-slate-500 font-mono mt-0.5">GST: {supplier.gstNumber}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-700">{supplier.category}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-700">{supplier.contactPerson}</div>
                                            <div className="flex items-center gap-3 mt-1">
                                                <a href={`tel:${supplier.phone}`} className="text-slate-400 hover:text-emerald-600 hint--top" aria-label="Call"><Phone size={14} /></a>
                                                <a href={`mailto:${supplier.email}`} className="text-slate-400 hover:text-emerald-600 hint--top" aria-label="Email"><Mail size={14} /></a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className={`font-bold ${supplier.outstandingBalance > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                                                {supplier.outstandingBalance.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={
                                                supplier.status === 'Active' ? 'success' :
                                                    supplier.status === 'Inactive' ? 'warning' : 'danger'
                                            }>
                                                {supplier.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedSupplier(supplier);
                                                    setIsLedgerOpen(true);
                                                }}
                                                className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                View Ledger
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredSuppliers.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-slate-500 bg-slate-50/50">
                                            No suppliers found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Add Supplier Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-bold text-slate-900">Add New Supplier</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddSupplier} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Supplier Name / Company</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={newSupplier.name}
                                    onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <select
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newSupplier.category}
                                        onChange={(e) => setNewSupplier({ ...newSupplier, category: e.target.value as any })}
                                    >
                                        <option value="Fertilizer">Fertilizer</option>
                                        <option value="Seed">Seed</option>
                                        <option value="Pesticide">Pesticide</option>
                                        <option value="Equipment">Equipment</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">GST Number</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. 09AAACA1234..."
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm uppercase"
                                        value={newSupplier.gstNumber}
                                        onChange={(e) => setNewSupplier({ ...newSupplier, gstNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={newSupplier.contactPerson}
                                    onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newSupplier.phone}
                                        onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newSupplier.email}
                                        onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm">Save Supplier</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Supplier Ledger Modal */}
            {isLedgerOpen && selectedSupplier && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6 sticky top-0 bg-white z-10">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{selectedSupplier.name} - Ledger</h3>
                                <p className="text-sm text-slate-500">{selectedSupplier.category} Supplier • GST: {selectedSupplier.gstNumber}</p>
                            </div>
                            <button onClick={() => setIsLedgerOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-200 flex justify-between items-center">
                                <div>
                                    <h4 className="text-sm font-medium text-slate-500">Total Outstanding Balance</h4>
                                    <div className={`text-2xl font-bold ${selectedSupplier.outstandingBalance > 0 ? 'text-red-600' : 'text-slate-900'}`}>
                                        ₹{selectedSupplier.outstandingBalance.toLocaleString()}
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsLedgerOpen(false);
                                        setIsPaymentOpen(true);
                                    }}
                                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                                >
                                    Make Payment
                                </button>
                            </div>
                            <h4 className="font-semibold text-slate-900 mb-4">Recent Transactions</h4>
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
                                            <td className="px-4 py-3">2025-02-15</td>
                                            <td className="px-4 py-3"><Badge variant="warning">Invoice (Input Purchase)</Badge></td>
                                            <td className="px-4 py-3 text-right font-medium text-red-600">₹45,000</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3">2025-01-20</td>
                                            <td className="px-4 py-3"><Badge variant="success">Payment Made</Badge></td>
                                            <td className="px-4 py-3 text-right font-medium text-emerald-600">₹30,000</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3">2024-12-10</td>
                                            <td className="px-4 py-3"><Badge variant="warning">Invoice (Input Purchase)</Badge></td>
                                            <td className="px-4 py-3 text-right font-medium text-red-600">₹80,000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Make Payment Modal */}
            {isPaymentOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6">
                            <h3 className="text-lg font-bold text-slate-900">Settle Supplier Payment</h3>
                            <button onClick={() => setIsPaymentOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Select Supplier</label>
                                <select
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all focus:ring-2 focus:ring-emerald-500 outline-none"
                                >
                                    <option value="">-- Choose Supplier --</option>
                                    {state.suppliers.map(s => (
                                        <option key={s.id} value={s.id}>{s.name} (Outstanding: ₹{s.outstandingBalance})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Amount to Pay (₹)</label>
                                <input type="number" min="1" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all focus:ring-2 focus:ring-emerald-500 outline-none" />
                            </div>
                            <button
                                onClick={() => {
                                    toast({ message: 'Payment processed and recorded successfully.', variant: 'success' });
                                    setIsPaymentOpen(false);
                                }}
                                className="w-full bg-emerald-600 text-white p-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors mt-4"
                            >
                                Process Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
