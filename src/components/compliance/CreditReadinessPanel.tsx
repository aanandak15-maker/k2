import React, { useMemo } from 'react';
import { ComplianceTask } from '../../data/mock/compliance';
import { assessCreditReadiness } from '../../lib/creditReadiness';
import { CheckCircle2, XCircle, ChevronRight, Landmark, IndianRupee, TrendingUp, HandCoins } from 'lucide-react';
import { COMPLIANCE_CATALOG } from '../../data/complianceCatalog';

interface CreditReadinessPanelProps {
  tasks: ComplianceTask[];
}

export function CreditReadinessPanel({ tasks }: CreditReadinessPanelProps) {
  const readiness = useMemo(() => assessCreditReadiness(tasks), [tasks]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'loan': return Landmark;
      case 'grant': return HandCoins;
      case 'procurement': return TrendingUp;
      default: return IndianRupee;
    }
  };

  return (
    <div className="space-y-4">
      <div className="comp-card p-5 bg-gradient-to-br from-green-50 to-white border-green-100">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Landmark className="w-5 h-5 text-green-600" />
          Compliance-to-Credit Gateway
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Your compliance score directly unlocks access to institutional credit, grants, and procurement opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {readiness.eligibility.map((result) => {
          const Icon = getIcon(result.source.type);
          return (
            <div 
              key={result.source.id} 
              className={`comp-card p-5 border-l-4 transition-all ${
                result.isEligible 
                  ? 'border-l-green-500 hover:shadow-md' 
                  : 'border-l-orange-400 opacity-90'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${result.isEligible ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{result.source.name}</h3>
                    <p className="text-xs text-gray-500 font-medium">{result.source.provider} • {result.source.amountText}</p>
                  </div>
                </div>
                {result.isEligible ? (
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Eligible
                  </span>
                ) : (
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Action Required
                  </span>
                )}
              </div>

              <div className="mt-5 space-y-3">
                {/* Score Check */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Min Score: {result.source.minScoreReq}%</span>
                  {result.scoreMet ? (
                    <span className="text-green-600 flex items-center gap-1 text-xs font-medium"><CheckCircle2 className="w-4 h-4"/> Passed ({readiness.overallScore}%)</span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1 text-xs font-medium"><XCircle className="w-4 h-4"/> Failed ({readiness.overallScore}%)</span>
                  )}
                </div>

                {/* Compliance Blocks */}
                {!result.isEligible && result.missingCompliances.length > 0 && (
                  <div className="bg-orange-50/50 rounded-lg p-3 border border-orange-100 mt-2">
                    <p className="text-xs font-semibold text-orange-800 mb-2">Blocking Compliances:</p>
                    <ul className="space-y-2">
                      {result.missingCompliances.map(task => (
                        <li key={task.id} className="flex items-center justify-between text-xs">
                          <span className="text-gray-700 truncate pr-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>
                            {task.name}
                          </span>
                          <button className="text-brand hover:text-brand-dark font-medium whitespace-nowrap flex items-center">
                            Resolve <ChevronRight className="w-3 h-3 ml-0.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {!result.isEligible && result.missingCompliances.length === 0 && !result.scoreMet && (
                   <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mt-2">
                     <p className="text-xs text-gray-600">Close other pending tasks to raise your overall health score to {result.source.minScoreReq}%.</p>
                   </div>
                )}

                {result.isEligible && (
                  <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
