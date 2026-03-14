import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ShieldCheck, Database, Download, AlertTriangle, CheckCircle2, Lock, FileText, EyeOff, Server, HardDrive, Key } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { exportToCsv } from '../../utils/exportUtils';

export default function AdminDataPrivacyContent() {
    const { toast } = useToast();
    const { state } = useAdminStore();

    // Delete Confirmation State
    const [deleteStep, setDeleteStep] = useState<0 | 1 | 2>(0);
    const [confirmName, setConfirmName] = useState('');
    const fpoName = "Sikandrabad FPC Ltd"; // Default from prototype

    const handleExportCategory = (category: string, filename: string, datakey: string) => {
        toast({ message: `Preparing ${category} export...`, variant: 'success' });
        if (state[datakey] && state[datakey].length > 0) {
            exportToCsv(filename, state[datakey]);
        } else {
            toast({ message: `No data found in ${category} to export.`, variant: 'info' });
        }
    };

    const handleExportAll = () => {
        toast({ message: 'Initiating full database export...', variant: 'success' });
        if (state.farmers && state.farmers.length > 0) exportToCsv('fpo_farmers_export', state.farmers);
        if (state.orders && state.orders.length > 0) exportToCsv('fpo_sales_orders_export', state.orders);
        if (state.payments && state.payments.length > 0) exportToCsv('fpo_payments_ledger_export', state.payments);
        if (state.inventory && state.inventory.length > 0) exportToCsv('fpo_inventory_export', state.inventory);
        if (state.staff && state.staff.length > 0) exportToCsv('fpo_staff_export', state.staff);
    };

    const handleDeleteSequence = () => {
        if (confirmName !== fpoName) {
            toast({ message: 'FPO name does not match.', variant: 'error' });
            return;
        }
        toast({ message: 'Initiating data wipe...', variant: 'warning' });
        setTimeout(() => {
            localStorage.removeItem('fpo_admin_state');
            toast({ message: 'All data permanently deleted. Automatically logging out...', variant: 'success' });
            setTimeout(() => window.location.reload(), 2000);
        }, 1500);
    };

    return (
        <div className="space-y-6 max-w-6xl pb-12 animate-in fade-in slide-in-from-bottom-4">

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <ShieldCheck className="text-[var(--brand)]" size={28} />
                        Data Privacy & Trust Center
                    </h2>
                    <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                        Your data is your property. Krishi Kutumb operates on a zero-access architecture. This dashboard provides complete transparency and control over your FPO's information.
                    </p>
                </div>
            </div>

            {/* 1. Database Isolation Visualizer */}
            <Card className="border-[var(--brand-muted)] shadow-md overflow-hidden bg-white">
                <CardHeader className="bg-[var(--brand-wash)] border-b border-[var(--brand-pale)]">
                    <CardTitle className="text-lg text-[var(--brand)] flex items-center gap-2">
                        <Server size={20} />
                        Cryptographic Tenant Isolation (Visual Proof)
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 h-full">

                        {/* FPO 1 */}
                        <div className="flex-1 w-full bg-slate-50 rounded-xl p-5 border border-slate-200 relative group">
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shadow-sm border border-emerald-200">
                                <Lock className="w-4 h-4 text-emerald-600" />
                            </div>
                            <h4 className="font-semibold text-slate-800 text-sm mb-3 text-center">Other FPO Data Silo</h4>
                            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-mono select-none blur-[1px]">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="bg-slate-200 h-2 rounded w-full"></div>
                                ))}
                            </div>
                            <div className="mt-4 text-center">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-200 text-slate-600">
                                    Encrypted & Locked
                                </span>
                            </div>
                        </div>

                        {/* Connection line block */}
                        <div className="hidden lg:flex flex-col items-center opacity-50 px-4">
                            <div className="h-[2px] w-12 bg-slate-300 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                    <EyeOff size={16} className="text-slate-400" />
                                </div>
                            </div>
                        </div>

                        {/* YOUR FPO */}
                        <div className="flex-[1.5] w-full bg-indigo-50/50 rounded-xl p-6 border-2 border-indigo-200 shadow-md relative group transform transition-transform hover:scale-105">
                            <div className="absolute -top-4 -right-4 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center shadow-sm border border-indigo-300 z-10">
                                <Key className="w-5 h-5 text-indigo-700 hover:rotate-90 transition-transform duration-500" />
                            </div>
                            <div className="text-center mb-4">
                                <h4 className="font-bold text-indigo-900 text-base">{fpoName} Silo</h4>
                                <p className="text-xs text-indigo-600/80 mt-1">Dedicated Tenant Database</p>
                            </div>
                            <div className="flex items-center justify-center gap-4">
                                <HardDrive className="text-indigo-400 w-12 h-12" />
                            </div>
                            <div className="mt-4 bg-white/60 p-3 rounded-lg border border-indigo-100 text-xs text-indigo-900 text-center font-medium shadow-inner">
                                Accessible ONLY via your FPO Admin Accounts
                            </div>
                        </div>

                        {/* Connection line block */}
                        <div className="hidden lg:flex flex-col items-center opacity-50 px-4">
                            <div className="h-[2px] w-12 bg-slate-300 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                    <EyeOff size={16} className="text-slate-400" />
                                </div>
                            </div>
                        </div>

                        {/* Platform Admin */}
                        <div className="flex-1 w-full bg-slate-800 rounded-xl p-5 border border-slate-700 relative text-white">
                            <h4 className="font-semibold text-slate-200 text-sm mb-3 flex items-center gap-2 justify-center">
                                <Server size={14} /> Krishi Kutumb Server
                            </h4>
                            <div className="space-y-2 mt-4">
                                <div className="bg-slate-700 rounded px-3 py-2 text-xs flex justify-between">
                                    <span className="text-slate-400">Total FPOs</span>
                                    <span className="font-mono">342</span>
                                </div>
                                <div className="bg-slate-700 rounded px-3 py-2 text-xs flex justify-between">
                                    <span className="text-slate-400">Total Farmers</span>
                                    <span className="font-mono">41,200</span>
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                                    <Lock size={10} /> No Field-level Access
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-3 bg-blue-50/50 p-4 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h5 className="text-sm font-semibold text-blue-900">What this means:</h5>
                            <p className="text-sm text-blue-700/80 mt-0.5">Your data resides in a dedicated, isolated database schema. Other FPOs cannot query your data, and Krishi Kutumb's platform administrators can only see aggregated metrics (like total active FPOs) without seeing individual farmer names, locations, or crop details.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>


            {/* 2. What we see vs what you see */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-emerald-200 bg-emerald-50/30">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2 text-emerald-800">
                            <Database size={18} /> What You Control & See
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-emerald-100">
                            <span className="text-sm font-medium text-slate-700">Farmer Names & Profiles</span>
                            <CheckCircle2 size={16} className="text-emerald-600" />
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-emerald-100">
                            <span className="text-sm font-medium text-slate-700">Phone Numbers & Contact Info</span>
                            <CheckCircle2 size={16} className="text-emerald-600" />
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-emerald-100">
                            <span className="text-sm font-medium text-slate-700">Individual Crop Yield & Land Size</span>
                            <CheckCircle2 size={16} className="text-emerald-600" />
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-emerald-100">
                            <span className="text-sm font-medium text-slate-700">Financial Ledger & Transactions</span>
                            <CheckCircle2 size={16} className="text-emerald-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 bg-slate-50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2 text-slate-600">
                            <EyeOff size={18} /> What Platform Admins See
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-slate-100 opacity-60">
                            <span className="text-sm text-slate-500 line-through">Farmer Names & Profiles</span>
                            <Lock size={14} className="text-slate-400" />
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-slate-100 opacity-60">
                            <span className="text-sm text-slate-500 line-through">Phone Numbers & Contact Info</span>
                            <Lock size={14} className="text-slate-400" />
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-slate-100">
                            <span className="text-sm text-slate-700">Total FPO Member Count (Aggregated)</span>
                            <CheckCircle2 size={16} className="text-slate-400" />
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-slate-100">
                            <span className="text-sm text-slate-700">Total System Transactions (Aggregated)</span>
                            <CheckCircle2 size={16} className="text-slate-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Export Data Engine */}
            <Card>
                <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Download size={20} className="text-[var(--brand)]" />
                        Data Export Center
                    </CardTitle>
                    <p className="text-sm text-slate-500 mt-1">Download your data at any time in standard, portable formats (CSV).</p>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[var(--brand-muted)] transition-colors cursor-pointer group" onClick={() => handleExportCategory('Farmers', 'fpo_farmers', 'farmers')}>
                            <div className="text-sm font-semibold text-slate-800 mb-1 group-hover:text-[var(--brand)]">Farmers Directory</div>
                            <div className="text-xs text-slate-500 flex justify-between items-center">
                                Profiles & Demographics
                                <Download size={14} className="text-slate-300 group-hover:text-[var(--brand)]" />
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[var(--brand-muted)] transition-colors cursor-pointer group" onClick={() => handleExportCategory('Procurements', 'fpo_procurement', 'inventory')}>
                            <div className="text-sm font-semibold text-slate-800 mb-1 group-hover:text-[var(--brand)]">Procurement Log</div>
                            <div className="text-xs text-slate-500 flex justify-between items-center">
                                Harvest & Intake Data
                                <Download size={14} className="text-slate-300 group-hover:text-[var(--brand)]" />
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[var(--brand-muted)] transition-colors cursor-pointer group" onClick={() => handleExportCategory('Input Sales', 'fpo_sales', 'orders')}>
                            <div className="text-sm font-semibold text-slate-800 mb-1 group-hover:text-[var(--brand)]">Input Sales Ledgers</div>
                            <div className="text-xs text-slate-500 flex justify-between items-center">
                                Fertilizer & Seed transactions
                                <Download size={14} className="text-slate-300 group-hover:text-[var(--brand)]" />
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[var(--brand-muted)] transition-colors cursor-pointer group" onClick={() => handleExportCategory('Staff', 'fpo_staff', 'staff')}>
                            <div className="text-sm font-semibold text-slate-800 mb-1 group-hover:text-[var(--brand)]">Staff & Operations</div>
                            <div className="text-xs text-slate-500 flex justify-between items-center">
                                Users & Activity Logs
                                <Download size={14} className="text-slate-300 group-hover:text-[var(--brand)]" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="text-sm font-bold border-b border-transparent inline-block pb-0.5 text-slate-900 border-dashed hover:border-slate-800">Master Export</h4>
                            <p className="text-sm text-slate-500 mt-1">Download a completely packaged zip file of all tables, attachments, and logs associated with your FPO.</p>
                        </div>
                        <button
                            onClick={handleExportAll}
                            className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg flex items-center gap-2"
                        >
                            <Download size={16} /> Download Full Archive (CSV)
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* 4. NDA Agreement */}
            <Card>
                <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between pb-4">
                    <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <FileText size={20} className="text-slate-600" />
                            Mutual Data Promise Agreement
                        </CardTitle>
                        <p className="text-sm text-slate-500 mt-1">Our legally binding commitment to your data security and ownership.</p>
                    </div>
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-md flex items-center gap-1">
                        <Download size={14} /> Download PDF
                    </button>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="bg-slate-50 p-6 font-mono text-sm text-slate-700 h-64 overflow-y-auto" style={{ lineHeight: '1.8' }}>
                        <p className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">Krishi Kutumb Data Processing Agreement v2.1</p>
                        <p className="mb-4">This agreement is entered into between Krishi Kutumb ("Provider") and {fpoName} ("Customer").</p>
                        <div className="space-y-4 pl-4 border-l-2 border-slate-300">
                            <div>
                                <strong className="text-slate-900 block mb-1">1. DATA OWNERSHIP AND RIGHTS</strong>
                                The Customer retains exclusively all rights, title and interest in and to all Customer Data. The Provider acquires no rights in the Customer Data other than the limited right to process it as necessary to provide the Services.
                            </div>
                            <div>
                                <strong className="text-slate-900 block mb-1">2. NO MONETIZATION PROMISE</strong>
                                Under no circumstances will the Provider sell, rent, lease, or monetize Customer Data or Personally Identifiable Information (PII) to any third party, marketing agency, or unapproved entity.
                            </div>
                            <div>
                                <strong className="text-slate-900 block mb-1">3. RESTRICTION OF ACCESS</strong>
                                The Provider will restrict internal access to Customer Data to strictly technical operations required for platform maintenance. Provider's human operators possess zero-access privileges to readable, unencrypted PII contained within the Customer Data.
                            </div>
                            <div>
                                <strong className="text-slate-900 block mb-1">4. RETURN & DELETION (RIGHT TO BE FORGOTTEN)</strong>
                                Upon termination of services, or upon explicit trigger of the "Purge Protocol" by the Customer via the platform, the Provider shall securely overwrite and permanently delete all active Customer Data within 30 days, across all production and backup architectures.
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 5. Danger Zone - Red Delete Button */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="mt-1">
                        <div className="bg-white p-2 rounded-full border border-red-200 shadow-sm">
                            <AlertTriangle className="text-red-500 w-6 h-6" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-red-900">Danger Zone: Permanent Data Wipe</h3>
                        <p className="text-sm text-red-700 mt-1 max-w-3xl">This action will completely and irreversibly erase all farmer records, procurement data, financial ledgers, and staff logins associated with {fpoName} from Krishi Kutumb's servers.</p>

                        {deleteStep === 0 && (
                            <button
                                onClick={() => setDeleteStep(1)}
                                className="mt-4 bg-white border border-red-300 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
                            >
                                Initiate Permanent Delete
                            </button>
                        )}

                        {deleteStep === 1 && (
                            <div className="mt-6 bg-white p-5 rounded-lg border border-red-200 shadow-inner animate-in fade-in slide-in-from-top-2">
                                <h4 className="font-bold text-slate-900 text-sm mb-3">Verification Required</h4>
                                <p className="text-xs text-slate-600 mb-4">Please type <strong className="bg-slate-100 px-1 py-0.5 rounded font-mono select-all">{fpoName}</strong> to confirm deletion.</p>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                                        placeholder="Type FPO name here"
                                        value={confirmName}
                                        onChange={(e) => setConfirmName(e.target.value)}
                                    />
                                    <button
                                        onClick={() => setDeleteStep(2)}
                                        disabled={confirmName !== fpoName}
                                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-bold transition-colors"
                                    >
                                        Verify Target
                                    </button>
                                </div>
                                <button onClick={() => { setDeleteStep(0); setConfirmName(''); }} className="mt-4 text-sm text-slate-500 hover:text-slate-800 underline">Cancel completely</button>
                            </div>
                        )}

                        {deleteStep === 2 && (
                            <div className="mt-6 bg-red-100 p-5 rounded-lg border-2 border-red-300 shadow-inner animate-in fade-in zoom-in-95">
                                <h4 className="font-bold text-red-900 text-base mb-2">Final Protective Warning</h4>
                                <p className="text-sm text-red-800 mb-5">You are about to execute a permanent purge. Backups cannot be restored after this action. Are you absolutely certain?</p>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleDeleteSequence}
                                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-md text-sm font-bold shadow-md shadow-red-600/20 active:scale-95 transition-all"
                                    >
                                        Yes, Erase All My Data Now
                                    </button>
                                    <button onClick={() => { setDeleteStep(0); setConfirmName(''); }} className="text-sm font-medium text-slate-600 hover:text-slate-900">
                                        Abort Sequence
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
