import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Users, CheckCircle2, IndianRupee, MapPin, Search, AlertTriangle, MessageSquare } from 'lucide-react';
import { mockStaff } from '../../data/mock/staff';

export default function ModeratorHome({
    onViewTasks,
    onViewFarmers,
    onPushAdvisory,
    onFlagIssue
}: {
    onViewTasks: () => void,
    onViewFarmers: () => void,
    onPushAdvisory: () => void,
    onFlagIssue: () => void
}) {
    // Mock data for the logged in moderator
    const moderator = mockStaff.find(s => s.role === 'Moderator' || s.role === 'Field Officer' as any) || mockStaff[0];

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header Profile Section */}
            <div className="bg-emerald-600 -mx-4 -mt-4 px-4 pt-10 pb-6 text-white rounded-b-2xl shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40 text-lg font-bold">
                        {moderator.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">{moderator.name}</h2>
                        <p className="text-emerald-100 text-sm flex items-center gap-1">
                            <MapPin size={12} /> {moderator.cluster}
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Search */}
            <div className="relative -mt-8 mx-2 shadow-lg rounded-xl z-20">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border-0 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm"
                    placeholder="Search farmer by name or phone..."
                    onFocus={onViewFarmers}
                />
            </div>

            {/* Target Progress */}
            <div className="pt-2">
                <h3 className="font-bold text-slate-800 px-1 mb-2">Today's Progress</h3>
                <div className="grid grid-cols-2 gap-3">
                    <Card className="border-0 shadow-sm ring-1 ring-slate-100 bg-gradient-to-br from-white to-slate-50" onClick={onViewTasks}>
                        <CardContent className="p-3">
                            <div className="flex justify-between items-start mb-2">
                                <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                                    <CheckCircle2 size={18} />
                                </div>
                                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                                    {Math.round((moderator.tasksCompleted / moderator.tasksAssigned) * 100)}%
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-slate-800">{moderator.tasksCompleted}<span className="text-sm font-medium text-slate-400">/{moderator.tasksAssigned}</span></div>
                            <div className="text-[11px] text-slate-500 font-medium">Tasks Completed</div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm ring-1 ring-slate-100 bg-gradient-to-br from-white to-slate-50" onClick={onViewFarmers}>
                        <CardContent className="p-3">
                            <div className="flex justify-between items-start mb-2">
                                <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                                    <Users size={18} />
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-slate-800">45</div>
                            <div className="text-[11px] text-slate-500 font-medium">Farmers Visited (MTD)</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Actionable Insights */}
            <div>
                <h3 className="font-bold text-slate-800 px-1 mb-2">Action Items</h3>
                <div className="space-y-3">
                    <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex gap-3 items-center shadow-sm cursor-pointer hover:bg-red-100 transition-colors" onClick={onFlagIssue}>
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
                            <AlertTriangle size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 text-sm">Issue Escalation</h4>
                            <p className="text-xs text-slate-600 truncate">Tap to flag a critical field issue.</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-3 items-center shadow-sm cursor-pointer hover:bg-blue-100 transition-colors" onClick={onPushAdvisory}>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                            <MessageSquare size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 text-sm">Push Advisory to Cluster</h4>
                            <p className="text-xs text-slate-600 truncate">Weather alert for your villages.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
