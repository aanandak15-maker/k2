export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface Order {
    id: string;
    farmerId: string;
    farmerName: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Partially Fulfilled' | 'Fulfilled' | 'Cancelled';
    totalAmount: number;
    items: OrderItem[];
    paymentStatus: 'Paid' | 'Unpaid' | 'Partial';
}

export const mockOrders: Order[] = [
    // ──── Fulfilled & Paid (happy path) ────
    {
        id: 'ORD-2025-001', farmerId: 'F-1001', farmerName: 'Ram Singh', date: '2025-02-15', status: 'Fulfilled', totalAmount: 4500, paymentStatus: 'Paid', items: [
            { productId: 'P-001', productName: 'DAP Fertilizer', quantity: 2, unitPrice: 1350, total: 2700 },
            { productId: 'P-003', productName: 'Wheat Seed (HD-2967)', quantity: 1, unitPrice: 1800, total: 1800 }
        ]
    },
    {
        id: 'ORD-2025-002', farmerId: 'F-1004', farmerName: 'Hari Om', date: '2025-02-10', status: 'Fulfilled', totalAmount: 8100, paymentStatus: 'Paid', items: [
            { productId: 'P-001', productName: 'DAP Fertilizer', quantity: 6, unitPrice: 1350, total: 8100 }
        ]
    },
    {
        id: 'ORD-2025-003', farmerId: 'F-1017', farmerName: 'Govind Singh', date: '2025-02-08', status: 'Fulfilled', totalAmount: 13200, paymentStatus: 'Paid', items: [
            { productId: 'P-002', productName: 'Urea', quantity: 20, unitPrice: 266, total: 5320 },
            { productId: 'P-001', productName: 'DAP Fertilizer', quantity: 4, unitPrice: 1350, total: 5400 },
            { productId: 'P-004', productName: 'Mustard Seed', quantity: 2, unitPrice: 935, total: 1870 },
            { productId: 'P-005', productName: 'Propiconazole 25% EC', quantity: 1, unitPrice: 550, total: 550 }
        ]
    },

    // ──── Pending (outstanding receivables) ────
    {
        id: 'ORD-2025-004', farmerId: 'F-1002', farmerName: 'Shyam Lal', date: '2025-02-18', status: 'Pending', totalAmount: 1350, paymentStatus: 'Unpaid', items: [
            { productId: 'P-001', productName: 'DAP Fertilizer', quantity: 1, unitPrice: 1350, total: 1350 }
        ]
    },
    {
        id: 'ORD-2025-005', farmerId: 'F-1003', farmerName: 'Gita Devi', date: '2025-02-22', status: 'Pending', totalAmount: 550, paymentStatus: 'Unpaid', items: [
            { productId: 'P-005', productName: 'Propiconazole 25% EC', quantity: 1, unitPrice: 550, total: 550 }
        ]
    },
    {
        id: 'ORD-2025-006', farmerId: 'F-1011', farmerName: 'Sanjay Verma', date: '2025-02-20', status: 'Pending', totalAmount: 15000, paymentStatus: 'Unpaid', items: [
            { productId: 'P-001', productName: 'DAP Fertilizer', quantity: 8, unitPrice: 1350, total: 10800 },
            { productId: 'P-008', productName: 'Chlorpyriphos 20% EC', quantity: 6, unitPrice: 700, total: 4200 }
        ]
    },
    {
        id: 'ORD-2025-007', farmerId: 'F-1013', farmerName: 'Rajesh Tiwari', date: '2025-02-21', status: 'Pending', totalAmount: 6000, paymentStatus: 'Unpaid', items: [
            { productId: 'P-002', productName: 'Urea', quantity: 10, unitPrice: 266, total: 2660 },
            { productId: 'P-009', productName: 'SSP Fertilizer', quantity: 4, unitPrice: 350, total: 1400 },
            { productId: 'P-003', productName: 'Wheat Seed (HD-2967)', quantity: 1, unitPrice: 1800, total: 1800 }
        ]
    },

    // ──── Approved (ready for dispatch) ────
    {
        id: 'ORD-2025-008', farmerId: 'F-1006', farmerName: 'Sunita Bai', date: '2025-02-20', status: 'Approved', totalAmount: 3200, paymentStatus: 'Partial', items: [
            { productId: 'P-002', productName: 'Urea', quantity: 5, unitPrice: 266, total: 1330 },
            { productId: 'P-004', productName: 'Mustard Seed', quantity: 2, unitPrice: 935, total: 1870 }
        ]
    },
    {
        id: 'ORD-2025-009', farmerId: 'F-1015', farmerName: 'Bhola Nath', date: '2025-02-19', status: 'Approved', totalAmount: 9600, paymentStatus: 'Paid', items: [
            { productId: 'P-002', productName: 'Urea', quantity: 20, unitPrice: 266, total: 5320 },
            { productId: 'P-001', productName: 'DAP Fertilizer', quantity: 2, unitPrice: 1350, total: 2700 },
            { productId: 'P-010', productName: 'Zinc Sulphate 21%', quantity: 4, unitPrice: 395, total: 1580 }
        ]
    },

    // ──── Partially Fulfilled (split delivery) ────
    {
        id: 'ORD-2025-010', farmerId: 'F-1018', farmerName: 'Mohan Lal', date: '2025-02-12', status: 'Partially Fulfilled', totalAmount: 11700, paymentStatus: 'Partial', items: [
            { productId: 'P-001', productName: 'DAP Fertilizer', quantity: 4, unitPrice: 1350, total: 5400 },
            { productId: 'P-007', productName: 'NPK 19:19:19', quantity: 4, unitPrice: 1450, total: 5800 },
            { productId: 'P-005', productName: 'Propiconazole 25% EC', quantity: 1, unitPrice: 550, total: 550 }
        ]
    },
    {
        id: 'ORD-2025-011', farmerId: 'F-1010', farmerName: 'Dinesh Prasad', date: '2025-02-14', status: 'Partially Fulfilled', totalAmount: 2660, paymentStatus: 'Paid', items: [
            { productId: 'P-002', productName: 'Urea', quantity: 10, unitPrice: 266, total: 2660 }
        ]
    },

    // ──── Cancelled (edge case) ────
    {
        id: 'ORD-2025-012', farmerId: 'F-1008', farmerName: 'Anil Yadav', date: '2025-02-05', status: 'Cancelled', totalAmount: 2700, paymentStatus: 'Unpaid', items: [
            { productId: 'P-001', productName: 'DAP Fertilizer', quantity: 2, unitPrice: 1350, total: 2700 }
        ]
    },
    {
        id: 'ORD-2025-013', farmerId: 'F-1014', farmerName: 'Chhaya Devi', date: '2025-01-30', status: 'Cancelled', totalAmount: 935, paymentStatus: 'Unpaid', items: [
            { productId: 'P-004', productName: 'Mustard Seed', quantity: 1, unitPrice: 935, total: 935 }
        ]
    },

    // ──── Bulk Order (high value for testing sorting/pagination) ────
    {
        id: 'ORD-2025-014', farmerId: 'F-1017', farmerName: 'Govind Singh', date: '2025-02-22', status: 'Approved', totalAmount: 54000, paymentStatus: 'Paid', items: [
            { productId: 'P-001', productName: 'DAP Fertilizer', quantity: 20, unitPrice: 1350, total: 27000 },
            { productId: 'P-002', productName: 'Urea', quantity: 50, unitPrice: 266, total: 13300 },
            { productId: 'P-007', productName: 'NPK 19:19:19', quantity: 8, unitPrice: 1450, total: 11600 },
            { productId: 'P-005', productName: 'Propiconazole 25% EC', quantity: 2, unitPrice: 550, total: 1100 },
            { productId: 'P-010', productName: 'Zinc Sulphate 21%', quantity: 2, unitPrice: 395, total: 790 }
        ]
    },

    // ──── Small single-item orders ────
    {
        id: 'ORD-2025-015', farmerId: 'F-1009', farmerName: 'Pooja Kumari', date: '2025-02-17', status: 'Fulfilled', totalAmount: 550, paymentStatus: 'Paid', items: [
            { productId: 'P-005', productName: 'Propiconazole 25% EC', quantity: 1, unitPrice: 550, total: 550 }
        ]
    },
    {
        id: 'ORD-2025-016', farmerId: 'F-1019', farmerName: 'Priya Sharma', date: '2025-02-16', status: 'Fulfilled', totalAmount: 266, paymentStatus: 'Paid', items: [
            { productId: 'P-002', productName: 'Urea', quantity: 1, unitPrice: 266, total: 266 }
        ]
    },
    {
        id: 'ORD-2025-017', farmerId: 'F-1016', farmerName: 'Ritu Devi', date: '2025-02-23', status: 'Pending', totalAmount: 2400, paymentStatus: 'Unpaid', items: [
            { productId: 'P-006', productName: 'Knapsack Sprayer 16L', quantity: 2, unitPrice: 1200, total: 2400 }
        ]
    },
];
