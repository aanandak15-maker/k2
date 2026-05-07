import { FPOProfile } from '../../data/mock/fpoProfile';

export function generateTraceabilityReport(fpo: FPOProfile, buyerId?: string) {
  return {
    documentId: `TRC-${Date.now()}`,
    issuedBy: fpo.name,
    issuedDate: new Date().toISOString(),
    buyerReference: buyerId || 'General Retail',
    batchDetails: {
      batchId: `BCH-${Math.floor(Math.random() * 10000)}`,
      commodity: 'Wheat',
      variety: 'HD-2967',
      quantityKg: 5000,
      harvestDateRange: '2025-03-15 to 2025-03-25'
    },
    farmerContribution: [
      { farmerId: 'FPO-001', name: 'Raju Yadav', village: 'Pilkhana', quantityKg: 1200, qualityGrade: 'A' },
      { farmerId: 'FPO-015', name: 'Suresh Kumar', village: 'Pilkhana', quantityKg: 800, qualityGrade: 'A' },
      { farmerId: 'FPO-042', name: 'Amit Singh', village: 'Rampur', quantityKg: 3000, qualityGrade: 'A-' }
    ],
    qualityAssurance: {
      moistureContent: '11.5%',
      foreignMatter: '< 0.5%',
      pesticideResidue: 'Below MRL (Tested on 2025-03-26)',
      certification: fpo.markets_organic ? 'Organic NPOP' : 'Standard GAP'
    },
    chainOfCustody: [
      { step: 'Harvesting', date: '2025-03-15 to 2025-03-25', location: 'Farm Level' },
      { step: 'Procurement & Aggregation', date: '2025-03-26', location: 'FPO Collection Center' },
      { step: 'Quality Testing', date: '2025-03-26', location: 'FPO Warehouse' },
      { step: 'Dispatch', date: '2025-03-28', location: 'In Transit' }
    ]
  };
}
