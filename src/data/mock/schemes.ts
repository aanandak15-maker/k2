export interface Scheme {
    id: string;
    name: string;
    agency: string;
    type: 'Equity Grant' | 'Credit Guarantee' | 'Infrastructure' | 'Working Capital';
    status: 'Applied' | 'Sanctioned' | 'Disbursed' | 'Utilization Pending' | 'Closed';
    amount: number;
    disbursedAmount: number;
    applicationDate: string;
    sanctionDate?: string;
    progressPct: number;
    nextAction: string;
    nextActionDue: string;
}

export const mockSchemes: Scheme[] = [
    {
        id: 'SCH-EQUITY',
        name: 'Matching Equity Grant Scheme',
        agency: 'SFAC',
        type: 'Equity Grant',
        status: 'Sanctioned',
        amount: 1500000,
        disbursedAmount: 1500000,
        applicationDate: '2023-05-10',
        sanctionDate: '2023-08-15',
        progressPct: 100,
        nextAction: 'Submit final utilization certificate',
        nextActionDue: '2024-08-15'
    },
    {
        id: 'SCH-CGS',
        name: 'Credit Guarantee Scheme',
        agency: 'NABARD',
        type: 'Credit Guarantee',
        status: 'Disbursed',
        amount: 5000000,
        disbursedAmount: 5000000,
        applicationDate: '2023-10-01',
        progressPct: 80,
        nextAction: 'Submit quarterly stock statement',
        nextActionDue: '2024-04-10'
    },
    {
        id: 'SCH-MIDH',
        name: 'Mission for Integrated Development of Horticulture',
        agency: 'NHB',
        type: 'Infrastructure',
        status: 'Applied',
        amount: 2500000,
        disbursedAmount: 0,
        applicationDate: '2024-01-15',
        progressPct: 20,
        nextAction: 'Reply to agency query regarding land records',
        nextActionDue: '2024-03-30'
    }
];
