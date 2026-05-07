import React from 'react';
import { ComplianceTask, ComplianceTaskStatus, ComplianceSeverity } from '../../data/mock/compliance';
import { COMPLIANCE_CATEGORIES } from '../../data/categories';
import { X, Calendar, FileText, AlertTriangle, CheckCircle, Clock, Link as LinkIcon, User, ShieldCheck, Info } from 'lucide-react';

interface ComplianceTaskDetailProps {
  task: ComplianceTask | null;
  onClose: () => void;
}

export function ComplianceTaskDetail({ task, onClose }: ComplianceTaskDetailProps) {
  if (!task) return null;

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
      case 'closed_on_time': return { icon: <CheckCircle className="w-5 h-5 text-green-500" />, text: 'Closed (On Time)', color: 'text-green-600' };
      case 'closed_late': return { icon: <CheckCircle className="w-5 h-5 text-teal-500" />, text: 'Closed (Late)', color: 'text-teal-600' };
      case 'verified': return { icon: <ShieldCheck className="w-5 h-5 text-blue-500" />, text: 'Verified', color: 'text-blue-600' };
      case 'submitted': return { icon: <Info className="w-5 h-5 text-purple-500" />, text: 'Submitted', color: 'text-purple-600' };
      case 'in_progress': return { icon: <Clock className="w-5 h-5 text-yellow-500" />, text: 'In Progress', color: 'text-yellow-600' };
      case 'overdue': return { icon: <AlertTriangle className="w-5 h-5 text-red-500" />, text: 'Overdue', color: 'text-red-600' };
      case 'pending': 
      default:
          return { icon: <Clock className="w-5 h-5 text-gray-400" />, text: 'Pending', color: 'text-gray-500' };
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

  const catInfo = COMPLIANCE_CATEGORIES[task.category];
  const severityClass = getSeverityColor(task.severity);
  const statusDisplay = getStatusDisplay(task.status);
  const isStatusObj = statusDisplay && typeof statusDisplay === 'object' && 'icon' in statusDisplay;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full sm:w-[500px] max-h-[90vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl border border-gray-200 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:zoom-in-95"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex justify-between items-start bg-white/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${severityClass}`}>
                {task.severity} RISK
              </span>
              <span 
                className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded"
                style={{ backgroundColor: catInfo?.cssColorLight, color: catInfo?.cssColor }}
              >
                {catInfo?.name || task.category}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {task.name}
            </h2>
            {task.formNumber && (
              <div className="text-sm text-gray-500 mt-1">Form: {task.formNumber}</div>
            )}
            {task.authority && (
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{task.authority}</div>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          
          {/* Status & Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/50 rounded-lg p-3 border border-gray-200">
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Due Date</div>
              <div className="text-gray-900 font-semibold">{formatDate(task.dueDate)}</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 border border-gray-200">
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Status</div>
              <div className="text-gray-900 font-semibold flex items-center gap-2">
                {isStatusObj ? statusDisplay.icon : null}
                <span className={isStatusObj ? statusDisplay.color : ''}>{isStatusObj ? statusDisplay.text : task.status}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Description
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
              {task.description}
            </p>
            {task.legalReference && (
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <LinkIcon className="w-3 h-3" /> Ref: {task.legalReference}
              </p>
            )}
          </div>

          {/* Risks & Penalties */}
          {task.penaltyDescription && (
            <div>
              <h3 className="text-sm font-semibold text-red-500 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Non-Compliance Risk
              </h3>
              <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                <div className="text-red-700 font-medium text-sm mb-1">{task.penaltyAmount}</div>
                <div className="text-red-600 text-xs">{task.penaltyDescription}</div>
              </div>
            </div>
          )}

          {/* Workflow & Assignment */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" /> Assignment & Workflow
            </h3>
            <div className="bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
              {task.workflowSteps ? (
                <div className="space-y-1">
                  {task.workflowSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50/50">
                      <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-xs text-gray-500 border border-gray-200">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-800 font-medium">{step.stepName}</div>
                        <div className="text-xs text-gray-500">{step.assignedRole}</div>
                      </div>
                      <div>
                        {step.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {step.status === 'in_progress' && <Clock className="w-4 h-4 text-brand" />}
                        {step.status === 'pending' && <Clock className="w-4 h-4 text-gray-300" />}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 text-sm text-gray-600">
                  Assigned to: <span className="text-gray-900 font-medium">{task.assignedRole || 'Unassigned'}</span>
                  {task.approver && <span> (Approver: {task.approver})</span>}
                </div>
              )}
            </div>
          </div>

          {/* Required Docs */}
          {task.requiredDocuments && task.requiredDocuments.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Required Documents</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
                {task.requiredDocuments.map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>
          )}
          
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 grid grid-cols-2 gap-3">
          {!task.status.includes('closed') ? (
            <>
              <button 
                onClick={() => {}} 
                className="py-2.5 px-4 rounded-lg bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors text-center border border-gray-200 shadow-sm"
              >
                Upload Document
              </button>
              <button 
                onClick={() => {}} 
                className="py-2.5 px-4 rounded-lg bg-brand hover:bg-brand-light text-white text-sm font-medium transition-colors text-center shadow-md shadow-brand/20"
              >
                Mark Complete
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => {}} 
                className="py-2.5 px-4 rounded-lg bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors text-center border border-gray-200 shadow-sm col-span-2"
              >
                View Filed Documents
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
