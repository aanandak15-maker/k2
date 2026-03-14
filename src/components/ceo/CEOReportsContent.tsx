import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FileText, Download, Filter, Loader2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { exportFullSystemData } from '../../utils/exportUtils';

interface ReportTask {
  id: string;
  name: string;
  status: 'generating' | 'ready' | 'failed';
  progress: number;
  format: string;
}

export default function CEOReportsContent() {
  const { toast } = useToast();
  const { state } = useAdminStore();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [downloadQueue, setDownloadQueue] = useState<ReportTask[]>([]);

  const reportTemplates = [
    { id: 'rpt-01', name: 'Comprehensive Financial Audit', category: 'Finance', desc: 'Full ledger, P&L, balance sheet, and cash flow analysis.', format: 'PDF, Excel', freq: 'Monthly' },
    { id: 'rpt-02', name: 'Active Member Roster & KYC Status', category: 'Operations', desc: 'List of all farmers, landholding details, and KYC validation state.', format: 'Excel, CSV', freq: 'On-Demand' },
    { id: 'rpt-03', name: 'Input Inventory & Sales Register', category: 'Sales', desc: 'Stock levels, fast-moving items, and sales revenue breakdown.', format: 'Excel', freq: 'Weekly' },
    { id: 'rpt-04', name: 'Crop Procurement & Quality Report', category: 'Operations', desc: 'Volumes procured by crop, quality grade distributions, and payouts.', format: 'PDF, Excel', freq: 'Seasonal' },
    { id: 'rpt-05', name: 'Statutory Compliance Dashboard', category: 'Compliance', desc: 'ROC filings, tax compliance status, and audit trails.', format: 'PDF', freq: 'Quarterly' },
    { id: 'rpt-06', name: 'Farmer Demographics & Inclusion', category: 'Analytics', desc: 'Gender ratio, age distribution, and marginal vs medium landholdings.', format: 'PDF', freq: 'Annual' },
    { id: 'rpt-07', name: 'Advisory Engine Engagement', category: 'Advisory', desc: 'Open rates, action taken on advisories, and crop health improvements.', format: 'PDF', freq: 'Monthly' }
  ];

  const categories = ['All Categories', ...Array.from(new Set(reportTemplates.map(r => r.category)))];

  const filteredTemplates = selectedCategory === 'All Categories'
    ? reportTemplates
    : reportTemplates.filter(r => r.category === selectedCategory);

  // Simulate Report Generation
  useEffect(() => {
    const intervals = downloadQueue.map(task => {
      if (task.status === 'generating') {
        return setInterval(() => {
          setDownloadQueue(currentQueue =>
            currentQueue.map(t => {
              if (t.id === task.id) {
                const newProgress = t.progress + Math.floor(Math.random() * 20) + 10;
                if (newProgress >= 100) {
                  toast({ message: `${t.name} is ready for download!`, variant: 'success' });
                  return { ...t, progress: 100, status: 'ready' };
                }
                return { ...t, progress: newProgress };
              }
              return t;
            })
          );
        }, 800);
      }
      return null;
    });

    return () => intervals.forEach(i => i && clearInterval(i));
  }, [downloadQueue]);

  const handleGenerate = (template: typeof reportTemplates[0]) => {
    const isAlreadyInQueue = downloadQueue.some(t => t.id === template.id && t.status === 'generating');
    if (isAlreadyInQueue) {
      toast({ message: `${template.name} is already generating.`, variant: 'warning' });
      return;
    }

    const newTask: ReportTask = {
      id: template.id,
      name: template.name,
      status: 'generating',
      progress: 0,
      format: template.format.split(',')[0] // pick first format
    };

    setDownloadQueue(prev => [newTask, ...prev]);
    toast({ message: `Started generating: ${template.name}`, variant: 'info' });
  };

  const handleDownloadQueueItem = (task: ReportTask) => {
    toast({ message: `Downloading ${task.name}...`, variant: 'success' });
    // Remove from queue after download
    setTimeout(() => {
      setDownloadQueue(prev => prev.filter(t => t.id !== task.id));
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Report Catalog</h2>
          <p className="text-sm text-slate-500">Generate, schedule, and download standardized platform reports.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:ring-2 focus:ring-[var(--brand)] max-w-[200px]"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={() => {
              toast({ message: 'Compiling master archive...', variant: 'info' });
              setTimeout(() => exportFullSystemData(state), 1000);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors shadow-sm whitespace-nowrap"
          >
            <Download size={16} /> Dump All Data
          </button>
        </div>
      </div>

      {/* Download Queue View */}
      {downloadQueue.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Clock size={16} className="text-indigo-500" />
            Active Generation Queue ({downloadQueue.length})
          </h3>
          <div className="space-y-3">
            {downloadQueue.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex items-center gap-3">
                  {task.status === 'generating' ? (
                    <Loader2 size={18} className="text-indigo-500 animate-spin" />
                  ) : task.status === 'ready' ? (
                    <CheckCircle2 size={18} className="text-[var(--brand)]" />
                  ) : (
                    <AlertCircle size={18} className="text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-slate-800">{task.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${task.status === 'ready' ? 'bg-[var(--brand)]' : 'bg-indigo-500'}`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-slate-500">{task.progress}%</span>
                    </div>
                  </div>
                </div>
                <button
                  disabled={task.status !== 'ready'}
                  onClick={() => handleDownloadQueueItem(task)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${task.status === 'ready'
                      ? 'bg-[var(--brand-pale)] text-[var(--brand)] hover:bg-[var(--brand-muted)] cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-70'
                    }`}
                >
                  <Download size={14} /> Download {task.format}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const isGenerating = downloadQueue.some(t => t.id === template.id && t.status === 'generating');

          return (
            <div key={template.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col h-full group">
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 bg-indigo-50text-indigo-600 rounded-lg max-w-min">
                    <FileText className="h-5 w-5 text-indigo-600" />
                  </div>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                    {template.category}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-700 transition-colors">{template.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">{template.desc}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
                  <span className="bg-slate-50 border border-slate-100 text-slate-600 px-2 py-1 rounded-md">Format: {template.format}</span>
                  <span className="bg-slate-50 border border-slate-100 text-slate-600 px-2 py-1 rounded-md">Freq: {template.freq}</span>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50/50 mt-auto rounded-b-xl flex gap-2">
                <button
                  disabled={isGenerating}
                  onClick={() => handleGenerate(template)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${isGenerating
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 shadow-sm'
                    }`}
                >
                  {isGenerating ? (
                    <><Loader2 size={16} className="animate-spin" /> Compiling...</>
                  ) : (
                    <>Generate Report</>
                  )}
                </button>
                {/* Placeholder for scheduling feature */}
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200" title="Schedule Automated Delivery">
                  <Clock size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
