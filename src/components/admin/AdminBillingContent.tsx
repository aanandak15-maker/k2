import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, Plus, Filter, Download, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { exportToCsv } from '../../utils/exportUtils';
import { Payment } from '../../data/mock/payments';

export default function AdminBillingContent() {
    const { toast } = useToast();
    const { state, addPayment } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [newPayment, setNewPayment] = useState({
        entityName: '',
        entityType: 'Farmer' as any,
        type: 'Inbound' as any,
        amount: 0,
        paymentMode: 'Bank Transfer' as any,
        referenceNumber: '',
        purpose: 'Input Sales' as any
    });

    // Filtering
    const filteredPayments = state.payments.filter(p =>
        p.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // KPIs
    const totalInbound = state.payments
        .filter(p => p.type === 'Inbound' && p.status === 'Completed')
        .reduce((acc, p) => acc + p.amount, 0);

    const totalOutbound = state.payments
        .filter(p => p.type === 'Outbound' && p.status === 'Completed')
        .reduce((acc, p) => acc + p.amount, 0);

    const pendingPayments = state.payments.filter(p => p.status === 'Processing' || p.status === 'Pending').length;

    const handleAddTransaction = (e: React.FormEvent) => {
        e.preventDefault();

        const payment: Payment = {
            id: `PAY-${new Date().getFullYear().toString().slice(2)}-${String(state.payments.length + 1).padStart(3, '0')}`,
            date: new Date().toISOString(),
            entityId: `ENT-${Math.floor(Math.random() * 1000)}`, // Mock ID for demo
            entityName: newPayment.entityName,
            entityType: newPayment.entityType,
            type: newPayment.type,
            amount: newPayment.amount,
            paymentMode: newPayment.paymentMode,
            referenceNumber: newPayment.referenceNumber,
            status: 'Completed',
            purpose: newPayment.purpose
        };

        addPayment(payment);
        toast({ message: `Transaction ${payment.id} recorded successfully!`, variant: 'success' });
        setIsModalOpen(false);
        setNewPayment({
            entityName: '',
            entityType: 'Farmer',
            type: 'Inbound',
            amount: 0,
            paymentMode: 'Bank Transfer',
            referenceNumber: '',
            purpose: 'Input Sales'
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Billing & Payments Ledger</h2>
                    <p className="text-sm text-slate-500 mt-1">Track all inbound/outbound cash flows across farmers, buyers, and suppliers.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            toast({ message: 'Statement exported to CSV', variant: 'success' });
                            exportToCsv('fpo_billing_ledger', state.payments);
                        }}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <Download size={16} /> Export Statement
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> New Transaction
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-emerald-50 border-emerald-100">
                    <CardContent className="p-5">
                        <div className="text-emerald-800 text-sm font-medium mb-1">Inbound (Collected) YTD</div>
                        <div className="text-2xl font-bold text-emerald-900">₹{totalInbound.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="bg-amber-50 border-amber-100">
                    <CardContent className="p-5">
                        <div className="text-amber-800 text-sm font-medium mb-1">Outbound (Paid) YTD</div>
                        <div className="text-2xl font-bold text-amber-900">₹{totalOutbound.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5">
                        <div className="text-slate-500 text-sm font-medium mb-1">Net Cash Flow</div>
                        <div className={`text-2xl font-bold ${(totalInbound - totalOutbound) > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            ₹{(totalInbound - totalOutbound).toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-red-100 bg-red-50/30">
                    <CardContent className="p-5">
                        <div className="text-red-700 text-sm font-medium mb-1">Pending/Processing Transactions</div>
                        <div className="text-2xl font-bold text-red-800">{pendingPayments} Needs Action</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 gap-4">
                    <CardTitle>Master Ledger</CardTitle>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search transaction ID or entity..."
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
                                    <th className="px-6 py-3 font-medium text-slate-500">Transaction ID & Date</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Entity</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Purpose & Mode</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Amount (₹)</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredPayments.map(payment => (
                                    <tr key={payment.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800">{payment.id}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">{new Date(payment.date).toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-700">{payment.entityName}</div>
                                            <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5 tracking-wider">{payment.entityType}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-700">{payment.purpose}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">Mode: {payment.paymentMode} ({payment.referenceNumber})</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className={`font-bold ${payment.type === 'Inbound' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                                {payment.type === 'Inbound' ? '+' : '-'} {payment.amount.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={
                                                payment.status === 'Completed' ? 'success' :
                                                    payment.status === 'Failed' ? 'danger' : 'warning'
                                            }>
                                                {payment.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => toast({ message: `Generating receipt for ${payment.id}...`, variant: 'info' })}
                                                className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                Receipt
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredPayments.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-slate-500 bg-slate-50/50">
                                            No transactions found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* New Transaction Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-bold text-slate-900">Record New Transaction</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddTransaction} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Transaction Type</label>
                                    <select
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newPayment.type}
                                        onChange={(e) => setNewPayment({ ...newPayment, type: e.target.value as any })}
                                    >
                                        <option value="Inbound">Inbound (Money In)</option>
                                        <option value="Outbound">Outbound (Money Out)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Purpose</label>
                                    <select
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newPayment.purpose}
                                        onChange={(e) => setNewPayment({ ...newPayment, purpose: e.target.value as any })}
                                    >
                                        <option value="Input Sales">Input Sales</option>
                                        <option value="Crop Procurement">Crop Procurement</option>
                                        <option value="Share Capital">Share Capital</option>
                                        <option value="Service Fee">Service Fee</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Entity Type</label>
                                    <select
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newPayment.entityType}
                                        onChange={(e) => setNewPayment({ ...newPayment, entityType: e.target.value as any })}
                                    >
                                        <option value="Farmer">Farmer</option>
                                        <option value="Buyer">Buyer</option>
                                        <option value="Supplier">Supplier</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Entity Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Ramesh Kumar"
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newPayment.entityName}
                                        onChange={(e) => setNewPayment({ ...newPayment, entityName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700"
                                        value={newPayment.amount || ''}
                                        onChange={(e) => setNewPayment({ ...newPayment, amount: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Payment Mode</label>
                                    <select
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newPayment.paymentMode}
                                        onChange={(e) => setNewPayment({ ...newPayment, paymentMode: e.target.value as any })}
                                    >
                                        <option value="Bank Transfer">Bank Transfer / NEFT</option>
                                        <option value="UPI">UPI / QR Code</option>
                                        <option value="Cash">Cash Handover</option>
                                        <option value="Cheque">Cheque</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Reference Number (UTR / Cheque No.)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. UTR-9876543210"
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm uppercase"
                                    value={newPayment.referenceNumber}
                                    onChange={(e) => setNewPayment({ ...newPayment, referenceNumber: e.target.value })}
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm">Record Transaction</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
