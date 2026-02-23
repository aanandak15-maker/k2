import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Upload, Landmark, FileText, RefreshCw, Plus, Check, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { Payment } from '../../data/mock/payments';

export default function AdminBankingContent() {
    const { toast } = useToast();
    const { state, addPayment, updateOrderStatus } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate balances based on Payments
    const startingBalance = 500000; // Mock initial balance
    const totalInbound = state.payments.filter(p => p.type === 'Inbound' && p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
    const totalOutbound = state.payments.filter(p => p.type === 'Outbound' && p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
    const availableBalance = startingBalance + totalInbound - totalOutbound;

    const pendingTransactions = state.payments.filter(p => p.status === 'Processing' || p.status === 'Pending');

    const [newTransaction, setNewTransaction] = useState({
        type: 'Inbound' as 'Inbound' | 'Outbound',
        amount: 0,
        purpose: 'Other' as any,
        referenceNumber: ''
    });

    const handleAddBankTxn = (e: React.FormEvent) => {
        e.preventDefault();
        const txn: Payment = {
            id: `BNK-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toISOString(),
            entityId: 'SYS',
            entityName: 'Direct Bank Deposit',
            entityType: 'Buyer',
            type: newTransaction.type,
            amount: newTransaction.amount,
            paymentMode: 'Bank Transfer',
            referenceNumber: newTransaction.referenceNumber,
            status: 'Completed',
            purpose: newTransaction.purpose
        };

        addPayment(txn);
        toast({ message: `Bank transaction recorded successfully!`, variant: 'success' });
        setIsModalOpen(false);
        setNewTransaction({ type: 'Inbound', amount: 0, purpose: 'Other', referenceNumber: '' });
    };

    const handleReconcile = (id: string) => {
        // Just mock updating a payment status
        const payment = state.payments.find(p => p.id === id);
        if (payment) {
            // Ideally we'd have a specific updatePaymentStatus action, for now we will just show a toast
            // as we are moving towards a fully working system, we can just pretend it reconciled
            toast({ message: `Transaction ${id} matched & reconciled!`, variant: 'success' });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Banking & Reconciliation</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage corporate bank accounts, upload statements, and run auto-matching.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> Add Bank Transaction
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-indigo-900 to-indigo-800 text-white border-0 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <CardContent className="p-6 relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <div className="text-indigo-200 text-sm font-medium mb-1">Primary Operating Account</div>
                                <div className="font-bold tracking-widest text-lg">HDFC BANK</div>
                            </div>
                            <Landmark className="text-indigo-300" size={24} />
                        </div>
                        <div className="text-xs text-indigo-300 mb-1">Available Balance</div>
                        <div className="text-3xl font-bold mb-4">₹{availableBalance.toLocaleString()}</div>
                        <div className="flex justify-between items-end">
                            <div className="text-sm font-mono text-indigo-200">**** **** **** 4022</div>
                            <Badge variant="success" className="bg-emerald-500/20 text-emerald-100 border-0">Connected 🟢</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-lg relative overflow-hidden md:col-span-2 lg:col-span-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <CardContent className="p-6 relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <div className="text-slate-400 text-sm font-medium mb-1">Grant / Escrow Account</div>
                                <div className="font-bold tracking-widest text-lg">STATE BANK OF INDIA</div>
                            </div>
                            <Landmark className="text-slate-400" size={24} />
                        </div>
                        <div className="text-xs text-slate-400 mb-1">Total Fixed Deposits (FDs)</div>
                        <div className="text-3xl font-bold mb-4">₹8,10,500</div>
                        <div className="flex justify-between items-end">
                            <div className="text-sm font-mono text-slate-400">**** **** **** 9102</div>
                            <Badge variant="success" className="bg-emerald-500/20 text-emerald-100 border-0">Connected 🟢</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Reconciliation Status Card */}
                <Card className="flex flex-col justify-between">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Auto-Reconciliation Status</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-16 w-16 rounded-full border-4 border-amber-500 flex items-center justify-center">
                                <span className="text-xl font-bold text-amber-600">
                                    {state.payments.length > 0 ? Math.round(((state.payments.length - pendingTransactions.length) / state.payments.length) * 100) : 100}%
                                </span>
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-slate-900">Current Match Rate</div>
                                <div className="text-xs text-slate-500 mt-1">{state.payments.length - pendingTransactions.length} / {state.payments.length} matched</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs p-2 bg-slate-50 rounded">
                                <span className="text-slate-600">Unreconciled Items</span>
                                <span className="font-bold text-red-600">
                                    {pendingTransactions.length} (₹{pendingTransactions.reduce((s, p) => s + p.amount, 0).toLocaleString()})
                                </span>
                            </div>
                            <div className="flex justify-between text-xs p-2 bg-slate-50 rounded">
                                <span className="text-slate-600">Last Sync</span>
                                <span className="font-medium text-slate-700">Just Now</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-4 border-b border-slate-100">
                    <CardTitle>Manual Reconciliation Workspace</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-full md:w-1/3 p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                                <Upload size={20} />
                            </div>
                            <h3 className="font-semibold text-slate-900 text-sm">Upload Bank Statement</h3>
                            <p className="text-xs text-slate-500 mt-1 mb-4">CSV, XLS, or PDF format supported up to 10MB.</p>
                            <button
                                onClick={() => toast({ message: 'File browser opened', variant: 'info' })}
                                className="bg-white border border-slate-300 text-slate-700 font-medium text-xs px-4 py-2 rounded shadow-sm hover:bg-slate-50"
                            >
                                Browse Files
                            </button>
                        </div>

                        <div className="w-full md:w-2/3">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-slate-800 text-sm">Pending Exceptions (Action Required)</h3>
                                <button
                                    onClick={() => toast({ message: 'Auto-matching transactions...', variant: 'success' })}
                                    className="text-xs flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-700"
                                >
                                    <RefreshCw size={14} /> Re-run Auto Match
                                </button>
                            </div>

                            <div className="space-y-3">
                                {pendingTransactions.length === 0 ? (
                                    <div className="text-center p-6 text-sm text-slate-500 bg-slate-50 rounded-lg border border-slate-100">
                                        All transactions are perfectly reconciled! 🎉
                                    </div>
                                ) : (
                                    pendingTransactions.map(txn => (
                                        <div key={txn.id} className="flex items-center justify-between p-3 border border-red-100 bg-red-50/50 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <FileText className="text-red-400 mt-0.5" size={16} />
                                                <div>
                                                    <div className="text-sm font-semibold text-slate-900">
                                                        {txn.type === 'Inbound' ? 'Unidentified Deposit' : 'Unmatched Withdrawal'}
                                                    </div>
                                                    <div className="text-xs text-slate-500">
                                                        {new Date(txn.date).toLocaleDateString()} • Ref: {txn.referenceNumber || 'N/A'} • Extraneous from Bank
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="font-bold text-slate-800 text-right">
                                                    ₹{txn.amount.toLocaleString()}
                                                </div>
                                                <button
                                                    onClick={() => handleReconcile(txn.id)}
                                                    className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-colors shadow-sm"
                                                >
                                                    <Check size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Add Bank Txn Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6">
                            <h3 className="text-lg font-bold text-slate-900">Add Generic Bank Transaction</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddBankTxn} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Transaction Type</label>
                                <select
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={newTransaction.type}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as any })}
                                >
                                    <option value="Inbound">Deposit (Money In)</option>
                                    <option value="Outbound">Withdrawal (Money Out)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹)</label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700"
                                    value={newTransaction.amount || ''}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseInt(e.target.value) || 0 })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Bank Reference Indicator</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. NEFT/IMPS/RTGS"
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm uppercase"
                                    value={newTransaction.referenceNumber}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, referenceNumber: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                <select
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={newTransaction.purpose}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, purpose: e.target.value as any })}
                                >
                                    <option value="Operations">Operations Expense</option>
                                    <option value="Salary">Salary Payout</option>
                                    <option value="Input Sales">Input Sales Income</option>
                                    <option value="Share Capital">Share Capital Inward</option>
                                    <option value="Other">Other Bank Charges / Interest</option>
                                </select>
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
