import { ComplianceTask, ComplianceTaskStatus, ComplianceSeverity, RiskBand } from './mock/compliance';

// Health Score Logic implementation based on Sheet 3

export const SEVERITY_WEIGHTS: Record<ComplianceSeverity | string, number> = {
  'Critical': 5,
  'High': 3,
  'Medium': 2,
  'Low': 1,
  'critical': 5,
  'high': 3,
  'medium': 2,
  'low': 1,
};

export const STATUS_MULTIPLIERS: Record<ComplianceTaskStatus | string, number> = {
  'closed_on_time': 1.0,
  'Closed (on-time)': 1.0,
  'closed_late': 0.7,
  'Closed (late)': 0.7,
  'verified': 0.9,
  'Verified': 0.9,
  'submitted': 0.6,
  'Submitted': 0.6,
  'in_progress': 0.3,
  'In-Progress': 0.3,
  'pending': 0.2,
  'Pending (within due)': 0.2,
  'overdue': 0.0,
  'Overdue': 0.0,
};

export interface HealthScoreResult {
  score: number;
  maxPossible: number;
  weightedScore: number;
  band: RiskBand;
  color: string;
  meaning: string;
}

export function getRiskBand(score: number): { band: RiskBand, color: string, meaning: string } {
  if (score >= 90) return { band: 'excellent', color: 'bg-green-500', meaning: 'Audit-ready, funding-ready.' };
  if (score >= 75) return { band: 'good', color: 'bg-green-400', meaning: 'Minor gaps, easily closeable.' };
  if (score >= 60) return { band: 'caution', color: 'bg-yellow-500', meaning: 'Material gaps, address within 30 days.' };
  if (score >= 40) return { band: 'risk', color: 'bg-orange-500', meaning: 'High risk of penalty / grant impact.' };
  return { band: 'critical', color: 'bg-red-500', meaning: 'Immediate intervention required.' };
}

export function calculateHealthScore(tasks: ComplianceTask[]): HealthScoreResult {
  if (!tasks || tasks.length === 0) {
    return {
      score: 100,
      maxPossible: 0,
      weightedScore: 0,
      band: 'excellent',
      color: 'bg-green-500',
      meaning: 'No active compliances.'
    };
  }

  let totalWeight = 0;
  let totalWeightedScore = 0;

  for (const task of tasks) {
    const weight = SEVERITY_WEIGHTS[task.severity] || 0;
    const multiplier = STATUS_MULTIPLIERS[task.status] !== undefined ? STATUS_MULTIPLIERS[task.status] : 0;
    
    totalWeight += weight;
    totalWeightedScore += weight * multiplier;
  }

  const score = totalWeight > 0 ? Math.round((totalWeightedScore / totalWeight) * 100) : 100;
  const bandInfo = getRiskBand(score);

  return {
    score,
    maxPossible: totalWeight,
    weightedScore: totalWeightedScore,
    band: bandInfo.band,
    color: bandInfo.color,
    meaning: bandInfo.meaning
  };
}

export function calculateCategoryScore(tasks: ComplianceTask[], categoryId: string): HealthScoreResult {
  const categoryTasks = tasks.filter(t => t.category === categoryId);
  return calculateHealthScore(categoryTasks);
}
