import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Save, ShieldCheck, Mail, Database, Bell, ArrowRight } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { exportFullSystemData } from '../../utils/exportUtils';

export default function AdminSettingsContent() {
    const { toast } = useToast();
    const { state } = useAdminStore();

    const [settings, setSettings] = useState({
        orgName: 'Sikandrabad Kisan Producer Company Ltd.',
        cin: 'U01400UP2018PTC123456',
        address: '124, G.T. Road, Sikandrabad, Bulandshahr, Uttar Pradesh - 203205',
        email: 'contact@sikandrabad.fpo.in',
        phone: '+91 800 123 4567',
        fyStart: 'April 1st',
        currency: 'INR (₹)',
        shareValue: 100,
        creditPeriod: 30,
        smsAlerts: true,
        emailReports: true
    });

    const handleSave = () => {
        // In a real app, this would dispatch to AdminStore or an API Native fetch
        toast({ message: 'Organization Settings updated successfully!', variant: 'success' });
    };

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">FPO Settings & Configuration</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage global platform settings, notifications, and security profiles.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Save size={16} /> Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="border-b border-slate-100">
                            <CardTitle className="text-lg">Organizational Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">Organization Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        value={settings.orgName}
                                        onChange={(e) => setSettings({ ...settings, orgName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">CIN / Registration No.</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        value={settings.cin}
                                        onChange={(e) => setSettings({ ...settings, cin: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">Registered Address</label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm h-full"
                                        rows={4}
                                        value={settings.address}
                                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-4 flex flex-col justify-between">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700">Contact Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                            value={settings.email}
                                            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700">Support Phone</label>
                                        <input
                                            type="tel"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                            value={settings.phone}
                                            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="border-b border-slate-100">
                            <CardTitle className="text-lg">Financial Configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">Financial Year Start</label>
                                    <select
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        value={settings.fyStart}
                                        onChange={(e) => setSettings({ ...settings, fyStart: e.target.value })}
                                    >
                                        <option value="April 1st">April 1st</option>
                                        <option value="January 1st">January 1st</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">Base Currency</label>
                                    <select
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        value={settings.currency}
                                        onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                                    >
                                        <option value="INR (₹)">INR (₹)</option>
                                        <option value="USD ($)">USD ($)</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">Share Face Value</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        value={settings.shareValue}
                                        onChange={(e) => setSettings({ ...settings, shareValue: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">Default Credit Period (Days)</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        value={settings.creditPeriod}
                                        onChange={(e) => setSettings({ ...settings, creditPeriod: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader className="border-b border-slate-100">
                            <CardTitle className="text-lg flex items-center gap-2"><Bell size={18} /> Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-slate-900">SMS Alerts (Farmers)</div>
                                    <div className="text-xs text-slate-500 text-balance mt-1">Send automated SMS for orders & payments</div>
                                </div>
                                <div className="relative inline-block w-10 ml-2 align-middle select-none transition duration-200 ease-in mt-1 shrink-0">
                                    <input
                                        type="checkbox"
                                        name="toggle"
                                        id="toggle-sms"
                                        className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                        checked={settings.smsAlerts}
                                        onChange={(e) => setSettings({ ...settings, smsAlerts: e.target.checked })}
                                    />
                                    <label htmlFor="toggle-sms" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${settings.smsAlerts ? 'bg-emerald-500' : 'bg-slate-300'}`}></label>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4 pb-2 border-t border-slate-100 pt-4">
                                <div>
                                    <div className="text-sm font-medium text-slate-900">Email Reports (Admin)</div>
                                    <div className="text-xs text-slate-500 text-balance mt-1">Daily EOD summary emails to executives</div>
                                </div>
                                <div className="relative inline-block w-10 ml-2 align-middle select-none transition duration-200 ease-in mt-1 shrink-0">
                                    <input
                                        type="checkbox"
                                        name="toggle"
                                        id="toggle-email"
                                        className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                        checked={settings.emailReports}
                                        onChange={(e) => setSettings({ ...settings, emailReports: e.target.checked })}
                                    />
                                    <label htmlFor="toggle-email" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${settings.emailReports ? 'bg-emerald-500' : 'bg-slate-300'}`}></label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="border-b border-slate-100 pb-4">
                            <CardTitle className="text-lg flex items-center gap-2"><ShieldCheck size={18} /> Security</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div
                                onClick={() => toast({ message: 'Role Management coming in v2', variant: 'info' })}
                                className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                            >
                                <div className="text-sm font-medium text-slate-900 flex items-center justify-between">
                                    Role Permissions
                                    <ArrowRight size={14} className="text-slate-400" />
                                </div>
                                <div className="text-xs text-slate-500 mt-1">Manage access levels for Staff and Moderators</div>
                            </div>
                            <div
                                onClick={() => toast({ message: 'Audit Log View coming in v2', variant: 'info' })}
                                className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                            >
                                <div className="text-sm font-medium text-slate-900 flex items-center justify-between">
                                    Audit Log View
                                    <ArrowRight size={14} className="text-slate-400" />
                                </div>
                                <div className="text-xs text-slate-500 mt-1">Review all system data modifications</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="border-b border-slate-100 pb-4">
                            <CardTitle className="text-lg flex items-center gap-2"><Database size={18} /> Data Management</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div
                                onClick={() => {
                                    toast({ message: 'Initiating full database export to CSV...', variant: 'success' });
                                    exportFullSystemData(state);
                                }}
                                className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                            >
                                <div className="text-sm font-medium text-slate-900 flex items-center justify-between">
                                    Export All Data (CSV)
                                    <ArrowRight size={14} className="text-slate-400" />
                                </div>
                                <div className="text-xs text-slate-500 mt-1">Download complete backup of FPO records</div>
                            </div>
                            <div
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to clear all data and reset to initial mock data?')) {
                                        localStorage.removeItem('fpo_admin_state');
                                        window.location.reload();
                                    }
                                }}
                                className="p-4 hover:bg-red-50 cursor-pointer group"
                            >
                                <div className="text-sm font-medium text-red-700 flex items-center justify-between">
                                    Reset Prototype Data
                                    <ArrowRight size={14} className="text-red-400 group-hover:text-red-600" />
                                </div>
                                <div className="text-xs text-red-500 mt-1">Clear all local storage and revert to initial seeding</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Adding global CSS for toggle switches */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .toggle-checkbox:checked { right: 0; border-color: #10b981; }
                .toggle-checkbox:checked + .toggle-label { background-color: #10b981; }
                .toggle-checkbox { right: 0; z-index: 1; border-color: #e2e8f0; transition: all 0.3s; }
                .toggle-checkbox:not(:checked) { right: 20px; }
            `}} />
        </div>
    );
}
