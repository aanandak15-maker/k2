import React from 'react';
import { useToast } from '../../hooks/useToast';
import { ArrowLeft, ExternalLink, ShieldCheck, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import CEODashboardContent from '../ceo/CEODashboardContent';
import CEOAnalyticsContent from '../ceo/CEOAnalyticsContent';
import CEOFarmersContent from '../ceo/CEOFarmersContent';

interface FPODetailViewProps {
    fpoId: string;
    fpoName: string;
    onBack: () => void;
}

export default function FPODetailView({ fpoId, fpoName, onBack }: FPODetailViewProps) {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = React.useState<'overview' | 'analytics' | 'farmers'>('overview');

    const handleImpersonate = () => {
        toast({ message: `Entering read-only mirror mode for ${fpoName}. Audit logging active.`, variant: 'warning' });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">

            {/* Platform Admin Override Header */}
            <div className="bg-slate-900 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800 shadow-lg relative overflow-hidden">

                {/* Decorative background element */}
                <div className="absolute -right-10 -top-10 text-slate-800/30">
                    <ShieldCheck size={120} />
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <button
                        onClick={onBack}
                        className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 uppercase tracking-wider border border-amber-500/30">
                                Platform Admin Override
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-white mt-1 translate-y-0.5">{fpoName} <span className="text-slate-500 font-mono text-sm ml-2">{fpoId}</span></h2>
                    </div>
                </div>

                <div className="flex items-center gap-3 relative z-10">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <Activity className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs text-slate-300">Live Mirroring Active</span>
                    </div>
                    <button
                        onClick={handleImpersonate}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-indigo-900/20 shadow-lg border border-indigo-500"
                    >
                        <ExternalLink size={16} />
                        Impersonate CEO
                    </button>
                </div>
            </div>

            {/* Mirror Navigation */}
            <div className="flex space-x-1 border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${activeTab === 'overview' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    K2 Core Dashboard
                    {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 rounded-t-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('analytics')}
                    className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${activeTab === 'analytics' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    Deep Analytics
                    {activeTab === 'analytics' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 rounded-t-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('farmers')}
                    className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${activeTab === 'farmers' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    Farmer Intelligence Base
                    {activeTab === 'farmers' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 rounded-t-full"></div>}
                </button>
            </div>

            <div className="pt-2 relative pointer-events-none">
                {/* Read-only mirroring style applies pointer-events-none to prevent edits from the mirror view */}
                <div className="opacity-90 grayscale-[20%]">
                    {activeTab === 'overview' && <CEODashboardContent setActiveSection={() => { }} />}
                    {activeTab === 'analytics' && <CEOAnalyticsContent />}
                    {activeTab === 'farmers' && <CEOFarmersContent />}
                </div>
            </div>
        </div>
    );
}
