import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { ChevronLeft, Camera, Check, AlertTriangle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function ModeratorIssueFlagging({ farmerName, onBack }: { farmerName: string, onBack: () => void }) {
    const [issueType, setIssueType] = useState('Pest Infestation');
    const [severity, setSeverity] = useState('Medium');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => onBack(), 1500);
        }, 1200);
    };

    if (isSuccess) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Issue Flagged</h2>
                <p className="text-center text-slate-500 text-sm">Escalated to FPO Admin for review.</p>
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
                    <h2 className="font-bold text-slate-900 truncate">Flag Issue</h2>
                    <div className="text-xs text-slate-500">For: {farmerName}</div>
                </div>
            </div>

            <div className="p-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-3 items-start mb-4">
                    <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">
                        Flagging an issue will alert the FPO Admin and CEO immediately on their command center dashboards.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4 space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Issue Type</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                    value={issueType}
                                    onChange={(e) => setIssueType(e.target.value)}
                                >
                                    <option>Pest Infestation</option>
                                    <option>Crop Disease</option>
                                    <option>Water Shortage</option>
                                    <option>Input Quality Complaint</option>
                                    <option>Default Risk (Payment)</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Severity</label>
                                <div className="flex gap-2">
                                    {['Low', 'Medium', 'High', 'Critical'].map(level => {
                                        let colorClass = "focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-emerald-50 focus:text-emerald-700";
                                        if (level === 'High') colorClass = "focus:ring-orange-500/20 focus:border-orange-500 focus:bg-orange-50 focus:text-orange-700";
                                        if (level === 'Critical') colorClass = "focus:ring-red-500/20 focus:border-red-500 focus:bg-red-50 focus:text-red-700";

                                        return (
                                            <button
                                                type="button"
                                                key={level}
                                                onClick={() => setSeverity(level)}
                                                className={`flex-1 py-2 bg-slate-50 border rounded-lg text-xs font-medium transition-colors ${severity === level
                                                    ? level === 'High' ? 'bg-orange-50 border-orange-500 text-orange-700' :
                                                        level === 'Critical' ? 'bg-red-50 border-red-500 text-red-700' :
                                                            'bg-emerald-50 border-emerald-500 text-emerald-700'
                                                    : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                                                    }`}
                                            >
                                                {level}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                    rows={4}
                                    placeholder="Provide specific details about the issue..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Attach Evidence</label>
                                <button type="button" onClick={() => toast({ message: 'Camera opened for evidence capture', variant: 'info' })} className="w-full border-2 border-dashed border-slate-200 bg-slate-50 rounded-lg py-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                                    <Camera size={24} className="mb-2 text-slate-400" />
                                    <span className="text-xs font-semibold">Take Photo</span>
                                    <span className="text-[10px] text-slate-400 mt-1">Required for pest/disease issues</span>
                                </button>
                            </div>

                        </CardContent>
                    </Card>

                    <button
                        type="submit"
                        disabled={isSubmitting || !description}
                        className={`w-full text-white font-bold py-3.5 rounded-xl shadow-sm transition-all disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 ${severity === 'Critical' || severity === 'High' ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                            }`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Escalation'}
                    </button>
                </form>
            </div>
        </div>
    );
}
