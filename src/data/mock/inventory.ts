export interface InventoryItem {
    id: string;
    name: string;
    category: 'Fertilizer' | 'Pesticide' | 'Seed' | 'Equipment' | 'Other';
    currentStock: number;
    unit: string;
    reorderLevel: number;
    minimumThreshold: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    lastRestocked: string;
    averageCost: number;
    batchNumber?: string;
    expiryDate?: string;
}

export const mockInventory: InventoryItem[] = [
    // ──── Fertilizers ────
    { id: 'P-001', name: 'DAP Fertilizer', category: 'Fertilizer', currentStock: 18, unit: 'Bags (50kg)', reorderLevel: 50, minimumThreshold: 20, status: 'Low Stock', lastRestocked: '2025-01-15', averageCost: 1350, batchNumber: 'DAP-2024-K12' },
    { id: 'P-002', name: 'Urea', category: 'Fertilizer', currentStock: 120, unit: 'Bags (45kg)', reorderLevel: 80, minimumThreshold: 40, status: 'In Stock', lastRestocked: '2025-02-10', averageCost: 266, batchNumber: 'UR-2025-A03' },
    { id: 'P-007', name: 'NPK 19:19:19', category: 'Fertilizer', currentStock: 0, unit: 'Bags (50kg)', reorderLevel: 40, minimumThreshold: 15, status: 'Out of Stock', lastRestocked: '2024-11-28', averageCost: 1450, batchNumber: 'NPK-2024-D11' },
    { id: 'P-009', name: 'SSP Fertilizer', category: 'Fertilizer', currentStock: 95, unit: 'Bags (50kg)', reorderLevel: 60, minimumThreshold: 25, status: 'In Stock', lastRestocked: '2025-02-05', averageCost: 350, batchNumber: 'SSP-2025-B02' },
    { id: 'P-010', name: 'Zinc Sulphate 21%', category: 'Fertilizer', currentStock: 35, unit: 'Bags (25kg)', reorderLevel: 30, minimumThreshold: 10, status: 'In Stock', lastRestocked: '2025-01-20', averageCost: 395, batchNumber: 'ZN-2025-C01' },
    { id: 'P-011', name: 'MOP (Muriate of Potash)', category: 'Fertilizer', currentStock: 8, unit: 'Bags (50kg)', reorderLevel: 25, minimumThreshold: 10, status: 'Low Stock', lastRestocked: '2024-12-15', averageCost: 1700, batchNumber: 'MOP-2024-F12' },

    // ──── Seeds ────
    { id: 'P-003', name: 'Wheat Seed (HD-2967)', category: 'Seed', currentStock: 185, unit: 'kg', reorderLevel: 200, minimumThreshold: 100, status: 'Low Stock', lastRestocked: '2024-10-05', averageCost: 45, batchNumber: 'WS-2024-R10', expiryDate: '2025-10-01' },
    { id: 'P-004', name: 'Mustard Seed (Pusa Double Zero)', category: 'Seed', currentStock: 45, unit: 'kg', reorderLevel: 20, minimumThreshold: 10, status: 'In Stock', lastRestocked: '2024-09-12', averageCost: 935, batchNumber: 'MS-2024-S09', expiryDate: '2025-09-01' },
    { id: 'P-012', name: 'Paddy Seed (PR-126)', category: 'Seed', currentStock: 300, unit: 'kg', reorderLevel: 250, minimumThreshold: 100, status: 'In Stock', lastRestocked: '2025-01-10', averageCost: 55, batchNumber: 'PS-2025-A01', expiryDate: '2025-12-01' },
    { id: 'P-013', name: 'Moong Seed (IPM 02-3)', category: 'Seed', currentStock: 0, unit: 'kg', reorderLevel: 100, minimumThreshold: 30, status: 'Out of Stock', lastRestocked: '2024-06-01', averageCost: 120, batchNumber: 'MG-2024-J06', expiryDate: '2025-06-01' },

    // ──── Pesticides ────
    { id: 'P-005', name: 'Propiconazole 25% EC', category: 'Pesticide', currentStock: 55, unit: 'Liters', reorderLevel: 30, minimumThreshold: 15, status: 'In Stock', lastRestocked: '2025-02-01', averageCost: 550, batchNumber: 'PROP-2025-B01', expiryDate: '2027-02-01' },
    { id: 'P-008', name: 'Chlorpyriphos 20% EC', category: 'Pesticide', currentStock: 40, unit: 'Liters', reorderLevel: 25, minimumThreshold: 10, status: 'In Stock', lastRestocked: '2025-01-25', averageCost: 700, batchNumber: 'CPF-2025-A25', expiryDate: '2027-01-25' },
    { id: 'P-014', name: 'Imidacloprid 17.8% SL', category: 'Pesticide', currentStock: 12, unit: 'Liters', reorderLevel: 20, minimumThreshold: 10, status: 'Low Stock', lastRestocked: '2024-11-15', averageCost: 450, batchNumber: 'IMD-2024-N15', expiryDate: '2026-11-15' },
    { id: 'P-015', name: 'Mancozeb 75% WP', category: 'Pesticide', currentStock: 25, unit: 'kg', reorderLevel: 15, minimumThreshold: 8, status: 'In Stock', lastRestocked: '2025-02-08', averageCost: 380, batchNumber: 'MCZ-2025-F08', expiryDate: '2027-02-08' },

    // ──── Equipment ────
    { id: 'P-006', name: 'Knapsack Sprayer 16L', category: 'Equipment', currentStock: 5, unit: 'Units', reorderLevel: 10, minimumThreshold: 3, status: 'Low Stock', lastRestocked: '2024-05-20', averageCost: 1200 },
    { id: 'P-016', name: 'Manual Seed Drill', category: 'Equipment', currentStock: 2, unit: 'Units', reorderLevel: 5, minimumThreshold: 2, status: 'Low Stock', lastRestocked: '2024-08-10', averageCost: 3500 },

    // ──── Other ────
    { id: 'P-017', name: 'Polypropylene Bags (50kg)', category: 'Other', currentStock: 500, unit: 'Pieces', reorderLevel: 300, minimumThreshold: 100, status: 'In Stock', lastRestocked: '2025-02-15', averageCost: 12 },
    { id: 'P-018', name: 'Weighing Scale (100kg)', category: 'Equipment', currentStock: 1, unit: 'Units', reorderLevel: 2, minimumThreshold: 1, status: 'Low Stock', lastRestocked: '2023-12-01', averageCost: 4500 },
];
