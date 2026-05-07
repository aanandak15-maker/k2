import React from 'react';
import { ComplianceTask } from '../../data/mock/compliance';
import { calculateHealthScore } from '../../data/healthScoreEngine';
import { COMPLIANCE_CATEGORIES } from '../../data/categories';
import { ShieldCheck, AlertTriangle, Clock, CalendarCheck } from 'lucide-react';

interface ComplianceOverviewProps {
  tasks: ComplianceTask[];
}

export function ComplianceOverview({ tasks }: ComplianceOverviewProps) {
  // Use real health score engine
  const healthData = calculateHealthScore(tasks);
  
  // Calculate raw stats for display
  const completed = tasks.filter(t => t.status === 'closed_on_time' || t.status === 'closed_late').length;
  const overdue = tasks.filter(t => t.status === 'overdue').length;
  const pending = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress' || t.status === 'submitted' || t.status === 'verified').length;

  // Next 7 days tasks
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  const upcomingTasks = tasks.filter(t => {
      if (t.status.includes('closed')) return false;
      const dueDate = new Date(t.dueDate);
      return dueDate >= today && dueDate <= nextWeek;
  });

  return (
    <div className="mb-6 space-y-4">
      <div className="comp-card p-5 relative overflow-hidden">
        {/* Abstract bg element */}
        <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${healthData.color}`}></div>
        
        <div className="flex justify-between items-center relative z-10">
          <div>
            <h2 className="text-gray-500 text-sm font-semibold tracking-wider uppercase mb-1">
              Compliance Health
            </h2>
            <div className="flex items-baseline gap-3">
              <span className={`text-4xl font-bold ${healthData.color.replace('bg-', 'text-')}`}>{healthData.score}%</span>
              <span className={`text-sm font-medium px-2 py-0.5 rounded text-white ${healthData.color}`}>
                {healthData.band.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-2">
              Based on {tasks.length} statutory requirements
            </p>
            <p className="text-gray-400 text-xs italic mt-1 max-w-[200px] truncate">
              {healthData.meaning}
            </p>
          </div>
          
          <div className="w-20 h-20 relative">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <path
                className="text-gray-100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className={`${healthData.color.replace('bg-', 'text-')} comp-gauge-circle`}
                strokeDasharray={`${healthData.score}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <ShieldCheck className={`w-8 h-8 ${healthData.color.replace('bg-', 'text-')} opacity-80`} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-5 relative z-10">
            <div className="bg-white/50 rounded-lg p-3 text-center border border-gray-200/50">
                <div className="text-red-500 text-xl font-bold">{overdue}</div>
                <div className="text-gray-500 text-[10px] uppercase font-semibold mt-1">Overdue</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 text-center border border-gray-200/50">
                <div className="text-yellow-500 text-xl font-bold">{pending}</div>
                <div className="text-gray-500 text-[10px] uppercase font-semibold mt-1">Pending</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 text-center border border-gray-200/50">
                <div className="text-green-500 text-xl font-bold">{completed}</div>
                <div className="text-gray-500 text-[10px] uppercase font-semibold mt-1">Completed</div>
            </div>
        </div>
      </div>
      
      {upcomingTasks.length > 0 && (
          <div className="comp-card p-4">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-orange-500" />
                  Due in next 7 days
              </h3>
              <div className="space-y-3">
                  {upcomingTasks.map(task => {
                      const catInfo = COMPLIANCE_CATEGORIES[task.category];
                      return (
                      <div key={task.id} className="flex justify-between items-center border-l-2 border-orange-500 pl-3">
                          <div>
                              <div className="text-sm text-gray-800 font-medium">{task.name}</div>
                              <div className="text-xs text-gray-600 mt-0.5">{task.formNumber || catInfo?.name}</div>
                          </div>
                          <div className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                              {new Date(task.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </div>
                      </div>
                  )})}
              </div>
          </div>
      )}
    </div>
  );
}
