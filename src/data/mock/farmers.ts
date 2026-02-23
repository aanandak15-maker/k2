export interface Farmer {
    id: string;
    name: string;
    phone: string;
    village: string;
    cluster: string;
    landSizeDb: number; // in acres
    status: 'Active' | 'Dormant' | 'Inactive' | 'Pending KYC';
    membershipDate: string;
    outstandingDues: number;
    shareCapital: number;
    crops: string[];
    lastVisit: string;
    riskScore: 'Low' | 'Medium' | 'High';
}

export const mockFarmers: Farmer[] = [
    // ──── North Cluster ────
    { id: 'F-1001', name: 'Ram Singh', phone: '+91 9876543210', village: 'Rampur', cluster: 'North Cluster', landSizeDb: 5.2, status: 'Active', membershipDate: '2022-03-15', outstandingDues: 0, shareCapital: 1000, crops: ['Wheat', 'Mustard'], lastVisit: '2025-02-10', riskScore: 'Low' },
    { id: 'F-1003', name: 'Gita Devi', phone: '+91 9876543212', village: 'Rampur', cluster: 'North Cluster', landSizeDb: 3.8, status: 'Dormant', membershipDate: '2021-11-05', outstandingDues: 12500, shareCapital: 500, crops: ['Maize', 'Arhar'], lastVisit: '2024-09-15', riskScore: 'High' },
    { id: 'F-1006', name: 'Sunita Bai', phone: '+91 9876543215', village: 'Rampur', cluster: 'North Cluster', landSizeDb: 4.0, status: 'Active', membershipDate: '2023-05-18', outstandingDues: 2100, shareCapital: 1000, crops: ['Mustard', 'Gram'], lastVisit: '2025-02-05', riskScore: 'Medium' },
    { id: 'F-1009', name: 'Pooja Kumari', phone: '+91 9876543218', village: 'Rampur', cluster: 'North Cluster', landSizeDb: 2.0, status: 'Active', membershipDate: '2024-01-10', outstandingDues: 0, shareCapital: 1000, crops: ['Vegetables', 'Marigold'], lastVisit: '2025-02-18', riskScore: 'Low' },
    { id: 'F-1015', name: 'Bhola Nath', phone: '+91 9876543224', village: 'Dhanaura', cluster: 'North Cluster', landSizeDb: 7.5, status: 'Active', membershipDate: '2022-07-01', outstandingDues: 3500, shareCapital: 2000, crops: ['Sugarcane', 'Wheat'], lastVisit: '2025-01-28', riskScore: 'Low' },
    { id: 'F-1020', name: 'Kailash Chand', phone: '+91 9876543229', village: 'Dhanaura', cluster: 'North Cluster', landSizeDb: 1.0, status: 'Pending KYC', membershipDate: '2025-02-15', outstandingDues: 0, shareCapital: 0, crops: [], lastVisit: '', riskScore: 'Low' },

    // ──── East Cluster ────
    { id: 'F-1002', name: 'Shyam Lal', phone: '+91 9876543211', village: 'Sitapur', cluster: 'East Cluster', landSizeDb: 2.5, status: 'Active', membershipDate: '2023-01-10', outstandingDues: 4500, shareCapital: 1000, crops: ['Paddy', 'Vegetables'], lastVisit: '2025-01-25', riskScore: 'Medium' },
    { id: 'F-1007', name: 'Rameshwar', phone: '+91 9876543216', village: 'Sitapur', cluster: 'East Cluster', landSizeDb: 6.5, status: 'Active', membershipDate: '2022-08-30', outstandingDues: 0, shareCapital: 1500, crops: ['Wheat', 'Paddy'], lastVisit: '2025-02-20', riskScore: 'Low' },
    { id: 'F-1008', name: 'Anil Yadav', phone: '+91 9876543217', village: 'Sitapur', cluster: 'East Cluster', landSizeDb: 3.2, status: 'Dormant', membershipDate: '2021-02-14', outstandingDues: 8500, shareCapital: 1000, crops: ['Maize'], lastVisit: '2024-11-10', riskScore: 'High' },
    { id: 'F-1010', name: 'Dinesh Prasad', phone: '+91 9876543219', village: 'Sitapur', cluster: 'East Cluster', landSizeDb: 4.5, status: 'Active', membershipDate: '2023-06-22', outstandingDues: 0, shareCapital: 1000, crops: ['Paddy', 'Maize'], lastVisit: '2025-02-01', riskScore: 'Low' },
    { id: 'F-1016', name: 'Ritu Devi', phone: '+91 9876543225', village: 'Mohammadpur', cluster: 'East Cluster', landSizeDb: 1.8, status: 'Active', membershipDate: '2024-03-12', outstandingDues: 750, shareCapital: 500, crops: ['Vegetables'], lastVisit: '2025-02-12', riskScore: 'Low' },
    { id: 'F-1021', name: 'Prem Chand', phone: '+91 9876543230', village: 'Mohammadpur', cluster: 'East Cluster', landSizeDb: 5.0, status: 'Pending KYC', membershipDate: '2025-02-18', outstandingDues: 0, shareCapital: 0, crops: ['Wheat'], lastVisit: '', riskScore: 'Low' },

    // ──── South Cluster ────
    { id: 'F-1004', name: 'Hari Om', phone: '+91 9876543213', village: 'Lakshmanpur', cluster: 'South Cluster', landSizeDb: 8.0, status: 'Active', membershipDate: '2022-06-20', outstandingDues: 0, shareCapital: 2000, crops: ['Wheat', 'Sugarcane'], lastVisit: '2025-02-15', riskScore: 'Low' },
    { id: 'F-1005', name: 'Kishan Kumar', phone: '+91 9876543214', village: 'Lakshmanpur', cluster: 'South Cluster', landSizeDb: 1.5, status: 'Inactive', membershipDate: '2020-04-12', outstandingDues: 0, shareCapital: 1000, crops: ['Vegetables'], lastVisit: '2024-02-28', riskScore: 'Low' },
    { id: 'F-1011', name: 'Sanjay Verma', phone: '+91 9876543220', village: 'Lakshmanpur', cluster: 'South Cluster', landSizeDb: 10.0, status: 'Active', membershipDate: '2021-12-01', outstandingDues: 15000, shareCapital: 2000, crops: ['Wheat', 'Paddy', 'Sugarcane'], lastVisit: '2025-02-08', riskScore: 'High' },
    { id: 'F-1012', name: 'Meena Kumari', phone: '+91 9876543221', village: 'Khairthal', cluster: 'South Cluster', landSizeDb: 3.0, status: 'Active', membershipDate: '2023-09-15', outstandingDues: 1200, shareCapital: 1000, crops: ['Mustard', 'Gram'], lastVisit: '2025-01-30', riskScore: 'Medium' },
    { id: 'F-1017', name: 'Govind Singh', phone: '+91 9876543226', village: 'Khairthal', cluster: 'South Cluster', landSizeDb: 12.0, status: 'Active', membershipDate: '2021-04-05', outstandingDues: 0, shareCapital: 3000, crops: ['Wheat', 'Sugarcane', 'Potato'], lastVisit: '2025-02-19', riskScore: 'Low' },

    // ──── West Cluster ────
    { id: 'F-1013', name: 'Rajesh Tiwari', phone: '+91 9876543222', village: 'Bijnor', cluster: 'West Cluster', landSizeDb: 6.0, status: 'Active', membershipDate: '2022-11-10', outstandingDues: 6000, shareCapital: 1500, crops: ['Wheat', 'Gram'], lastVisit: '2025-02-14', riskScore: 'Medium' },
    { id: 'F-1014', name: 'Chhaya Devi', phone: '+91 9876543223', village: 'Bijnor', cluster: 'West Cluster', landSizeDb: 2.2, status: 'Dormant', membershipDate: '2022-01-20', outstandingDues: 22000, shareCapital: 1000, crops: ['Paddy'], lastVisit: '2024-06-01', riskScore: 'High' },
    { id: 'F-1018', name: 'Mohan Lal', phone: '+91 9876543227', village: 'Chandpur', cluster: 'West Cluster', landSizeDb: 9.0, status: 'Active', membershipDate: '2021-08-15', outstandingDues: 0, shareCapital: 2500, crops: ['Wheat', 'Mustard', 'Paddy'], lastVisit: '2025-02-21', riskScore: 'Low' },
    { id: 'F-1019', name: 'Priya Sharma', phone: '+91 9876543228', village: 'Chandpur', cluster: 'West Cluster', landSizeDb: 0.5, status: 'Active', membershipDate: '2024-08-01', outstandingDues: 0, shareCapital: 500, crops: ['Kitchen Garden'], lastVisit: '2025-02-17', riskScore: 'Low' },
    { id: 'F-1022', name: 'Omprakash', phone: '+91 9876543231', village: 'Bijnor', cluster: 'West Cluster', landSizeDb: 4.2, status: 'Inactive', membershipDate: '2020-06-30', outstandingDues: 18500, shareCapital: 1000, crops: ['Maize', 'Vegetables'], lastVisit: '2024-03-15', riskScore: 'High' },
    { id: 'F-1023', name: 'Neelam Bai', phone: '+91 9876543232', village: 'Chandpur', cluster: 'West Cluster', landSizeDb: 1.2, status: 'Pending KYC', membershipDate: '2025-02-20', outstandingDues: 0, shareCapital: 0, crops: ['Vegetables'], lastVisit: '', riskScore: 'Low' },
];
