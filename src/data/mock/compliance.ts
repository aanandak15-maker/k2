// K2 Compliance Type System — Source: K2_Compliance_Catalog_v1.xlsx
// This replaces the old type system with catalog-aligned types.

import { ComplianceCategoryId } from '../categories';

// ─── Severity ───────────────────────────────────────────────
export type ComplianceSeverity = 'critical' | 'high' | 'medium' | 'low';

// ─── Frequency ──────────────────────────────────────────────
export type ComplianceFrequency = 
  | 'monthly' 
  | 'quarterly' 
  | 'half_yearly' 
  | 'annual' 
  | 'one_time' 
  | 'event_based'
  | 'continuous'
  | 'seasonal';

// ─── Task Status (7 statuses from Health Score Logic sheet) ─
export type ComplianceTaskStatus = 
  | 'closed_on_time'    // 1.0 — Full credit
  | 'closed_late'       // 0.7 — Partial credit; closed but late
  | 'verified'          // 0.9 — Submitted + verified, awaiting closure
  | 'submitted'         // 0.6 — Maker done, pending verifier
  | 'in_progress'       // 0.3 — Started, not submitted
  | 'pending'           // 0.2 — Open and within due window
  | 'overdue';          // 0.0 — No credit; pulls score down

// ─── Risk Band ──────────────────────────────────────────────
export type RiskBand = 'excellent' | 'good' | 'caution' | 'risk' | 'critical';

// ─── Workflow Step ──────────────────────────────────────────
export interface WorkflowStep {
  stepName: string;
  assignedRole: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  completedBy?: string;
  completedAt?: string;
  notes?: string;
}

// ─── Compliance Task Instance (runtime task from catalog item) ─
export interface ComplianceTask {
  id: string;
  complianceId: string;          // Foreign key to catalog (e.g., 'GST-3B')
  name: string;
  formNumber?: string;
  category: ComplianceCategoryId;
  description: string;
  legalReference?: string;

  // Timing
  dueDate: string;
  reminderDates: string[];
  frequency: ComplianceFrequency;
  financialYear: string;
  quarter?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  periodLabel?: string;          // "Apr 2025", "Q1 FY25-26"

  // Status & Risk
  status: ComplianceTaskStatus;
  severity: ComplianceSeverity;
  penaltyAmount?: string;
  penaltyDescription?: string;

  // Authority
  authority?: string;

  // Assignment
  assignedTo?: string;
  assignedRole?: string;
  approver?: string;

  // Documents
  requiredDocuments: string[];
  attachedDocuments: string[];

  // Workflow
  workflowSteps?: WorkflowStep[];
  completedDate?: string;
  filingReference?: string;
  notes?: string;

  // Applicability
  applicabilityRuleId?: string;
}

// Legacy compatibility — keeping old types as aliases during migration
/** @deprecated Use ComplianceCategoryId */
export type ComplianceCategory = ComplianceCategoryId;
/** @deprecated Use ComplianceTaskStatus */
export type TaskStatus = ComplianceTaskStatus;
/** @deprecated Use ComplianceSeverity */
export type RiskLevel = ComplianceSeverity;
/** @deprecated Use ComplianceFrequency */
export type RecurrenceType = ComplianceFrequency;
