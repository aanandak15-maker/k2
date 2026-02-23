import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { ChevronLeft, Send, MessageSquare, AlertTriangle, CloudRain, Check } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function ModeratorAdvisoryPush({ clusterName, onBack }: { clusterName: string, onBack: () => void }) {
    const [selectedCrop, setSelectedCrop] = useState('Wheat');
    const [selectedTopic, setSelectedTopic] = useState('Pest Control');
    const [message, setMessage] = useState('Yellow Rust alert in neighboring district. Spray Propiconazole 25% EC @ 1ml/liter water preventatively.');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => onBack(), 2000);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Advisory Broadcasted</h2>
                <p className="text-center text-slate-500 text-sm">Successfully pushed to 142 farmers in {clusterName} via SMS.</p>
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
                    <h2 className="font-bold text-slate-900 truncate">Push Advisory</h2>
                    <div className="text-xs text-slate-500">Target: {clusterName} (142 Farmers)</div>
                </div>
            </div>

            <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <Card className="border-0 shadow-sm bg-blue-50/50 border border-blue-100 cursor-pointer hover:bg-blue-50 transition-colors">
                        <CardContent className="p-3">
                            <CloudRain size={20} className="text-blue-500 mb-2" />
                            <div className="font-semibold text-sm text-blue-900">Weather Alert</div>
                            <div className="text-xs text-blue-700 mt-1">Rain expected tonight</div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm bg-red-50/50 border border-red-100 cursor-pointer hover:bg-red-50 transition-colors">
                        <CardContent className="p-3">
                            <AlertTriangle size={20} className="text-red-500 mb-2" />
                            <div className="font-semibold text-sm text-red-900">Pest Warning</div>
                            <div className="text-xs text-red-700 mt-1">Aphid spread high</div>
                        </CardContent>
                    </Card>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-4 space-y-4">

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Crop</label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        value={selectedCrop}
                                        onChange={(e) => setSelectedCrop(e.target.value)}
                                    >
                                        <option>Wheat</option>
                                        <option>Mustard</option>
                                        <option>Paddy</option>
                                        <option>All Crops</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Topic</label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        value={selectedTopic}
                                        onChange={(e) => setSelectedTopic(e.target.value)}
                                    >
                                        <option>Pest Control</option>
                                        <option>Fertilizer Schedule</option>
                                        <option>Irrigation Warning</option>
                                        <option>Mandi Price Update</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                                    <MessageSquare size={16} className="text-slate-400" />
                                    SMS Message Content
                                </label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed"
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                                <div className="flex justify-between mt-1.5 text-xs text-slate-500">
                                    <span>Language: <button type="button" onClick={() => toast({ message: 'Translating to Hindi...', variant: 'info' })} className="text-emerald-600 font-medium hover:underline">Translate to Hindi</button></span>
                                    <span>{message.length}/160 chars (1 SMS)</span>
                                </div>
                            </div>

                        </CardContent>
                    </Card>

                    <button
                        type="submit"
                        disabled={isSubmitting || !message}
                        className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-sm shadow-emerald-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
                    >
                        {isSubmitting ? 'Trasmitting...' : (
                            <>
                                <Send size={18} /> Push to 142 Farmers
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
