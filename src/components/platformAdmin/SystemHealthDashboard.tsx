import React from 'react';
import { Activity, Server, Database, Globe, ArrowUpRight, ArrowDownRight, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export default function SystemHealthDashboard() {
    const { toast } = useToast();
    const metrics = [
        { label: 'Platform Uptime', value: '99.98%', target: '99.9%', status: 'success', change: '+0.01%' },
        { label: 'API Latency (Avg)', value: '142ms', target: '< 200ms', status: 'success', change: '-12ms' },
        { label: 'Error Rate (5xx)', value: '0.04%', target: '< 0.1%', status: 'success', change: '-0.02%' },
        { label: 'Active Sessions', value: '4,102', target: 'N/A', status: 'neutral', change: '+450' },
    ];

    const services = [
        { name: 'Core API Gateway', status: 'Operational', uptime: '100%', latency: '45ms' },
        { name: 'Identity & Auth (Supabase)', status: 'Operational', uptime: '99.99%', latency: '85ms' },
        { name: 'PostgreSQL Database', status: 'Operational', uptime: '99.95%', latency: '12ms' },
        { name: 'Redis Cache', status: 'Operational', uptime: '100%', latency: '2ms' },
        { name: 'Plant Saathi AI Engine', status: 'Degraded', uptime: '98.5%', latency: '850ms' },
        { name: 'Mandi Price Sync Worker', status: 'Operational', uptime: '100%', latency: 'N/A' },
        { name: 'WhatsApp Gateway (Twilio)', status: 'Operational', uptime: '99.9%', latency: '210ms' },
        { name: 'Storage (S3)', status: 'Operational', uptime: '100%', latency: '35ms' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <div className="text-sm font-medium text-slate-500 mb-1">{metric.label}</div>
                        <div className="flex items-end justify-between">
                            <div className="text-3xl font-bold text-slate-900">{metric.value}</div>
                            <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${metric.change.startsWith('+') && metric.status === 'success' ? 'text-emerald-700 bg-emerald-50' :
                                metric.change.startsWith('-') && metric.status === 'success' ? 'text-emerald-700 bg-emerald-50' :
                                    'text-slate-600 bg-slate-100'
                                }`}>
                                {metric.change.startsWith('+') ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
                                {metric.change.replace(/[+-]/, '')}
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-slate-400 flex justify-between items-center border-t border-slate-100 pt-3">
                            <span>Target: {metric.target}</span>
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> On Track
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                            <Server size={18} className="text-indigo-500" />
                            Service Status Map
                        </h3>
                        <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                            <CheckCircle2 size={14} /> All Systems Operational (Mostly)
                        </span>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
                                <tr>
                                    <th className="px-6 py-3">Service</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Uptime (30d)</th>
                                    <th className="px-6 py-3">Avg Latency</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {services.map((service, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-3">
                                            {service.name.includes('Database') ? <Database size={16} className="text-slate-400" /> :
                                                service.name.includes('API') || service.name.includes('Auth') ? <Globe size={16} className="text-slate-400" /> :
                                                    <Activity size={16} className="text-slate-400" />}
                                            {service.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {service.status === 'Operational' ? (
                                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                                                    <CheckCircle2 size={14} /> Operational
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-md">
                                                    <AlertTriangle size={14} /> Degraded
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{service.uptime}</td>
                                        <td className="px-6 py-4 text-slate-600">{service.latency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="border-b border-slate-100 px-6 py-4">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                            <Clock size={18} className="text-slate-500" />
                            Recent Incidents
                        </h3>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="space-y-6">
                            <div className="relative pl-6 border-l-2 border-amber-300">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-100 border-2 border-amber-500 flex items-center justify-center"></div>
                                <h4 className="text-sm font-semibold text-slate-900">Plant Saathi AI API Latency Spike</h4>
                                <p className="text-xs text-slate-500 mt-1 mb-2">Image inference times exceeded 2000ms due to high concurrent load from 3 FPOs scanning diseases simultaneously.</p>
                                <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">Investigating</span>
                                <span className="text-xs text-slate-400 ml-3">30 mins ago</span>
                            </div>

                            <div className="relative pl-6 border-l-2 border-slate-200">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-100 border-2 border-slate-300"></div>
                                <h4 className="text-sm font-semibold text-slate-900">SMS Gateway Timeout (Twilio)</h4>
                                <p className="text-xs text-slate-500 mt-1 mb-2">Brief 5-minute window where outbound OTP SMS messages failed to send. Auto-retries succeeded.</p>
                                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">Resolved</span>
                                <span className="text-xs text-slate-400 ml-3">Yesterday, 14:30</span>
                            </div>
                        </div>

                        <button
                            onClick={() => toast({ message: 'Redirecting to external status page...', variant: 'info' })}
                            className="mt-auto w-full py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors mt-6"
                        >
                            View Status Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
