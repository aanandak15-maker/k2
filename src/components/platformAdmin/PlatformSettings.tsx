import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Globe, Shield, Bell, Database, Save, RotateCcw } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { Modal } from '../ui/Modal';

export default function PlatformSettings() {
    const [activeTab, setActiveTab] = useState('general');
    const [isLockdownModalOpen, setIsLockdownModalOpen] = useState(false);
    const { toast } = useToast();

    const tabs = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'security', label: 'Security & Access', icon: Shield },
        { id: 'notifications', label: 'Alerts & Webhooks', icon: Bell },
        { id: 'database', label: 'Database & Backup', icon: Database },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header Actions */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Platform Configuration</h2>
                    <p className="text-sm text-slate-500">Manage global settings affecting all FPO tenants.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => toast({ message: 'Changes discarded', variant: 'info' })}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium text-sm"
                    >
                        <RotateCcw size={16} /> Discard Changes
                    </button>
                    <button
                        onClick={() => toast({ message: 'Settings saved successfully', variant: 'success' })}
                        className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm shadow-sm shadow-emerald-600/20"
                    >
                        <Save size={16} /> Save Settings
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Vertical Tabs */}
                <div className="md:col-span-1 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left ${activeTab === tab.id
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                                : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                                }`}
                        >
                            <tab.icon size={18} className={activeTab === tab.id ? 'text-emerald-600' : 'text-slate-400'} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content Area */}
                <div className="md:col-span-3">
                    <Card className="shadow-sm border-slate-200 min-h-[400px]">

                        {activeTab === 'general' && (
                            <div className="animate-in fade-in duration-300">
                                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
                                    <CardTitle className="text-lg">General Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6 flex-1">

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Platform Base URL</label>
                                            <input type="url" defaultValue="https://app.k2fpo.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Support Email Address</label>
                                            <input type="email" defaultValue="support@k2fpo.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm" />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100">
                                        <h3 className="font-bold text-slate-800 text-sm mb-4">Global Feature Flags</h3>
                                        <div className="space-y-4">
                                            {[
                                                { id: '1', title: 'Plant Disease AI Scanner', desc: 'Enable computer vision for crop diagnostics globally.', status: true },
                                                { id: '2', title: 'WhatsApp Integration', desc: 'Allow FPOs to send advisories via WhatsApp Business API.', status: true },
                                                { id: '3', title: 'Auto-Scaling Infrastructure', desc: 'Dynamic resource allocation during peak harvest seasons.', status: false },
                                                { id: '4', title: 'Preview: Farmer App v2.0', desc: 'Opt-in beta testing for the new React Native app.', status: false },
                                            ].map(feature => (
                                                <div key={feature.id} className="flex items-start justify-between p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                                                    <div>
                                                        <h4 className="font-semibold text-slate-800 text-sm mb-1">{feature.title}</h4>
                                                        <p className="text-xs text-slate-500">{feature.desc}</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked={feature.status} />
                                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </CardContent>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="animate-in fade-in duration-300">
                                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
                                    <CardTitle className="text-lg">Security & Access</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="max-w-md space-y-6">
                                        <div>
                                            <h4 className="font-semibold text-sm text-slate-800 mb-2">Password Policy</h4>
                                            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-emerald-500">
                                                <option>Standard (8 chars, 1 number)</option>
                                                <option>Strict (12 chars, mixed case, symbols)</option>
                                                <option>Custom</option>
                                            </select>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-slate-800 mb-2 flex justify-between">
                                                <span>Multi-Factor Authentication (MFA)</span>
                                                <Badge variant="warning" className="text-[10px]">Recommended</Badge>
                                            </h4>
                                            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-emerald-500">
                                                <option>Optional for all users</option>
                                                <option>Mandatory for Platform Admins and CEOs</option>
                                                <option>Mandatory for all users</option>
                                            </select>
                                        </div>
                                        <div className="pt-4 border-t border-slate-200">
                                            <h4 className="font-semibold text-sm text-red-600 mb-2">Emergency Lockdown</h4>
                                            <p className="text-xs text-slate-500 mb-4">Instantly terminate all active sessions and block new logins across all FPO tenants.</p>
                                            <button
                                                onClick={() => setIsLockdownModalOpen(true)}
                                                className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
                                            >
                                                Initiate Lockdown
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        )}

                        {(activeTab === 'notifications' || activeTab === 'database') && (
                            <div className="animate-in fade-in duration-300 p-12 text-center text-slate-500 flex flex-col items-center justify-center min-h-[400px]">
                                <Globe size={48} className="text-slate-300 mb-4" />
                                <h3 className="text-lg font-semibold text-slate-700 mb-2">Settings Section Under Construction</h3>
                                <p className="text-sm max-w-sm">Global notification webhooks and database backup configurations will be available in the v1.2 release.</p>
                            </div>
                        )}

                    </Card>
                </div>
            </div>

            <Modal
                isOpen={isLockdownModalOpen}
                onClose={() => setIsLockdownModalOpen(false)}
                title="Emergency Lockdown"
            >
                <div className="space-y-4">
                    <p className="text-sm text-slate-600">
                        Are you sure you want to initiate an emergency lockdown? This will immediately terminate all active sessions and block new logins across all FPO tenants.
                    </p>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                        <button
                            onClick={() => setIsLockdownModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                setIsLockdownModalOpen(false);
                                toast({ message: 'Emergency lockdown initiated. All sessions terminated.', variant: 'error' });
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                        >
                            Confirm Lockdown
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
