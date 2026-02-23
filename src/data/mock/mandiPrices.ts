export interface MandiPrice {
    commodity: string;
    mandi: string;
    variety: string;
    minPrice: number;
    maxPrice: number;
    modalPrice: number;
    date: string;
    trend: 'Up' | 'Down' | 'Stable';
    trendPercentage: number;
}

export const mockMandiPrices: MandiPrice[] = [
    {
        commodity: 'Wheat',
        mandi: 'Bulandshahr',
        variety: 'Dara',
        minPrice: 2200,
        maxPrice: 2350,
        modalPrice: 2280,
        date: '2024-02-22',
        trend: 'Up',
        trendPercentage: 1.5
    },
    {
        commodity: 'Wheat',
        mandi: 'Hapur',
        variety: 'Dara',
        minPrice: 2250,
        maxPrice: 2400,
        modalPrice: 2310,
        date: '2024-02-22',
        trend: 'Up',
        trendPercentage: 2.1
    },
    {
        commodity: 'Mustard',
        mandi: 'Bulandshahr',
        variety: 'Black',
        minPrice: 4800,
        maxPrice: 5100,
        modalPrice: 4950,
        date: '2024-02-22',
        trend: 'Down',
        trendPercentage: 0.8
    },
    {
        commodity: 'Paddy',
        mandi: 'Bulandshahr',
        variety: 'Common',
        minPrice: 2150,
        maxPrice: 2250,
        modalPrice: 2200,
        date: '2024-02-22',
        trend: 'Stable',
        trendPercentage: 0.0
    },
    {
        commodity: 'Maize',
        mandi: 'Aligarh',
        variety: 'Hybrid',
        minPrice: 2000,
        maxPrice: 2150,
        modalPrice: 2080,
        date: '2024-02-22',
        trend: 'Up',
        trendPercentage: 0.5
    }
];
