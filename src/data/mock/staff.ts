export interface Staff {
    id: string;
    name: string;
    role: 'CEO' | 'Admin' | 'Moderator' | 'Accountant' | 'Field Officer' | 'Other';
    phone: string;
    email: string;
    cluster?: string;
    status: 'Active' | 'On Leave' | 'Inactive';
    attendanceToday: 'Present' | 'Absent' | 'On Leave' | 'Not Marked';
    tasksAssigned: number;
    tasksCompleted: number;
    joinDate: string;
    salary: number;
}

export const mockStaff: Staff[] = [
    { id: 'EMP-001', name: 'Ramesh Kumar', role: 'CEO', phone: '+91 9876540001', email: 'ceo@sikandrabad.fpo.in', status: 'Active', attendanceToday: 'Present', tasksAssigned: 5, tasksCompleted: 4, joinDate: '2020-01-15', salary: 45000 },
    { id: 'EMP-002', name: 'Ramesh Gupta', role: 'Admin', phone: '+91 9876540002', email: 'admin@sikandrabad.fpo.in', status: 'Active', attendanceToday: 'Present', tasksAssigned: 12, tasksCompleted: 8, joinDate: '2020-03-01', salary: 30000 },
    { id: 'EMP-003', name: 'Kisan Mitra (Rajesh)', role: 'Moderator', phone: '+91 9876540003', email: 'rajesh@sikandrabad.fpo.in', cluster: 'North Cluster', status: 'Active', attendanceToday: 'Present', tasksAssigned: 8, tasksCompleted: 6, joinDate: '2021-06-15', salary: 18000 },
    { id: 'EMP-004', name: 'Vikram Singh', role: 'Moderator', phone: '+91 9876540004', email: 'vikram@sikandrabad.fpo.in', cluster: 'East Cluster', status: 'On Leave', attendanceToday: 'On Leave', tasksAssigned: 0, tasksCompleted: 0, joinDate: '2021-08-01', salary: 18000 },
    { id: 'EMP-005', name: 'Amit Sharma', role: 'Accountant', phone: '+91 9876540005', email: 'accounts@sikandrabad.fpo.in', status: 'Active', attendanceToday: 'Absent', tasksAssigned: 15, tasksCompleted: 10, joinDate: '2020-05-10', salary: 25000 },
    { id: 'EMP-006', name: 'Deepak Yadav', role: 'Moderator', phone: '+91 9876540006', email: 'deepak@sikandrabad.fpo.in', cluster: 'South Cluster', status: 'Active', attendanceToday: 'Present', tasksAssigned: 10, tasksCompleted: 9, joinDate: '2022-01-10', salary: 18000 },
    { id: 'EMP-007', name: 'Sonia Bai', role: 'Moderator', phone: '+91 9876540007', email: 'sonia@sikandrabad.fpo.in', cluster: 'West Cluster', status: 'Active', attendanceToday: 'Present', tasksAssigned: 7, tasksCompleted: 5, joinDate: '2022-04-01', salary: 18000 },
    { id: 'EMP-008', name: 'Manoj Tiwari', role: 'Field Officer', phone: '+91 9876540008', email: 'manoj@sikandrabad.fpo.in', cluster: 'North Cluster', status: 'Active', attendanceToday: 'Not Marked', tasksAssigned: 14, tasksCompleted: 11, joinDate: '2023-02-15', salary: 15000 },
    { id: 'EMP-009', name: 'Pradeep Kumar', role: 'Field Officer', phone: '+91 9876540009', email: 'pradeep@sikandrabad.fpo.in', cluster: 'East Cluster', status: 'Active', attendanceToday: 'Present', tasksAssigned: 11, tasksCompleted: 8, joinDate: '2023-06-01', salary: 15000 },
    { id: 'EMP-010', name: 'Ravi Shankar', role: 'Other', phone: '+91 9876540010', email: 'ravi@sikandrabad.fpo.in', status: 'Inactive', attendanceToday: 'Absent', tasksAssigned: 0, tasksCompleted: 0, joinDate: '2021-01-10', salary: 12000 },
];
