import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { DataTable } from '../ui/DataTable';
import { Badge } from '../ui/Badge';
import { Search, Plus, Filter, Download, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { exportToCsv } from '../../utils/exportUtils';
import { Order, OrderItem } from '../../data/mock/orders';

export default function AdminInputSalesContent() {
    const { toast } = useToast();
    const { state, addOrder } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal State
    const [selectedFarmerId, setSelectedFarmerId] = useState('');
    const [orderItems, setOrderItems] = useState<{ productId: string, quantity: number }[]>([{ productId: '', quantity: 1 }]);
    const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Unpaid' | 'Partial'>('Unpaid');

    const filteredOrders = state.orders.filter(order =>
        order.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // KPI Calculations
    const today = new Date().toISOString().split('T')[0];
    const todaysSales = state.orders
        .filter(o => o.date.startsWith(today))
        .reduce((sum, o) => sum + o.totalAmount, 0);

    const pendingOrders = state.orders.filter(o => o.status === 'Pending').length;

    const creditExtended = state.orders
        .filter(o => o.paymentStatus !== 'Paid')
        .reduce((sum, o) => sum + o.totalAmount, 0);

    const columns = [
        { key: 'id' as const, header: 'Order ID', render: (item: any) => <span className="text-slate-500 font-medium">#{item.id}</span> },
        { key: 'date' as const, header: 'Date', render: (item: any) => <span className="text-slate-600">{new Date(item.date).toLocaleDateString()}</span> },
        { key: 'farmerName' as const, header: 'Farmer Name', render: (item: any) => <span className="font-semibold text-slate-800">{item.farmerName}</span> },
        {
            key: 'items' as const, header: 'Items', render: (item: any) => (
                <span className="text-slate-600 text-xs">
                    {item.items.map((i: any) => `${i.productName} (${i.quantity})`).join(', ')}
                </span>
            )
        },
        { key: 'totalAmount' as const, header: 'Amount', render: (item: any) => <span className="font-bold text-slate-900">₹{item.totalAmount.toLocaleString()}</span> },
        {
            key: 'status' as const, header: 'Status', render: (item: any) => (
                <Badge variant={
                    item.status === 'Fulfilled' ? 'success' :
                        item.status === 'Pending' ? 'warning' : 'default'
                }>
                    {item.status}
                </Badge>
            )
        },
        {
            key: 'paymentStatus' as const, header: 'Payment', render: (item: any) => (
                <Badge variant={
                    item.paymentStatus === 'Paid' ? 'success' :
                        item.paymentStatus === 'Partial' ? 'warning' : 'danger'
                }>
                    {item.paymentStatus}
                </Badge>
            )
        }
    ];

    const handleCreateOrder = (e: React.FormEvent) => {
        e.preventDefault();

        const farmer = state.farmers.find(f => f.id === selectedFarmerId);
        if (!farmer) return toast({ message: 'Please select a farmer', variant: 'error' });

        const validItems = orderItems.filter(i => i.productId && i.quantity > 0);
        if (validItems.length === 0) return toast({ message: 'Please add at least one valid item', variant: 'error' });

        let totalAmount = 0;
        const mappedItems: OrderItem[] = validItems.map(item => {
            const product = state.inventory.find(inv => inv.id === item.productId);
            const price = product ? product.averageCost : 0;
            const total = price * item.quantity;
            totalAmount += total;
            return {
                productId: item.productId,
                productName: product ? product.name : 'Unknown Product',
                quantity: item.quantity,
                unitPrice: price,
                total
            };
        });

        const newOrder: Order = {
            id: `ORD-${new Date().getFullYear()}-${String(state.orders.length + 1).padStart(3, '0')}`,
            farmerId: farmer.id,
            farmerName: farmer.name,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            totalAmount,
            paymentStatus,
            items: mappedItems
        };

        addOrder(newOrder);
        toast({ message: `Order ${newOrder.id} created successfully!`, variant: 'success' });
        setIsModalOpen(false);
        setOrderItems([{ productId: '', quantity: 1 }]);
        setSelectedFarmerId('');
    };

    const addOrderItemField = () => {
        setOrderItems([...orderItems, { productId: '', quantity: 1 }]);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Input Sales & Demand</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage farmer input demands, sales orders, and credit.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            toast({ message: 'Exported input sales data to CSV', variant: 'info' });
                            exportToCsv('fpo_sales_orders', state.orders);
                        }}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <Download size={16} /> Export
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> New Order
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-slate-500 mb-1">Total Sales Value</div>
                        <div className="text-2xl font-bold text-slate-900">₹{state.orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}</div>
                        <div className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">Live from {state.orders.length} orders</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-slate-500 mb-1">Pending Orders</div>
                        <div className="text-2xl font-bold text-amber-600">{pendingOrders}</div>
                        <div className="text-xs text-slate-500 mt-1">Requires fulfillment</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-slate-500 mb-1">Total Credit Extended</div>
                        <div className="text-2xl font-bold text-red-600">₹{creditExtended.toLocaleString()}</div>
                        <div className="text-xs text-red-500 mt-1">From unpaid/partial orders</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 gap-4">
                    <CardTitle>Sales Ledger</CardTitle>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <DataTable columns={columns} data={filteredOrders} className="border-0 shadow-none rounded-none" />
                </CardContent>
            </Card>

            {/* New Order Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-bold text-slate-900">Create New Order</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateOrder} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Select Farmer</label>
                                <select
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={selectedFarmerId}
                                    onChange={(e) => setSelectedFarmerId(e.target.value)}
                                    required
                                >
                                    <option value="">-- Choose a farmer --</option>
                                    {state.farmers.map(f => (
                                        <option key={f.id} value={f.id}>{f.name} ({f.id}) - {f.village}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-slate-700">Order Items</label>
                                    <button
                                        type="button"
                                        onClick={addOrderItemField}
                                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                                    >
                                        <Plus size={14} /> Add Item
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {orderItems.map((item, index) => (
                                        <div key={index} className="flex gap-3 items-center">
                                            <select
                                                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                                value={item.productId}
                                                onChange={(e) => {
                                                    const newItems = [...orderItems];
                                                    newItems[index].productId = e.target.value;
                                                    setOrderItems(newItems);
                                                }}
                                                required
                                            >
                                                <option value="">-- Select Product --</option>
                                                {state.inventory.map(inv => (
                                                    <option key={inv.id} value={inv.id}>{inv.name} (₹{inv.averageCost})</option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="Qty"
                                                className="w-24 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    const newItems = [...orderItems];
                                                    newItems[index].quantity = parseInt(e.target.value) || 1;
                                                    setOrderItems(newItems);
                                                }}
                                                required
                                            />
                                            {orderItems.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newItems = [...orderItems];
                                                        newItems.splice(index, 1);
                                                        setOrderItems(newItems);
                                                    }}
                                                    className="p-2 text-slate-400 hover:text-red-500"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Payment Status</label>
                                <select
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={paymentStatus}
                                    onChange={(e) => setPaymentStatus(e.target.value as any)}
                                >
                                    <option value="Paid">Paid Fully</option>
                                    <option value="Partial">Paid Partially</option>
                                    <option value="Unpaid">Unpaid (Credit)</option>
                                </select>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm shadow-emerald-600/20 transition-colors"
                                >
                                    Create Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
