// K2 Compliance Categories — Source: K2_Compliance_Catalog_v1.xlsx (Categories sheet)

export type ComplianceCategoryId = 
  | 'CAT-STA'   // Statutory
  | 'CAT-ROC'   // ROC
  | 'CAT-TAX'   // Tax
  | 'CAT-AUD'   // Audit
  | 'CAT-GOV'   // Governance
  | 'CAT-LAB'   // Labour
  | 'CAT-LIC'   // License
  | 'CAT-SCH';  // Scheme

export interface ComplianceCategory {
  id: ComplianceCategoryId;
  name: string;
  description: string;
  filterColor: string;       // Catalog color name
  cssColor: string;          // Mapped HSL for UI
  cssColorLight: string;     // Light variant for backgrounds
  icon: string;              // Lucide icon name
}

export const COMPLIANCE_CATEGORIES: Record<ComplianceCategoryId, ComplianceCategory> = {
  'CAT-STA': {
    id: 'CAT-STA',
    name: 'Statutory',
    description: 'Foundational identity and registration compliance (PAN, GST reg, bank).',
    filterColor: 'Dark Green',
    cssColor: 'hsl(145, 63%, 32%)',
    cssColorLight: 'hsl(145, 63%, 95%)',
    icon: 'Shield',
  },
  'CAT-ROC': {
    id: 'CAT-ROC',
    name: 'ROC',
    description: 'MCA / Companies Act filings (AOC-4, MGT-7, DIR, ADT, MGT-14).',
    filterColor: 'Forest',
    cssColor: 'hsl(150, 50%, 28%)',
    cssColorLight: 'hsl(150, 50%, 94%)',
    icon: 'Building2',
  },
  'CAT-TAX': {
    id: 'CAT-TAX',
    name: 'Tax',
    description: 'GST, TDS, Income Tax, Advance Tax, Tax Audit.',
    filterColor: 'Earth Gold',
    cssColor: 'hsl(38, 70%, 45%)',
    cssColorLight: 'hsl(38, 70%, 94%)',
    icon: 'Receipt',
  },
  'CAT-AUD': {
    id: 'CAT-AUD',
    name: 'Audit',
    description: 'Statutory audit, internal audit, audit-trail compliance.',
    filterColor: 'Olive',
    cssColor: 'hsl(75, 40%, 38%)',
    cssColorLight: 'hsl(75, 40%, 93%)',
    icon: 'ClipboardCheck',
  },
  'CAT-GOV': {
    id: 'CAT-GOV',
    name: 'Governance',
    description: 'AGM, Board Meetings, Registers, Decision tracking, Members.',
    filterColor: 'Mid Green',
    cssColor: 'hsl(140, 45%, 42%)',
    cssColorLight: 'hsl(140, 45%, 94%)',
    icon: 'Users',
  },
  'CAT-LAB': {
    id: 'CAT-LAB',
    name: 'Labour',
    description: 'EPF, ESI, PT, Gratuity, Shops & Establishment.',
    filterColor: 'Sage',
    cssColor: 'hsl(130, 25%, 52%)',
    cssColorLight: 'hsl(130, 25%, 94%)',
    icon: 'HardHat',
  },
  'CAT-LIC': {
    id: 'CAT-LIC',
    name: 'License',
    description: 'FSSAI, Seed, Fert, Pest, IEC, APEDA, Organic, WDRA, Mandi, Pollution, NOC.',
    filterColor: 'Amber',
    cssColor: 'hsl(30, 75%, 50%)',
    cssColorLight: 'hsl(30, 75%, 94%)',
    icon: 'BadgeCheck',
  },
  'CAT-SCH': {
    id: 'CAT-SCH',
    name: 'Scheme',
    description: 'NABARD, SFAC, Equity Grant, CGS, MIDH, PMFBY linkage.',
    filterColor: 'Cream Gold',
    cssColor: 'hsl(42, 65%, 52%)',
    cssColorLight: 'hsl(42, 65%, 94%)',
    icon: 'Landmark',
  },
};

// Helper to get category by ID
export function getCategoryById(id: ComplianceCategoryId): ComplianceCategory {
  return COMPLIANCE_CATEGORIES[id];
}

// Map old category names to new IDs (for migration)
export const LEGACY_CATEGORY_MAP: Record<string, ComplianceCategoryId> = {
  'ROC_MCA': 'CAT-ROC',
  'TAX_GST': 'CAT-TAX',
  'TAX_INCOME': 'CAT-TAX',
  'AUDIT': 'CAT-AUD',
  'GOVERNANCE': 'CAT-GOV',
  'NABARD_SFAC': 'CAT-SCH',
  'SECTORAL': 'CAT-LIC',
  'LABOR': 'CAT-LAB',
};
