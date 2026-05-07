import { ComplianceTask } from '../data/mock/compliance';
import { calculateHealthScore } from '../data/healthScoreEngine';

export interface FundingSource {
  id: string;
  name: string;
  type: 'grant' | 'loan' | 'procurement' | 'subsidy';
  provider: string;
  amountText: string;
  minScoreReq: number;
  requiredComplianceIds: string[];
}

export interface EligibilityResult {
  source: FundingSource;
  isEligible: boolean;
  scoreMet: boolean;
  missingCompliances: ComplianceTask[];
}

export const FUNDING_SOURCES: FundingSource[] = [
  {
    id: 'FS-001',
    name: 'Working Capital Facility',
    type: 'loan',
    provider: 'NABARD',
    amountText: 'Up to ₹50 Lakhs',
    minScoreReq: 85,
    requiredComplianceIds: ['ROC-AOC4', 'ROC-MGT7', 'AUD-STAT']
  },
  {
    id: 'FS-002',
    name: 'Equity Grant Scheme',
    type: 'grant',
    provider: 'SFAC',
    amountText: 'Matching up to ₹15 Lakhs',
    minScoreReq: 75,
    requiredComplianceIds: ['SCH-EQUITY', 'GOV-AGM']
  },
  {
    id: 'FS-003',
    name: 'Commercial Agri-Loan',
    type: 'loan',
    provider: 'SBI / HDFC',
    amountText: 'Based on Turnover',
    minScoreReq: 70,
    requiredComplianceIds: ['TAX-ITR', 'GST-3B', 'GST-9']
  },
  {
    id: 'FS-004',
    name: 'Institutional Procurement Vendor',
    type: 'procurement',
    provider: 'FCI / NAFED',
    amountText: 'Contract Based',
    minScoreReq: 80,
    requiredComplianceIds: ['LIC-FSSAI', 'LIC-MANDI']
  }
];

export function assessCreditReadiness(tasks: ComplianceTask[]): { 
  overallScore: number, 
  eligibility: EligibilityResult[] 
} {
  const healthData = calculateHealthScore(tasks);
  const currentScore = healthData.score;

  const eligibility = FUNDING_SOURCES.map(source => {
    const scoreMet = currentScore >= source.minScoreReq;
    
    // Check if the required compliances are either closed or not currently overdue/pending critically
    // For a strict check: they must exist in the system and be in a 'closed' state.
    // Since some might be annual, we check if there are any *open* or *overdue* instances blocking it.
    
    const missingCompliances = tasks.filter(t => 
      source.requiredComplianceIds.includes(t.complianceId) && 
      (t.status === 'overdue' || t.status === 'pending')
    );

    const isEligible = scoreMet && missingCompliances.length === 0;

    return {
      source,
      isEligible,
      scoreMet,
      missingCompliances
    };
  });

  return {
    overallScore: currentScore,
    eligibility
  };
}
