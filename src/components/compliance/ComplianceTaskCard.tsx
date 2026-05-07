import React from 'react';
import { ComplianceTask, ComplianceTaskStatus, ComplianceSeverity } from '../../data/mock/compliance';
import { COMPLIANCE_CATEGORIES } from '../../data/categories';
import { Clock, AlertTriangle, CheckCircle, Info, ShieldCheck } from 'lucide-react';

interface ComplianceTaskCardProps {
  key?: React.Key;
  task: ComplianceTask;
  onClick: (task: ComplianceTask) => void;
}

export function ComplianceTaskCard({ task, onClick }: ComplianceTaskCardProps) {
  const getSeverityColor = (severity: ComplianceSeverity | string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-500 bg-red-50 border-red-100';
      case 'high': return 'text-orange-500 bg-orange-50 border-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'low': return 'text-green-500 bg-green-50 border-green-100';
      default: return 'text-gray-500 bg-gray-50 border-gray-100';
    }
  };

  const getStatusDisplay = (status: ComplianceTaskStatus | string) => {
    switch (status) {
      case 'closed_on_time': return { icon: <CheckCircle className="w-4 h-4 text-green-500" />, text: 'Closed (On Time)', color: 'text-green-600' };
      case 'closed_late': return { icon: <CheckCircle className="w-4 h-4 text-teal-500" />, text: 'Closed (Late)', color: 'text-teal-600' };
      case 'verified': return { icon: <ShieldCheck className="w-4 h-4 text-blue-500" />, text: 'Verified', color: 'text-blue-600' };
      case 'submitted': return { icon: <Info className="w-4 h-4 text-purple-500" />, text: 'Submitted', color: 'text-purple-600' };
      case 'in_progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'overdue': return { icon: <AlertTriangle className="w-4 h-4 text-red-500" />, text: 'Overdue', color: 'text-red-600' };
      case 'pending': 
      default:
          return { icon: <Clock className="w-4 h-4 text-gray-400" />, text: 'Pending', color: 'text-gray-500' };
    }
  };
  
  const formatDate = (dateStr: string) => {
      try {
          const d = new Date(dateStr);
          return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      } catch (e) {
          return dateStr;
      }
  }

  const severityClass = getSeverityColor(task.severity);
  const statusDisplay = getStatusDisplay(task.status);
  const isStatusObj = statusDisplay && typeof statusDisplay === 'object' && 'icon' in statusDisplay;
  const catInfo = COMPLIANCE_CATEGORIES[task.category];

  return (
    <div 
      onClick={() => onClick(task)}
      className="comp-card p-4 mb-3 cursor-pointer hover:border-brand/30 hover:shadow-sm transition-all"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span 
               className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded"
               style={{ backgroundColor: catInfo?.cssColorLight, color: catInfo?.cssColor }}
            >
              {catInfo?.name || task.category}
            </span>
            {task.formNumber && (
              <span className="text-[10px] bg-gray-50 text-gray-500 border border-gray-100 px-2 py-0.5 rounded-full">
                {task.formNumber}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 text-[15px] leading-tight mt-1">
            {task.name}
          </h3>
        </div>
        <div className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wide ${severityClass}`}>
          {task.severity} RISK
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="flex items-center gap-1.5">
            {isStatusObj ? statusDisplay.icon : statusDisplay}
            <span className={`font-medium text-xs ${isStatusObj ? statusDisplay.color : 'text-gray-500'}`}>
                {isStatusObj ? statusDisplay.text : 'In Progress'}
            </span>
            <span className="text-gray-300 mx-1">•</span>
            <span className="text-gray-500 text-xs">
                Due: {formatDate(task.dueDate)}
            </span>
        </div>
        {task.assignedRole && (
           <div className="text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded">
             {task.assignedRole}
           </div>
        )}
      </div>
    </div>
  );
}
