export interface ComplianceTask {
    id: string;
    name: string;
    category: 'ROC' | 'Tax' | 'Financial' | 'Governance' | 'NABARD';
    dueDate: string;
    status: 'Completed' | 'Pending' | 'Overdue';
    description: string;
}

export const mockComplianceTasks: ComplianceTask[] = [
    {
        id: 'COMP-001',
        name: 'MGT-7 Annual Return',
        category: 'ROC',
        dueDate: '2024-11-29',
        status: 'Pending',
        description: 'File Annual Return with Ministry of Corporate Affairs.'
    },
    {
        id: 'COMP-002',
        name: 'AOC-4 Financial Statement',
        category: 'ROC',
        dueDate: '2024-10-30',
        status: 'Completed',
        description: 'File audited financial statements with MCA.'
    },
    {
        id: 'COMP-003',
        name: 'GST Return (GSTR-3B)',
        category: 'Tax',
        dueDate: '2024-03-20',
        status: 'Pending',
        description: 'Monthly GST return filing for February.'
    },
    {
        id: 'COMP-004',
        name: 'NABARD MIS Report',
        category: 'NABARD',
        dueDate: '2024-02-15',
        status: 'Overdue',
        description: 'Quarterly progress report for NABARD matching grant.'
    },
    {
        id: 'COMP-005',
        name: 'Annual General Meeting (AGM)',
        category: 'Governance',
        dueDate: '2024-09-30',
        status: 'Pending',
        description: 'Hold the Annual General Meeting for shareholders.'
    },
    {
        id: 'COMP-006',
        name: 'TDS Payment',
        category: 'Tax',
        dueDate: '2024-03-07',
        status: 'Pending',
        description: 'Deposit TDS collected in February.'
    }
];
