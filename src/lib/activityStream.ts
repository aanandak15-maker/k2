type ERPActivityType = 
  | 'farmer_onboarded' | 'farmer_kyc_updated' | 'farmer_kyc_expired'
  | 'procurement_completed' | 'input_distributed' 
  | 'payment_received' | 'payment_made' | 'invoice_generated'
  | 'board_meeting_held' | 'agm_conducted' | 'resolution_passed'
  | 'share_allotted' | 'director_changed' | 'auditor_appointed'
  | 'field_visit_logged' | 'advisory_sent'
  | 'warehouse_stock_updated' | 'quality_check_done';

export interface ERPActivity {
  id: string;
  type: ERPActivityType;
  fpoId: string;
  timestamp: string;
  actorId: string;
  actorRole: string;
  payload: Record<string, any>;
}

type ActivityListener = (activity: ERPActivity) => void;

class ActivityStream {
  private listeners: ActivityListener[] = [];
  private history: ERPActivity[] = []; // In-memory store for demo

  subscribe(listener: ActivityListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  emit(activity: Omit<ERPActivity, 'id' | 'timestamp'>) {
    const fullActivity: ERPActivity = {
      ...activity,
      id: `EVT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString()
    };
    
    this.history.unshift(fullActivity);
    if (this.history.length > 500) {
      this.history.pop();
    }

    this.listeners.forEach(listener => {
      try {
        listener(fullActivity);
      } catch (error) {
        console.error('Error in activity stream listener:', error);
      }
    });
  }

  getHistory(): ERPActivity[] {
    return [...this.history];
  }
}

export const activityStream = new ActivityStream();
