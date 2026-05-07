import { activityStream, ERPActivity } from './activityStream';
import { AppEventType, AppEvent, onComplianceEvent } from './eventBus';
import { FPOProfile, DEMO_FPO_PROFILE } from '../data/mock/fpoProfile';
import { mockComplianceTasks } from '../data/mock/complianceCalendar';
import { ComplianceTask } from '../data/mock/compliance';

class ERPComplianceBridge {
  private activeFpo: FPOProfile = DEMO_FPO_PROFILE;

  constructor() {
    this.init();
  }

  setFpoProfile(fpo: FPOProfile) {
    this.activeFpo = fpo;
  }

  private init() {
    activityStream.subscribe((activity) => this.processActivity(activity));
  }

  private processActivity(activity: ERPActivity) {
    console.log(`[Bridge] Processing activity: ${activity.type}`);
    
    // 1. Auto-close tasks based on activity
    this.autoCloseTasks(activity);

    // 2. Trigger event-based compliance tasks
    this.triggerNewTasks(activity);
  }

  private autoCloseTasks(activity: ERPActivity) {
    const today = new Date().toISOString().split('T')[0];

    // Example mappings of ERP Activity -> Compliance Task Closure
    mockComplianceTasks.forEach(task => {
      if (task.status === 'closed_on_time' || task.status === 'closed_late') return;

      let shouldClose = false;

      if (activity.type === 'agm_conducted' && task.complianceId === 'GOV-AGM') {
        shouldClose = true;
      }
      if (activity.type === 'auditor_appointed' && task.complianceId === 'ROC-ADT1') {
        shouldClose = true;
      }
      if (activity.type === 'board_meeting_held' && task.complianceId === 'GOV-BOD') {
        shouldClose = true;
      }

      if (shouldClose) {
        const isLate = task.dueDate < today;
        task.status = isLate ? 'closed_late' : 'closed_on_time';
        task.completedDate = today;
        task.notes = `Auto-closed by ERP Activity: ${activity.type}`;
        console.log(`[Bridge] Auto-closed task: ${task.name}`);
        
        // In a real app, this would dispatch to a store
      }
    });
  }

  private triggerNewTasks(activity: ERPActivity) {
    // Map ERP Activity to Compliance Event Type
    let eventType: AppEventType | null = null;
    let payload = activity.payload;

    switch (activity.type) {
      case 'director_changed':
        eventType = 'director_change';
        break;
      case 'share_allotted':
      case 'farmer_onboarded': // Farmer onboarded might mean new member
        if (activity.payload.isMember) {
          eventType = 'new_member';
        }
        break;
      case 'resolution_passed':
        eventType = 'resolution_passed';
        break;
      case 'auditor_appointed':
          eventType = 'auditor_appointed';
          break;
    }

    if (eventType) {
      const event: AppEvent = {
        id: activity.id,
        type: eventType,
        fpoId: activity.fpoId,
        date: activity.timestamp.split('T')[0],
        payload
      };

      const newTask = onComplianceEvent(event, this.activeFpo);
      if (newTask) {
        console.log(`[Bridge] Generated new task from event: ${newTask.name}`);
        // Add to global tasks list in memory (for demo purposes)
        mockComplianceTasks.push(newTask);
      }
    }
  }
}

export const erpComplianceBridge = new ERPComplianceBridge();
