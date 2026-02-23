export interface Transaction {
    id: string;
    date: string;
    type: 'Income' | 'Expense' | 'Transfer';
    category: 'Input Sales' | 'Output Procurement' | 'Share Capital' | 'Operations' | 'Salary' | 'Other';
    amount: number;
    party: string;
    reference: string;
    status: 'Completed' | 'Pending' | 'Failed';
}

export const mockTransactions: Transaction[] = [
    {
        id: 'TXN-001',
        date: '2024-02-22',
        type: 'Income',
        category: 'Input Sales',
        amount: 8100,
        party: 'Hari Om (F-1004)',
        reference: 'ORD-2024-004',
        status: 'Completed'
    },
    {
        id: 'TXN-002',
        date: '2024-02-21',
        type: 'Expense',
        category: 'Output Procurement',
        amount: 145000,
        party: 'Multiple Farmers (Batch 42)',
        reference: 'PROC-2024-11',
        status: 'Completed'
    },
    {
        id: 'TXN-003',
        date: '2024-02-20',
        type: 'Income',
        category: 'Share Capital',
        amount: 1000,
        party: 'Sunita Bai (F-1006)',
        reference: 'SHR-089',
        status: 'Completed'
    },
    {
        id: 'TXN-004',
        date: '2024-02-18',
        type: 'Expense',
        category: 'Operations',
        amount: 12500,
        party: 'Agri Logistics Ltd.',
        reference: 'INV-AL-992',
        status: 'Pending'
    },
    {
        id: 'TXN-005',
        date: '2024-02-15',
        type: 'Income',
        category: 'Input Sales',
        amount: 4500,
        party: 'Ram Singh (F-1001)',
        reference: 'ORD-2024-001',
        status: 'Completed'
    },
    {
        id: 'TXN-006',
        date: '2024-02-01',
        type: 'Expense',
        category: 'Salary',
        amount: 85000,
        party: 'Staff Payroll',
        reference: 'PAY-JAN-2024',
        status: 'Completed'
    }
];

export const mockFinanceSummary = {
    totalRevenue: 2450000,
    totalExpenses: 1850000,
    cashInBank: 425000,
    receivables: 320000,
    payables: 180000,
    shareCapital: 1085000
};
