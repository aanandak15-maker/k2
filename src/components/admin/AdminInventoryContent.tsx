import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Plus, Download, Search, Settings, X, Edit2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { exportToCsv } from '../../utils/exportUtils';
import { InventoryItem } from '../../data/mock/inventory';

export default function AdminInventoryContent() {
    const { toast } = useToast();
    const { state, addInventoryItem, updateInventoryStock } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState('');

    // Modals state
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

    // Form state (Receipt)
    const [newItem, setNewItem] = useState({
        name: '',
        category: 'Fertilizer' as any,
        unit: 'Bags (50kg)',
        averageCost: 0,
        currentStock: 0,
        reorderLevel: 20,
        minimumThreshold: 10
    });

    // Form state (Edit)
    const [editStock, setEditStock] = useState(0);

    // Computations
    const filteredInventory = state.inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalValue = state.inventory.reduce((sum, item) => sum + (item.currentStock * item.averageCost), 0);
    const lowStockCount = state.inventory.filter(item => item.currentStock <= item.minimumThreshold && item.currentStock > 0).length;
    const outOfStockCount = state.inventory.filter(item => item.currentStock === 0).length;
    const activeSkus = state.inventory.length;

    // Handlers
    const handleAddReceipt = (e: React.FormEvent) => {
        e.preventDefault();
        const id = `P-${String(state.inventory.length + 1).padStart(3, '0')}`;
        const item: InventoryItem = {
            id,
            name: newItem.name,
            category: newItem.category,
            currentStock: newItem.currentStock,
            unit: newItem.unit,
            reorderLevel: newItem.reorderLevel,
            minimumThreshold: newItem.minimumThreshold,
            status: newItem.currentStock === 0 ? 'Out of Stock' : (newItem.currentStock <= newItem.minimumThreshold ? 'Low Stock' : 'In Stock'),
            lastRestocked: new Date().toISOString().split('T')[0],
            averageCost: newItem.averageCost
        };
        addInventoryItem(item);
        toast({ message: `${item.name} added to inventory successfully!`, variant: 'success' });
        setIsReceiptModalOpen(false);
        setNewItem({ name: '', category: 'Fertilizer', unit: 'Bags (50kg)', averageCost: 0, currentStock: 0, reorderLevel: 20, minimumThreshold: 10 });
    };

    const handleEditStock = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItem) {
            updateInventoryStock(selectedItem.id, editStock);
            toast({ message: `Stock for ${selectedItem.name} updated to ${editStock}`, variant: 'success' });
            setIsEditModalOpen(false);
            setSelectedItem(null);
        }
    };

    const openEditModal = (item: InventoryItem) => {
        setSelectedItem(item);
        setEditStock(item.currentStock);
        setIsEditModalOpen(true);
    };

    const getStatusVariant = (current: number, reorder: number) => {
        if (current === 0) return 'danger';
        if (current <= reorder) return 'warning';
        return 'success';
    };

    const getStatusText = (current: number, reorder: number) => {
        if (current === 0) return 'Out of Stock';
        if (current <= reorder) return 'Low Stock';
        return 'In Stock';
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Warehouse Inventory</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage central stock, track batches and expiry dates.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            toast({ message: 'Inventory report download started', variant: 'success' });
                            exportToCsv('fpo_inventory_report', state.inventory);
                        }}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <Download size={16} /> Report
                    </button>
                    <button
                        onClick={() => setIsReceiptModalOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> Goods Receipt
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-slate-900 text-white">
                    <CardContent className="p-5">
                        <div className="text-slate-400 text-sm font-medium mb-1">Total Value</div>
                        <div className="text-2xl font-bold">₹{totalValue.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="border-red-200 bg-red-50/50">
                    <CardContent className="p-5">
                        <div className="text-red-600 text-sm font-medium mb-1">Low Stock Alerts</div>
                        <div className="text-2xl font-bold text-red-700">{lowStockCount}</div>
                    </CardContent>
                </Card>
                <Card className="border-amber-200 bg-amber-50/50">
                    <CardContent className="p-5">
                        <div className="text-amber-700 text-sm font-medium mb-1">Out of Stock</div>
                        <div className="text-2xl font-bold text-amber-800">{outOfStockCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5">
                        <div className="text-slate-500 text-sm font-medium mb-1">Active SKUs</div>
                        <div className="text-2xl font-bold text-slate-800">{activeSkus}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 gap-4">
                    <CardTitle>Current Stock</CardTitle>
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search SKU or name..."
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-slate-500">Product Code & Name</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Category</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-right">In Stock</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Unit Value</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredInventory.map(item => (
                                    <tr key={item.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900">{item.name}</div>
                                            <div className="text-xs text-slate-500">SKU: {item.id}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{item.category}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className={`font-bold ${item.currentStock <= item.minimumThreshold ? 'text-red-600' : 'text-slate-900'}`}>
                                                {item.currentStock} {item.unit}
                                            </div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">Min: {item.minimumThreshold}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right text-slate-600">₹{item.averageCost}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={getStatusVariant(item.currentStock, item.minimumThreshold)}>
                                                {getStatusText(item.currentStock, item.minimumThreshold)}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => openEditModal(item)}
                                                className="text-slate-400 hover:text-emerald-600 transition-colors"
                                                title="Edit Stock"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredInventory.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-slate-500 bg-slate-50/50">
                                            No inventory items found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Goods Receipt Modal */}
            {isReceiptModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6 sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-bold text-slate-900">Receive Goods (New SKU)</h3>
                            <button onClick={() => setIsReceiptModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddReceipt} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <select
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newItem.category}
                                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                                    >
                                        <option value="Fertilizer">Fertilizer</option>
                                        <option value="Pesticide">Pesticide</option>
                                        <option value="Seed">Seed</option>
                                        <option value="Equipment">Equipment</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Bags (50kg), Liters"
                                        required
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newItem.unit}
                                        onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newItem.currentStock}
                                        onChange={(e) => setNewItem({ ...newItem, currentStock: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Avg Cost (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newItem.averageCost}
                                        onChange={(e) => setNewItem({ ...newItem, averageCost: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Min Reorder</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newItem.reorderLevel}
                                        onChange={(e) => setNewItem({ ...newItem, reorderLevel: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Min Threshold</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                        value={newItem.minimumThreshold}
                                        onChange={(e) => setNewItem({ ...newItem, minimumThreshold: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                                <button type="button" onClick={() => setIsReceiptModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm">Save Receipt</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Stock Modal */}
            {isEditModalOpen && selectedItem && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 p-5">
                            <h3 className="font-bold text-slate-900">Update Stock Level</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleEditStock} className="p-5 space-y-4">
                            <div>
                                <p className="text-sm text-slate-600 font-medium mb-1">{selectedItem.name}</p>
                                <p className="text-xs text-slate-500 mb-4">SKU: {selectedItem.id} | Unit: {selectedItem.unit}</p>

                                <label className="block text-sm font-medium text-slate-700 mb-1">Current Quantity</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={editStock}
                                    onChange={(e) => setEditStock(parseInt(e.target.value) || 0)}
                                />
                            </div>

                            <div className="pt-2 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
