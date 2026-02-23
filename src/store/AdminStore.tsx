import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockFarmers } from '../data/mock/farmers';
import { mockOrders } from '../data/mock/orders';
import { mockInventory } from '../data/mock/inventory';
import { mockSuppliers } from '../data/mock/suppliers';
import { mockBuyers } from '../data/mock/buyers';
import { mockStaff } from '../data/mock/staff';
import { mockPayments } from '../data/mock/payments';

// Core State Interfaces
export interface AdminState {
    farmers: typeof mockFarmers;
    orders: typeof mockOrders;
    inventory: typeof mockInventory;
    suppliers: typeof mockSuppliers;
    buyers: typeof mockBuyers;
    staff: typeof mockStaff;
    payments: typeof mockPayments;
}

export interface AdminContextType {
    state: AdminState;
    // Farmer actions
    addFarmer: (farmer: any) => void;
    updateFarmer: (id: string, updates: any) => void;
    // Inventory actions
    addInventoryItem: (item: any) => void;
    updateInventoryStock: (id: string, newStock: number) => void;
    // Order actions
    addOrder: (order: any) => void;
    updateOrderStatus: (id: string, status: string) => void;
    // New Entities actions
    addSupplier: (supplier: any) => void;
    addBuyer: (buyer: any) => void;
    addStaffMember: (staff: any) => void;
    addPayment: (payment: any) => void;
    // General metrics getters
    getDashboardMetrics: () => {
        totalRevenue: number;
        pendingOrders: number;
        inventoryValue: number;
        activeMembers: number;
    };
}

const STORAGE_KEY = 'v2_k2_fpo_admin_state';

const initialState: AdminState = {
    farmers: mockFarmers,
    orders: mockOrders,
    inventory: mockInventory,
    suppliers: mockSuppliers,
    buyers: mockBuyers,
    staff: mockStaff,
    payments: mockPayments
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AdminState>(() => {
        // Hydrate from localStorage on initial load
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse admin state from localStorage", e);
            }
        }
        return initialState; // Fallback to mock data seed
    });

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    // === Actions ===

    const addFarmer = (farmer: any) => {
        setState(prev => ({ ...prev, farmers: [farmer, ...prev.farmers] }));
    };

    const updateFarmer = (id: string, updates: any) => {
        setState(prev => ({
            ...prev,
            farmers: prev.farmers.map(f => f.id === id ? { ...f, ...updates } : f)
        }));
    };

    const addInventoryItem = (item: any) => {
        setState(prev => ({ ...prev, inventory: [item, ...prev.inventory] }));
    };

    const updateInventoryStock = (id: string, newStock: number) => {
        setState(prev => ({
            ...prev,
            inventory: prev.inventory.map(i => i.id === id ? { ...i, currentStock: newStock } : i)
        }));
    };

    const addOrder = (order: any) => {
        setState(prev => ({ ...prev, orders: [order, ...prev.orders] }));
    };

    const updateOrderStatus = (id: string, status: string) => {
        setState(prev => ({
            ...prev,
            orders: prev.orders.map(o => o.id === id ? { ...o, status } : o)
        }));
    };

    const addSupplier = (supplier: any) => {
        setState(prev => ({ ...prev, suppliers: [supplier, ...prev.suppliers] }));
    };

    const addBuyer = (buyer: any) => {
        setState(prev => ({ ...prev, buyers: [buyer, ...prev.buyers] }));
    };

    const addStaffMember = (staff: any) => {
        setState(prev => ({ ...prev, staff: [staff, ...prev.staff] }));
    };

    const addPayment = (payment: any) => {
        setState(prev => ({ ...prev, payments: [payment, ...prev.payments] }));
    };

    // === Computed Metrics ===
    const getDashboardMetrics = () => {
        const totalRevenue = state.payments
            .filter(p => p.status === 'Completed')
            .reduce((sum, p) => sum + p.amount, 0);

        const pendingOrders = state.orders
            .filter(o => o.status === 'Pending').length;

        const inventoryValue = state.inventory
            .reduce((sum, item) => sum + (item.currentStock * item.averageCost), 0);

        const activeMembers = state.farmers
            .filter(f => f.status === 'Active').length;

        return {
            totalRevenue,
            pendingOrders,
            inventoryValue,
            activeMembers
        };
    };

    return (
        <AdminContext.Provider value={{
            state,
            addFarmer, updateFarmer,
            addInventoryItem, updateInventoryStock,
            addOrder, updateOrderStatus,
            addSupplier, addBuyer, addStaffMember, addPayment,
            getDashboardMetrics
        }}>
            {children}
        </AdminContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdminStore() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdminStore must be used within an AdminProvider');
    }
    return context;
}
