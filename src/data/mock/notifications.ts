export interface AppNotification {
    id: string;
    title: string;
    message: string;
    type: 'Alert' | 'Success' | 'Info' | 'Warning';
    isRead: boolean;
    date: string;
    role: 'CEO' | 'Admin' | 'Moderator' | 'PlatformAdmin';
}

export const mockNotifications: AppNotification[] = [
    {
        id: 'NOTIF-001',
        title: 'New FPO Registered',
        message: 'Kisan Samridhi FPO has completing onboarding.',
        type: 'Success',
        isRead: false,
        date: '2024-02-22T10:30:00Z',
        role: 'PlatformAdmin'
    },
    {
        id: 'NOTIF-002',
        title: 'Low Stock Alert',
        message: 'DAP Fertilizer stock is below reorder level (18 bags remaining).',
        type: 'Warning',
        isRead: false,
        date: '2024-02-22T09:15:00Z',
        role: 'Admin'
    },
    {
        id: 'NOTIF-003',
        title: 'Compliance Deadline Approaching',
        message: 'NABARD MIS Report is due in 3 days.',
        type: 'Alert',
        isRead: false,
        date: '2024-02-21T14:00:00Z',
        role: 'CEO'
    },
    {
        id: 'NOTIF-004',
        title: 'Payment Received',
        message: 'Received ₹4,500 from Ram Singh for Order ORD-2024-001.',
        type: 'Success',
        isRead: true,
        date: '2024-02-20T11:45:00Z',
        role: 'Admin'
    },
    {
        id: 'NOTIF-005',
        title: 'New Advisory Broadcast',
        message: 'Yellow Rust warning broadcasted to 150 wheat farmers.',
        type: 'Info',
        isRead: true,
        date: '2024-02-19T16:20:00Z',
        role: 'CEO'
    },
    {
        id: 'NOTIF-006',
        title: 'Task Overdue',
        message: 'Field visit to Gita Devi is 2 days overdue.',
        type: 'Alert',
        isRead: false,
        date: '2024-02-22T08:00:00Z',
        role: 'Moderator'
    }
];
