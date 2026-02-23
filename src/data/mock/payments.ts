export interface Payment {
    id: string;
    date: string;
    entityId: string;
    entityName: string;
    entityType: 'Farmer' | 'Supplier' | 'Buyer';
    type: 'Inbound' | 'Outbound';
    amount: number;
    paymentMode: 'Bank Transfer' | 'Cash' | 'Cheque' | 'UPI';
    referenceNumber: string;
    status: 'Completed' | 'Pending' | 'Failed' | 'Processing';
    purpose: 'Input Sales' | 'Crop Procurement' | 'Share Capital' | 'Service Fee' | 'Other';
}

export const mockPayments: Payment[] = [
    // ──── Inbound from Buyers (Revenue) ────
    { id: 'PAY-25-001', date: '2025-02-23T10:30:00Z', entityId: 'BYR-001', entityName: 'ITC Agri Business', entityType: 'Buyer', type: 'Inbound', amount: 250000, paymentMode: 'Bank Transfer', referenceNumber: 'UTR-987654321', status: 'Completed', purpose: 'Crop Procurement' },
    { id: 'PAY-25-008', date: '2025-02-20T09:00:00Z', entityId: 'BYR-003', entityName: 'Global Exports Pvt Ltd', entityType: 'Buyer', type: 'Inbound', amount: 180000, paymentMode: 'Bank Transfer', referenceNumber: 'UTR-112233445', status: 'Completed', purpose: 'Crop Procurement' },
    { id: 'PAY-25-012', date: '2025-02-18T14:00:00Z', entityId: 'BYR-002', entityName: 'Agra Mandi Samiti', entityType: 'Buyer', type: 'Inbound', amount: 95000, paymentMode: 'Cheque', referenceNumber: 'CHQ-MANDI-089', status: 'Processing', purpose: 'Crop Procurement' },
    { id: 'PAY-25-018', date: '2025-02-10T11:30:00Z', entityId: 'BYR-005', entityName: 'Reliance Fresh', entityType: 'Buyer', type: 'Inbound', amount: 320000, paymentMode: 'Bank Transfer', referenceNumber: 'UTR-554433221', status: 'Completed', purpose: 'Crop Procurement' },

    // ──── Inbound from Farmers (Input Sales Collections) ────
    { id: 'PAY-25-002', date: '2025-02-23T11:45:00Z', entityId: 'F-1001', entityName: 'Ram Singh', entityType: 'Farmer', type: 'Inbound', amount: 15000, paymentMode: 'UPI', referenceNumber: 'UPI-123456789', status: 'Completed', purpose: 'Input Sales' },
    { id: 'PAY-25-006', date: '2025-02-21T10:00:00Z', entityId: 'F-1004', entityName: 'Hari Om', entityType: 'Farmer', type: 'Inbound', amount: 8100, paymentMode: 'Cash', referenceNumber: 'RCPT-006', status: 'Completed', purpose: 'Input Sales' },
    { id: 'PAY-25-009', date: '2025-02-19T16:30:00Z', entityId: 'F-1017', entityName: 'Govind Singh', entityType: 'Farmer', type: 'Inbound', amount: 54000, paymentMode: 'Bank Transfer', referenceNumber: 'UTR-667788990', status: 'Completed', purpose: 'Input Sales' },
    { id: 'PAY-25-013', date: '2025-02-17T12:00:00Z', entityId: 'F-1015', entityName: 'Bhola Nath', entityType: 'Farmer', type: 'Inbound', amount: 9600, paymentMode: 'UPI', referenceNumber: 'UPI-998877665', status: 'Completed', purpose: 'Input Sales' },
    { id: 'PAY-25-016', date: '2025-02-13T10:15:00Z', entityId: 'F-1006', entityName: 'Sunita Bai', entityType: 'Farmer', type: 'Inbound', amount: 1600, paymentMode: 'Cash', referenceNumber: 'RCPT-016', status: 'Completed', purpose: 'Input Sales' },

    // ──── Inbound – Share Capital ────
    { id: 'PAY-25-004', date: '2025-02-21T09:15:00Z', entityId: 'F-1003', entityName: 'Gita Devi', entityType: 'Farmer', type: 'Inbound', amount: 500, paymentMode: 'Cash', referenceNumber: 'RCPT-004', status: 'Completed', purpose: 'Share Capital' },
    { id: 'PAY-25-010', date: '2025-02-19T11:00:00Z', entityId: 'F-1009', entityName: 'Pooja Kumari', entityType: 'Farmer', type: 'Inbound', amount: 1000, paymentMode: 'UPI', referenceNumber: 'UPI-445566778', status: 'Completed', purpose: 'Share Capital' },
    { id: 'PAY-25-014', date: '2025-02-15T14:30:00Z', entityId: 'F-1016', entityName: 'Ritu Devi', entityType: 'Farmer', type: 'Inbound', amount: 500, paymentMode: 'Cash', referenceNumber: 'RCPT-014', status: 'Completed', purpose: 'Share Capital' },

    // ──── Outbound to Suppliers (Purchases) ────
    { id: 'PAY-25-003', date: '2025-02-22T14:20:00Z', entityId: 'SUP-001', entityName: 'AgriCorp Fertilizers Ltd.', entityType: 'Supplier', type: 'Outbound', amount: 100000, paymentMode: 'Cheque', referenceNumber: 'CHQ-567890', status: 'Processing', purpose: 'Other' },
    { id: 'PAY-25-007', date: '2025-02-20T16:45:00Z', entityId: 'SUP-002', entityName: 'National Seeds Corporation', entityType: 'Supplier', type: 'Outbound', amount: 45000, paymentMode: 'Bank Transfer', referenceNumber: 'UTR-223344556', status: 'Completed', purpose: 'Other' },
    { id: 'PAY-25-011', date: '2025-02-18T10:30:00Z', entityId: 'SUP-003', entityName: 'PestControl Chemicals', entityType: 'Supplier', type: 'Outbound', amount: 28000, paymentMode: 'Bank Transfer', referenceNumber: 'UTR-334455667', status: 'Completed', purpose: 'Other' },
    { id: 'PAY-25-017', date: '2025-02-12T09:45:00Z', entityId: 'SUP-005', entityName: 'UP State Seed Corp', entityType: 'Supplier', type: 'Outbound', amount: 75000, paymentMode: 'Bank Transfer', referenceNumber: 'UTR-778899001', status: 'Completed', purpose: 'Other' },

    // ──── Outbound to Farmers (Crop Procurement Payouts) ────
    { id: 'PAY-25-005', date: '2025-02-21T16:00:00Z', entityId: 'F-1002', entityName: 'Shyam Lal', entityType: 'Farmer', type: 'Outbound', amount: 45000, paymentMode: 'Bank Transfer', referenceNumber: 'UTR-234567890', status: 'Pending', purpose: 'Crop Procurement' },
    { id: 'PAY-25-015', date: '2025-02-14T15:00:00Z', entityId: 'F-1018', entityName: 'Mohan Lal', entityType: 'Farmer', type: 'Outbound', amount: 98700, paymentMode: 'Bank Transfer', referenceNumber: 'UTR-889900112', status: 'Completed', purpose: 'Crop Procurement' },
    { id: 'PAY-25-019', date: '2025-02-08T13:00:00Z', entityId: 'F-1010', entityName: 'Dinesh Prasad', entityType: 'Farmer', type: 'Outbound', amount: 61200, paymentMode: 'Bank Transfer', referenceNumber: 'UTR-990011223', status: 'Completed', purpose: 'Crop Procurement' },

    // ──── Failed Payment (edge case for backend error handling) ────
    { id: 'PAY-25-020', date: '2025-02-22T18:00:00Z', entityId: 'F-1014', entityName: 'Chhaya Devi', entityType: 'Farmer', type: 'Outbound', amount: 42300, paymentMode: 'Bank Transfer', referenceNumber: 'UTR-FAIL-001', status: 'Failed', purpose: 'Crop Procurement' },

    // ──── Service Fee ────
    { id: 'PAY-25-021', date: '2025-02-20T08:30:00Z', entityId: 'F-1007', entityName: 'Rameshwar', entityType: 'Farmer', type: 'Inbound', amount: 200, paymentMode: 'Cash', referenceNumber: 'RCPT-021', status: 'Completed', purpose: 'Service Fee' },
];
