export interface Supplier {
    id: string;
    name: string;
    category: 'Fertilizer' | 'Seed' | 'Pesticide' | 'Equipment' | 'Other';
    contactPerson: string;
    phone: string;
    email: string;
    gstNumber: string;
    totalOrders: number;
    outstandingBalance: number;
    status: 'Active' | 'Inactive' | 'Blacklisted';
    rating: number;
    address?: string;
    lastOrderDate?: string;
}

export const mockSuppliers: Supplier[] = [
    { id: 'SUP-001', name: 'AgriCorp Fertilizers Ltd.', category: 'Fertilizer', contactPerson: 'Rahul Verma', phone: '+91 9876543210', email: 'sales@agricorp.in', gstNumber: '09AAACA1234A1Z5', totalOrders: 45, outstandingBalance: 125000, status: 'Active', rating: 4.8, address: 'Plot 12, Sector 9, Noida, UP', lastOrderDate: '2025-02-20' },
    { id: 'SUP-002', name: 'National Seeds Corporation', category: 'Seed', contactPerson: 'Anita Singh', phone: '+91 9876543211', email: 'orders@nsc.gov.in', gstNumber: '09AAACA1234A1Z6', totalOrders: 28, outstandingBalance: 0, status: 'Active', rating: 4.5, address: 'Beej Bhawan, Pusa Complex, New Delhi', lastOrderDate: '2025-01-10' },
    { id: 'SUP-003', name: 'PestControl Chemicals', category: 'Pesticide', contactPerson: 'Sanjay Gupta', phone: '+91 9876543212', email: 'info@pestcontrol.in', gstNumber: '09AAACA1234A1Z7', totalOrders: 12, outstandingBalance: 45000, status: 'Active', rating: 4.2, address: '45 GIDC Industrial, Vapi, Gujarat', lastOrderDate: '2025-02-05' },
    { id: 'SUP-004', name: 'Kisan Equipments', category: 'Equipment', contactPerson: 'Ramesh Patel', phone: '+91 9876543213', email: 'sales@kisanequip.com', gstNumber: '09AAACA1234A1Z8', totalOrders: 5, outstandingBalance: 10000, status: 'Inactive', rating: 3.8, address: 'Near Railway Station, Aligarh, UP', lastOrderDate: '2024-08-10' },
    { id: 'SUP-005', name: 'UP State Seed Corp', category: 'Seed', contactPerson: 'Dr. A.K. Mishra', phone: '+91 9876543250', email: 'procurement@upssc.gov.in', gstNumber: '09BBBCA5678B1Z9', totalOrders: 18, outstandingBalance: 0, status: 'Active', rating: 4.6, address: 'Lucknow, UP', lastOrderDate: '2025-02-12' },
    { id: 'SUP-006', name: 'Coromandel International', category: 'Fertilizer', contactPerson: 'Venkat Iyer', phone: '+91 9876543251', email: 'orders@coromandel.biz', gstNumber: '36CCCCD9012C1Z3', totalOrders: 22, outstandingBalance: 85000, status: 'Active', rating: 4.7, address: 'T Nagar, Chennai, TN', lastOrderDate: '2025-02-18' },
    { id: 'SUP-007', name: 'Bayer CropScience India', category: 'Pesticide', contactPerson: 'Neeraj Arora', phone: '+91 9876543252', email: 'agro.india@bayer.com', gstNumber: '27DDDDE3456D1Z1', totalOrders: 8, outstandingBalance: 32000, status: 'Active', rating: 4.9, address: 'Bayer House, Thane, Maharashtra', lastOrderDate: '2025-01-25' },
    { id: 'SUP-008', name: 'Quick Agro Traders', category: 'Other', contactPerson: 'Sunil Kumar', phone: '+91 9876543253', email: 'quick.agro@gmail.com', gstNumber: '09EEEEF7890E1Z4', totalOrders: 3, outstandingBalance: 5000, status: 'Blacklisted', rating: 2.1, address: 'Bulandshahr, UP', lastOrderDate: '2024-05-15' },
];
