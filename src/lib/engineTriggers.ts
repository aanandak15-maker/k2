import { FPOProfile } from '../data/mock/fpoProfile';
import { ComplianceTask } from '../data/mock/compliance';
import { ApplicableCompliance, runApplicabilityEngine } from './complianceEngine';

// §6.1 — Full pass on FPO onboarding
export function onFPOOnboarding(fpo: FPOProfile): ApplicableCompliance[] {
  console.log(`[Engine] Running initial compliance pass for ${fpo.id}`);
  return runApplicabilityEngine(fpo);
}

// §6.2 — Delta pass on profile change  
export function onProfileChange(
  fpo: FPOProfile, 
  previousApplicable: string[]
): { added: ApplicableCompliance[], removed: string[], auditLog: string } {
  
  const currentApplicable = runApplicabilityEngine(fpo);
  const currentIds = currentApplicable.map(c => c.complianceId);
  
  const added = currentApplicable.filter(c => !previousApplicable.includes(c.complianceId));
  const removed = previousApplicable.filter(id => !currentIds.includes(id));
  
  return {
    added,
    removed,
    auditLog: `Added ${added.length} rules, removed ${removed.length} rules due to profile update.`
  };
}

// §6.3 — Nightly cron: recompute due dates, mark overdue, generate next recurring
export function nightlyRefresh(
  tasks: ComplianceTask[], 
  fpo: FPOProfile
): { updatedTasks: ComplianceTask[], newTasks: ComplianceTask[] } {
  
  const today = new Date().toISOString().split('T')[0];
  const updatedTasks: ComplianceTask[] = [];
  
  for (const task of tasks) {
    if (task.status === 'pending' || task.status === 'in_progress') {
      if (task.dueDate && task.dueDate < today) {
        updatedTasks.push({ ...task, status: 'overdue' });
      }
    }
  }
  
  // Note: generation of next recurring task omitted for brevity in demo,
  // but would involve running engine for the next period.
  
  return {
    updatedTasks,
    newTasks: []
  };
}
