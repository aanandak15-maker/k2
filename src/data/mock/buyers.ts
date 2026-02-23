export interface Buyer {
    id: string;
    name: string;
    type: 'Corporate' | 'Mandi' | 'Direct Consumer' | 'Exporter' | 'Govt Agency';
    contactPerson: string;
    phone: string;
    email: string;
    gstNumber: string;
    totalVolumePurchased: number;
    outstandingAmount: number;
    status: 'Active' | 'Inactive' | 'Blacklisted';
    contractStatus: 'Active Contract' | 'No Contract' | 'Expired';
    address?: string;
    lastPurchaseDate?: string;
}

export const mockBuyers: Buyer[] = [
    { id: 'BYR-001', name: 'ITC Agri Business', type: 'Corporate', contactPerson: 'Manoj Kumar', phone: '+91 9876512340', email: 'procurement@itc.in', gstNumber: '27AAACI1234B1Z5', totalVolumePurchased: 5000, outstandingAmount: 450000, status: 'Active', contractStatus: 'Active Contract', address: 'ITC Tower, Kolkata, WB', lastPurchaseDate: '2025-02-22' },
    { id: 'BYR-002', name: 'Agra Mandi Samiti', type: 'Mandi', contactPerson: 'Ramesh Yadav', phone: '+91 9876512341', email: 'secretary@agramandi.gov.in', gstNumber: '09AAACA9876C1Z6', totalVolumePurchased: 2500, outstandingAmount: 0, status: 'Active', contractStatus: 'No Contract', address: 'APMC Market, Agra, UP', lastPurchaseDate: '2025-02-15' },
    { id: 'BYR-003', name: 'Global Exports Pvt Ltd', type: 'Exporter', contactPerson: 'Sarah Khan', phone: '+91 9876512342', email: 'sourcing@globalexports.com', gstNumber: '07AAACG5678D1Z7', totalVolumePurchased: 1200, outstandingAmount: 120000, status: 'Active', contractStatus: 'Active Contract', address: 'Okhla, New Delhi', lastPurchaseDate: '2025-02-18' },
    { id: 'BYR-004', name: 'FreshMart Supermarkets', type: 'Corporate', contactPerson: 'Vikas Sharma', phone: '+91 9876512343', email: 'fresh@freshmart.in', gstNumber: '29AAACF3456E1Z8', totalVolumePurchased: 800, outstandingAmount: 50000, status: 'Inactive', contractStatus: 'Expired', address: 'Koramangala, Bangalore, KA', lastPurchaseDate: '2024-11-01' },
    { id: 'BYR-005', name: 'Reliance Fresh', type: 'Corporate', contactPerson: 'Ankit Mehta', phone: '+91 9876512344', email: 'agri@reliancefresh.in', gstNumber: '27BBBCR1234F1Z9', totalVolumePurchased: 3500, outstandingAmount: 280000, status: 'Active', contractStatus: 'Active Contract', address: 'BKC, Mumbai, MH', lastPurchaseDate: '2025-02-20' },
    { id: 'BYR-006', name: 'Delhi Mandi Board (Azadpur)', type: 'Mandi', contactPerson: 'Harpal Singh', phone: '+91 9876512345', email: 'info@azadpurmandi.in', gstNumber: '07CCCCA2345G1Z3', totalVolumePurchased: 4200, outstandingAmount: 0, status: 'Active', contractStatus: 'No Contract', address: 'Azadpur, New Delhi', lastPurchaseDate: '2025-02-21' },
    { id: 'BYR-007', name: 'NAFED (Govt Procurement)', type: 'Govt Agency', contactPerson: 'S.K. Verma', phone: '+91 9876512346', email: 'procurement@nafed.in', gstNumber: '07DDDDA3456H1Z2', totalVolumePurchased: 8000, outstandingAmount: 0, status: 'Active', contractStatus: 'Active Contract', address: 'NDMC Complex, New Delhi', lastPurchaseDate: '2025-02-19' },
    { id: 'BYR-008', name: 'Farm2Fork Direct', type: 'Direct Consumer', contactPerson: 'Priya Kapoor', phone: '+91 9876512347', email: 'buy@farm2fork.in', gstNumber: '09EEEEB4567I1Z1', totalVolumePurchased: 150, outstandingAmount: 12000, status: 'Active', contractStatus: 'No Contract', address: 'Noida, UP', lastPurchaseDate: '2025-02-17' },
    { id: 'BYR-009', name: 'Shady Traders Co.', type: 'Direct Consumer', contactPerson: 'Unknown', phone: '+91 9000000000', email: 'none@example.com', gstNumber: 'INVALID', totalVolumePurchased: 50, outstandingAmount: 25000, status: 'Blacklisted', contractStatus: 'No Contract', address: 'Unknown', lastPurchaseDate: '2024-06-01' },
];
