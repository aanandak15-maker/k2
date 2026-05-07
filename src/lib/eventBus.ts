import { APPLICABILITY_RULES } from '../data/applicabilityRules';
import { COMPLIANCE_CATALOG } from '../data/complianceCatalog';
import { FPOProfile } from '../data/mock/fpoProfile';
import { ComplianceTask } from '../data/mock/compliance';
import { extractDays, addDays, resolveAssignee } from './complianceEngine';

export type AppEventType = 
  | 'auditor_appointed'
  | 'director_change'
  | 'new_member'
  | 'resolution_passed'
  | 'equity_grant_received'
  | 'license_renewed';

export interface AppEvent {
  id: string;
  type: AppEventType;
  fpoId: string;
  date: string;
  payload?: Record<string, any>;
}

const EVENT_MAPPING: Record<AppEventType, string> = {
  'auditor_appointed': 'Auditor Appointed/Reappointed',
  'director_change': 'Director Change',
  'resolution_passed': 'Resolution Passed (specified)',
  'new_member': 'New Member / Share Allotment',
  'equity_grant_received': 'Equity Grant Received',
  'license_renewed': 'License Renewed'
};

export function onComplianceEvent(event: AppEvent, fpo: FPOProfile): ComplianceTask | null {
  const targetRuleValue = EVENT_MAPPING[event.type];
  if (!targetRuleValue) return null;

  // Find the event rule that matches this event
  const rule = APPLICABILITY_RULES.find(r => 
    (r.operator === 'event' || r.conditionField === 'event') && 
    r.value === targetRuleValue
  );

  if (!rule) return null;

  const catalogItem = COMPLIANCE_CATALOG.find(c => c.complianceId === rule.complianceId);
  if (!catalogItem) return null;

  // Compute due date from event date
  const daysToAdd = extractDays(catalogItem.dueRule);
  const dueDate = addDays(event.date, daysToAdd);

  return {
    id: `TASK-${catalogItem.complianceId}-${Date.now()}`,
    complianceId: catalogItem.complianceId,
    name: catalogItem.name,
    formNumber: catalogItem.complianceId.split('-')[1] || undefined,
    category: catalogItem.category,
    description: catalogItem.notes || `Triggered by event: ${event.type}`,
    dueDate: dueDate,
    reminderDates: [],
    frequency: 'event_based',
    financialYear: '2025-26', // Use current FY logic in real app
    status: 'pending',
    severity: catalogItem.severity as any,
    penaltyDescription: catalogItem.penaltyForNonCompliance,
    authority: catalogItem.authority,
    requiredDocuments: catalogItem.requiredDocuments || [],
    attachedDocuments: [],
    assignedRole: resolveAssignee(catalogItem.category),
    workflowSteps: []
  };
}
