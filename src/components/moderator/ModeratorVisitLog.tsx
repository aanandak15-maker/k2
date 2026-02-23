import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { ChevronLeft, Camera, Check } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function ModeratorVisitLog({ farmerId, farmerName, onBack }: { farmerId: string, farmerName: string, onBack: () => void }) {
    const [purpose, setPurpose] = useState('Routine Check');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [cropCondition, setCropCondition] = useState('');
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => onBack(), 1500);
        }, 1000);
    };

    if (isSuccess) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Visit Logged</h2>
                <p className="text-center text-slate-500 text-sm">Successfully recorded visit for {farmerName}.</p>
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
                    <h2 className="font-bold text-slate-900 truncate">Log Visit</h2>
                    <div className="text-xs text-slate-500">{farmerName}</div>
                </div>
            </div>

            <div className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4 space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Visit Purpose</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                    value={purpose}
                                    onChange={(e) => setPurpose(e.target.value)}
                                >
                                    <option>Routine Check</option>
                                    <option>Input Delivery</option>
                                    <option>Payment Collection</option>
                                    <option>Crop Inspection</option>
                                    <option>Advisory Follow-up</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Crop Condition</label>
                                <div className="flex gap-2">
                                    {['Excellent', 'Good', 'Fair', 'Poor'].map(cond => (
                                        <button type="button" key={cond} onClick={() => { setCropCondition(cond); toast({ message: `Crop condition set to ${cond}`, variant: 'info' }); }} className={`flex-1 py-2 bg-slate-50 border rounded-lg text-xs font-medium transition-colors ${cropCondition === cond ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                                            {cond}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Visit Notes</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                    rows={4}
                                    placeholder="Record observations, farmer requests..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Attach Photo (Optional)</label>
                                <button type="button" onClick={() => toast({ message: 'Camera opened for photo capture', variant: 'info' })} className="w-full border-2 border-dashed border-slate-200 bg-slate-50 rounded-lg py-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                                    <Camera size={24} className="mb-2 text-slate-400" />
                                    <span className="text-xs font-semibold">Tap to capture photo</span>
                                    <span className="text-[10px] text-slate-400 mt-1">Saves with GPS timestamp</span>
                                </button>
                            </div>

                        </CardContent>
                    </Card>

                    <button
                        type="submit"
                        disabled={isSubmitting || !notes}
                        className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-sm shadow-emerald-600/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Visit Record'}
                    </button>
                </form>
            </div>
        </div>
    );
}
