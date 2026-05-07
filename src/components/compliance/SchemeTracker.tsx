import React from 'react';
import { mockSchemes, Scheme } from '../../data/mock/schemes';
import { ShieldCheck, ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export function SchemeTracker() {
  const getStatusColor = (status: Scheme['status']) => {
    switch (status) {
      case 'Applied': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Sanctioned': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'Disbursed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Utilization Pending': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Closed': return 'text-gray-500 bg-gray-200/10 border-gray-300/20';
      default: return 'text-gray-500 bg-gray-200/10 border-gray-300/20';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-2">
         <div className="comp-card p-4 text-center">
             <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Active Schemes</div>
             <div className="text-2xl font-bold text-gray-900">{mockSchemes.filter(s => s.status !== 'Closed').length}</div>
         </div>
         <div className="comp-card p-4 text-center border-emerald-500/30">
             <div className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-wider mb-1">Total Disbursed</div>
             <div className="text-xl font-bold text-emerald-400">
                 {formatCurrency(mockSchemes.reduce((sum, s) => sum + s.disbursedAmount, 0))}
             </div>
         </div>
      </div>

      {/* Scheme List */}
      <div className="space-y-4">
        {mockSchemes.map(scheme => (
          <div key={scheme.id} className="comp-card overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200/50">
                          {scheme.agency}
                      </span>
                      <span className="text-[10px] text-gray-600 uppercase font-semibold">
                          {scheme.type}
                      </span>
                  </div>
                  <h3 className="text-gray-900 font-semibold">{scheme.name}</h3>
                </div>
                <div className={`px-2 py-1 rounded border text-[10px] font-bold uppercase ${getStatusColor(scheme.status)}`}>
                  {scheme.status}
                </div>
              </div>
              
              <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-lg font-bold text-gray-800">{formatCurrency(scheme.amount)}</span>
                  <span className="text-xs text-gray-600">Total Value</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-4 py-3 bg-white/30">
              <div className="flex justify-between text-[10px] font-semibold text-gray-500 mb-1.5 uppercase">
                  <span>Progress</span>
                  <span>{scheme.progressPct}%</span>
              </div>
              <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-light rounded-full transition-all duration-500"
                  style={{ width: `${scheme.progressPct}%` }}
                ></div>
              </div>
            </div>

            {/* Next Action */}
            <div className="p-4 bg-white/50 flex gap-3 items-start">
               <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
               <div className="flex-1">
                   <div className="text-xs text-gray-500 font-medium mb-0.5">Required Action</div>
                   <div className="text-sm text-gray-800">{scheme.nextAction}</div>
                   <div className="text-[10px] text-amber-500/80 font-semibold mt-1">
                       Due: {formatDate(scheme.nextActionDue)}
                   </div>
               </div>
               <button className="bg-white hover:bg-gray-100 p-2 rounded-lg text-gray-700 transition-colors">
                   <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
