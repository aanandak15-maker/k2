import { ComplianceTask, ComplianceTaskStatus } from './compliance';
import { runApplicabilityEngine } from '../../lib/complianceEngine';
import { DEMO_FPO_PROFILE } from './fpoProfile';

// Generate mock tasks based on the catalog and applicability rules
export const mockComplianceTasks: ComplianceTask[] = generateMockTasks();

function generateMockTasks(): ComplianceTask[] {
  const applicableItems = runApplicabilityEngine(DEMO_FPO_PROFILE);
  const tasks: ComplianceTask[] = [];

  // A predictable pseudo-random generator for stable mock data
  let seed = 12345;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const statuses: ComplianceTaskStatus[] = [
    'closed_on_time', 'closed_late', 'verified', 'submitted', 'in_progress', 'pending', 'overdue'
  ];

  applicableItems.forEach((item, index) => {
    // Generate 1-2 tasks per applicable item
    const taskCount = item.frequency === 'monthly' ? 2 : 1;

    for (let i = 0; i < taskCount; i++) {
      const isOverdue = random() > 0.8;
      const isClosed = random() > 0.5;
      
      let status: ComplianceTaskStatus = 'pending';
      if (isOverdue) status = 'overdue';
      else if (isClosed) status = random() > 0.8 ? 'closed_late' : 'closed_on_time';
      else status = statuses[Math.floor(random() * statuses.length)];

      const dueDateObj = new Date();
      if (status === 'overdue') {
        dueDateObj.setDate(dueDateObj.getDate() - Math.floor(random() * 30) - 1);
      } else if (status === 'closed_on_time' || status === 'closed_late') {
        dueDateObj.setDate(dueDateObj.getDate() - Math.floor(random() * 30));
      } else {
        dueDateObj.setDate(dueDateObj.getDate() + Math.floor(random() * 30) + 1);
      }

      tasks.push({
        id: `TASK-${item.complianceId}-${i}`,
        complianceId: item.complianceId,
        name: item.name,
        formNumber: item.complianceId.split('-')[1] || undefined,
        category: item.category,
        description: item.notes || `Submit ${item.name} as per guidelines.`,
        dueDate: item.dueDate || dueDateObj.toISOString().split('T')[0],
        reminderDates: [],
        frequency: item.frequency as any,
        financialYear: '2025-26',
        status: status,
        severity: item.severity as any,
        penaltyDescription: item.penaltyForNonCompliance,
        authority: item.authority,
        requiredDocuments: item.requiredDocuments || [],
        attachedDocuments: (status.includes('closed') || status === 'verified' || status === 'submitted') ? ['doc.pdf'] : [],
        assignedRole: item.assigneeRole || 'CEO',
        workflowSteps: [
            { stepName: 'Draft Preparation', assignedRole: 'Accountant', status: status.includes('closed') ? 'completed' : 'in_progress' },
            { stepName: 'Verification', assignedRole: 'CA', status: status.includes('closed') ? 'completed' : 'pending' }
        ]
      });
    }
  });

  return tasks;
}
