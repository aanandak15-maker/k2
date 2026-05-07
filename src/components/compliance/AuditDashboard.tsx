import React, { useState } from 'react';
import { mockAuditReadiness } from '../../data/mock/auditReadiness';
import { ShieldCheck, ChevronDown, ChevronUp, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export function AuditDashboard() {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Financial Records': true,
    'Governance Documents': false
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Hero Score Card */}
      <div className="comp-card p-5 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-pale/50 to-transparent"></div>
        <div className="relative z-10">
            <h2 className="text-gray-500 font-medium uppercase tracking-widest text-xs mb-3">
              Statutory Audit Readiness
            </h2>
            <div className={`text-6xl font-black ${getScoreColor(mockAuditReadiness.overallScore)} mb-2`}>
              {mockAuditReadiness.overallScore}%
            </div>
            
            {/* Progress Bar */}
            <div className="w-full max-w-xs mx-auto h-2 bg-white rounded-full overflow-hidden mb-4">
              <div 
                className={`h-full ${getProgressBarColor(mockAuditReadiness.overallScore)}`} 
                style={{ width: `${mockAuditReadiness.overallScore}%` }}
              ></div>
            </div>

            <button className="px-6 py-2 bg-brand hover:bg-brand-light text-white text-sm font-medium rounded-full transition-colors border border-brand">
              Generate Auditor Pack
            </button>
        </div>
      </div>

      {/* Categories Checklist */}
      <div className="space-y-3">
        {Object.entries(mockAuditReadiness.checklists).map(([category, items]) => {
          const total = items.length;
          const available = items.filter(i => i.isAvailable).length;
          const pct = Math.round((available / total) * 100);
          const isExpanded = !!expandedCategories[category];

          let Icon = CheckCircle;
          let iconColor = 'text-green-500';
          if (pct < 100 && pct >= 70) {
              Icon = AlertTriangle;
              iconColor = 'text-yellow-500';
          } else if (pct < 70) {
              Icon = XCircle;
              iconColor = 'text-red-500';
          }

          return (
            <div key={category} className="comp-card overflow-hidden transition-all duration-200">
              {/* Category Header */}
              <button 
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-4 bg-white/30 hover:bg-gray-50/60 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                  <div>
                    <h3 className="text-gray-800 font-semibold">{category}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">{available} of {total} items ready</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold ${getScoreColor(pct)}`}>{pct}%</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
                </div>
              </button>

              {/* Items List */}
              {isExpanded && (
                <div className="border-t border-gray-200/50 bg-white/50">
                  {items.map((item, idx) => (
                    <div key={item.id} className={`p-4 flex gap-3 items-start ${idx !== items.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      <div className="mt-0.5">
                        {item.isAvailable ? (
                           <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                               <CheckCircle className="w-3 h-3 text-green-500" />
                           </div>
                        ) : item.isRequired ? (
                           <div className="w-4 h-4 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                               <XCircle className="w-3 h-3 text-red-500" />
                           </div>
                        ) : (
                           <div className="w-4 h-4 rounded-full bg-gray-200/20 border border-gray-300 flex items-center justify-center">
                               <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                           </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                            {!item.isRequired && <span className="text-[10px] uppercase text-gray-600 border border-gray-200 px-1.5 py-0.5 rounded">Optional</span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                        
                        {!item.isAvailable && item.gapDescription && (
                            <div className="mt-2 text-xs bg-red-50 text-red-700 p-2 rounded border border-red-200 flex items-start gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                <span>{item.gapDescription}</span>
                            </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
