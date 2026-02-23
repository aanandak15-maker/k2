import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { ChevronLeft, IndianRupee, QrCode, Building, Wallet, Check } from 'lucide-react';

export function ModeratorPaymentCollection({ farmerId, farmerName, outstandingAmount, onBack }: { farmerId: string, farmerName: string, outstandingAmount: number, onBack: () => void }) {
    const [amount, setAmount] = useState(outstandingAmount.toString());
    const [mode, setMode] = useState<'Cash' | 'UPI' | 'Bank'>('Cash');
    const [refNo, setRefNo] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API collection
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => onBack(), 1500);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Payment Collected</h2>
                <div className="text-3xl font-bold text-emerald-600 mb-2">₹{amount}</div>
                <p className="text-center text-slate-500 text-sm">Receipt sent to {farmerName} via SMS.</p>
            </div>
        );
    }

    return (
        <div className="animate-in slide-in-from-right-4 duration-300 pb-20 bg-slate-50 min-h-screen">
            <div className="sticky top-0 z-30 bg-white border-b border-slate-100 flex items-center px-2 py-3">
                <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-full text-slate-600 mr-2">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-slate-900 truncate">Collect Payment</h2>
                    <div className="text-xs text-slate-500">{farmerName}</div>
                </div>
            </div>

            <div className="p-4">
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-red-800">Total Dues</span>
                    <span className="text-xl font-bold text-red-600">₹{outstandingAmount.toLocaleString()}</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4 space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Collection Amount (₹)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <IndianRupee className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="number"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                        min="1"
                                        max={outstandingAmount}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Mode</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        type="button"
                                        className={`flex flex-col items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-colors ${mode === 'Cash' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                        onClick={() => setMode('Cash')}
                                    >
                                        <Wallet size={20} /> Cash
                                    </button>
                                    <button
                                        type="button"
                                        className={`flex flex-col items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-colors ${mode === 'UPI' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                        onClick={() => setMode('UPI')}
                                    >
                                        <QrCode size={20} /> UPI
                                    </button>
                                    <button
                                        type="button"
                                        className={`flex flex-col items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-colors ${mode === 'Bank' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                        onClick={() => setMode('Bank')}
                                    >
                                        <Building size={20} /> Bank
                                    </button>
                                </div>
                            </div>

                            {mode !== 'Cash' && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Reference / UTR Number</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        placeholder="Enter transaction ID"
                                        value={refNo}
                                        onChange={(e) => setRefNo(e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                        </CardContent>
                    </Card>

                    <button
                        type="submit"
                        disabled={isSubmitting || !amount || parseFloat(amount) <= 0 || (mode !== 'Cash' && !refNo)}
                        className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-sm shadow-emerald-600/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? 'Processing...' : `Confirm Record ₹${amount}`}
                    </button>
                </form>
            </div>
        </div>
    );
}
