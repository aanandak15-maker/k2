export interface CropAdvisory {
    id: string;
    crop: string;
    disease?: string;
    title: string;
    description: string;
    type: 'Disease' | 'Pest' | 'Nutrition' | 'General';
    severity: 'Low' | 'Medium' | 'High';
    dateIssued: string;
}

export const mockAdvisories: CropAdvisory[] = [
    {
        id: 'ADV-001',
        crop: 'Wheat',
        disease: 'Yellow Rust',
        title: 'Yellow Rust Warning for Wheat',
        description: 'Favorable conditions for Yellow Rust observed. If yellow stripes are seen on leaves, spray Propiconazole 25% EC @ 1ml/liter of water.',
        type: 'Disease',
        severity: 'High',
        dateIssued: '2024-02-20'
    },
    {
        id: 'ADV-002',
        crop: 'Mustard',
        disease: 'Aphids',
        title: 'Aphid Attack on Mustard',
        description: 'Monitor fields for Aphids. If incidence is high, spray Imidacloprid 17.8% SL @ 1ml/3 liters of water.',
        type: 'Pest',
        severity: 'Medium',
        dateIssued: '2024-02-18'
    },
    {
        id: 'ADV-003',
        crop: 'General',
        title: 'Upcoming Rain Alert',
        description: 'Light to moderate rainfall expected on Feb 24. Postpone irrigation and fertilizer application.',
        type: 'General',
        severity: 'Medium',
        dateIssued: '2024-02-22'
    }
];
