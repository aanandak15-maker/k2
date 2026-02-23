import React from 'react';
import { StatCard } from '../ui/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { AlertCircle, FileText, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';

export default function AdminDashboardContent() {
    const { toast } = useToast();
    const { state } = useAdminStore();

    // 1. Pending Data Tasks (Orders + Pending KYC Farmers)
    const pendingOrders = state.orders.filter(o => o.status === 'Pending').length;
    const pendingKyc = state.farmers.filter(f => f.status === 'Pending KYC').length;
    const totalPendingTasks = pendingOrders + pendingKyc;

    // 2. Unreconciled Payments
    const unreconciledPayments = state.payments.filter(p => p.status === 'Pending' || p.status === 'Processing').length;

    // 3. Staff Attendance (Mocked based on length for now)
    const totalStaff = state.staff.length;
    const activeStaff = state.staff.filter(s => s.status === 'Active').length;

    // 4. Overdue Management (Based on pending orders)
    const pendingOrdersList = state.orders.filter(o => o.status === 'Pending');
    const totalOverdueAmount = pendingOrdersList.reduce((sum, o) => sum + o.totalAmount, 0);

    // 5. Live Inventory Alerts
    const criticalInventory = state.inventory.filter(item => item.currentStock <= item.minimumThreshold);

    // 6. Share Capital Summary
    const totalPaidUp = state.farmers.reduce((sum, f) => sum + f.shareCapital, 0);
    const totalSubscribed = state.farmers.length * 1000;
    const callsInArrears = totalSubscribed - totalPaidUp;

    return (
        <div className="space-y-6">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <button
                    onClick={() => toast({ message: 'Use the Membership tab to add farmers.', variant: 'info' })}
                    className="shrink-0 flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-emerald-700 shadow-sm transition-colors"
                >
                    + Add Farmer
                </button>
                <button
                    onClick={() => toast({ message: 'Use the Procurement tab to create POs.', variant: 'info' })}
                    className="shrink-0 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 shadow-sm transition-colors"
                >
                    📦 Create PO
                </button>
                <button
                    onClick={() => toast({ message: 'Use the Billing tab to record payments.', variant: 'info' })}
                    className="shrink-0 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-indigo-700 shadow-sm transition-colors"
                >
                    💳 Record Payment
                </button>
                <button
                    onClick={() => toast({ message: 'Use the Inventory tab to add stock.', variant: 'info' })}
                    className="shrink-0 flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-700 shadow-sm transition-colors"
                >
                    🏪 Add Stock Entry
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Pending Data Tasks"
                    value={totalPendingTasks.toString()}
                    subValue="Needs action today"
                    trend={`${pendingOrders} Orders, ${pendingKyc} KYC`}
                    trendDirection={totalPendingTasks > 5 ? 'down' : 'neutral'}
                    pulseColor={totalPendingTasks > 0 ? 'red' : 'green'}
                    icon={AlertCircle}
                />
                <StatCard
                    title="Unreconciled Payments"
                    value={unreconciledPayments.toString()}
                    subValue="Manual review needed"
                    trend="Review pending"
                    trendDirection={unreconciledPayments > 0 ? 'down' : 'up'}
                    pulseColor={unreconciledPayments > 0 ? 'yellow' : 'green'}
                    icon={Clock}
                />
                <StatCard
                    title="Critical Stock Items"
                    value={criticalInventory.length.toString()}
                    subValue="Below minimum threshold"
                    trend="Requires reorder"
                    trendDirection={criticalInventory.length > 0 ? 'down' : 'neutral'}
                    pulseColor={criticalInventory.length > 0 ? 'red' : 'green'}
                    icon={FileText}
                />
                <StatCard
                    title="Staff Active Today"
                    value={`${activeStaff}/${totalStaff}`}
                    subValue="Overall workforce"
                    trend="Today"
                    trendDirection="neutral"
                    pulseColor="green"
                    icon={CheckCircle}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                            Sales Overdue Management
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                {pendingOrdersList.length} Pending Orders
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 mb-2">
                            <div className="text-center p-3 border border-red-100 rounded-lg bg-red-50/50">
                                <div className="text-xl font-bold text-red-600">₹{totalOverdueAmount.toLocaleString()}</div>
                                <div className="text-xs text-slate-500 mt-1">Total Overdue</div>
                            </div>
                            <div className="text-center p-3 border border-slate-100 rounded-lg bg-slate-50">
                                <div className="text-xl font-bold text-slate-700">{pendingOrdersList.length}</div>
                                <div className="text-xs text-slate-500 mt-1">Open Invoices</div>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-2 font-medium text-slate-500">Order ID</th>
                                        <th className="px-4 py-2 font-medium text-slate-500">Farmer</th>
                                        <th className="px-4 py-2 font-medium text-slate-500 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {pendingOrdersList.slice(0, 4).map(o => (
                                        <tr key={o.id} className="hover:bg-slate-50/50">
                                            <td className="px-4 py-2 text-slate-600">{o.id}</td>
                                            <td className="px-4 py-2 text-slate-600 font-medium">{o.farmerName}</td>
                                            <td className="px-4 py-2 text-right font-medium text-red-600">₹{o.totalAmount.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    {pendingOrdersList.length === 0 && (
                                        <tr className="hover:bg-slate-50/50">
                                            <td colSpan={3} className="px-4 py-8 text-center text-slate-500">No overdue orders found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {pendingOrdersList.length > 0 && (
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => toast({ message: 'Sent reminders via SMS to farmers', variant: 'success' })}
                                    className="w-full bg-amber-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-amber-600 transition-colors"
                                >
                                    Send Bulk Payment Reminders
                                </button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Live Inventory & Capital Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-2 font-medium text-slate-500">Product</th>
                                        <th className="px-4 py-2 font-medium text-slate-500">Stock</th>
                                        <th className="px-4 py-2 font-medium text-slate-500 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {criticalInventory.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 bg-red-50/30">
                                            <td className="px-4 py-2 text-red-900 font-medium">{item.name}</td>
                                            <td className="px-4 py-2 text-red-600 font-bold">{item.currentStock}</td>
                                            <td className="px-4 py-2 text-center"><Badge variant="danger">Critical</Badge></td>
                                        </tr>
                                    ))}
                                    {state.inventory.filter(i => i.currentStock > i.minimumThreshold).slice(0, Math.max(0, 3 - criticalInventory.length)).map(item => (
                                        <tr key={item.id} className="hover:bg-slate-50/50">
                                            <td className="px-4 py-2 text-slate-900 font-medium">{item.name}</td>
                                            <td className="px-4 py-2 text-slate-600">{item.currentStock}</td>
                                            <td className="px-4 py-2 text-center"><Badge variant="success">OK</Badge></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                            <div className="text-sm font-semibold text-slate-900 mb-3">Share Capital Summary</div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                                    <div className="text-xs text-emerald-800 mb-1">Total Paid-Up</div>
                                    <div className="text-lg font-bold text-emerald-900">₹{totalPaidUp.toLocaleString()}</div>
                                </div>
                                <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                                    <div className="text-xs text-red-800 mb-1">Calls in Arrears</div>
                                    <div className="text-lg font-bold text-red-900">₹{callsInArrears.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
