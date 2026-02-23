import React from 'react';
import { SidebarItem } from '../layout/Sidebar';
import {
    LayoutDashboard,
    ShoppingCart,
    Truck,
    Package,
    Users,
    Briefcase,
    IndianRupee,
    Factory,
    Building2,
    Receipt,
    Landmark,
    FileText,
    Settings
} from 'lucide-react';

interface AdminSidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

export default function AdminSidebar({ activeSection, setActiveSection }: AdminSidebarProps) {
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'membership', icon: Users, label: 'Membership CRM' },
        { id: 'share-capital', icon: IndianRupee, label: 'Share Capital' },
        { id: 'input-sales', icon: ShoppingCart, label: 'Input Sales', badge: 12 },
        { id: 'suppliers', icon: Factory, label: 'Suppliers' },
        { id: 'procurement', icon: Truck, label: 'Procurement' },
        { id: 'buyers', icon: Building2, label: 'Buyers' },
        { id: 'inventory', icon: Package, label: 'Inventory Center', badge: '3 Low' },
        { id: 'billing', icon: Receipt, label: 'Billing & Payments' },
        { id: 'banking', icon: Landmark, label: 'Banking & Recon' },
        { id: 'documents', icon: FileText, label: 'Document Vault' },
        { id: 'staff', icon: Briefcase, label: 'Staff Management' },
        { id: 'settings', icon: Settings, label: 'FPO Settings' },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="space-y-1">
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        active={activeSection === item.id}
                        onClick={() => setActiveSection(item.id)}
                        badge={item.badge}
                    />
                ))}
            </div>
        </div>
    );
}
