import React, { useState } from 'react';
import { reportFactory, ReportType, GeneratedReport } from '../../lib/reports/reportFactory';
import { DEMO_FPO_PROFILE } from '../../data/mock/fpoProfile';
import { FileText, Download, Loader2, CheckCircle2, Search, Filter } from 'lucide-react';

export function ReportCenter() {
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [isGenerating, setIsGenerating] = useState<ReportType | null>(null);

  const handleGenerate = async (type: ReportType) => {
    setIsGenerating(type);
    try {
      const report = await reportFactory.generate({
        type,
        fpoId: DEMO_FPO_PROFILE.id
      }, DEMO_FPO_PROFILE);
      
      setReports(prev => [report, ...prev]);
    } catch (error) {
      console.error("Failed to generate report:", error);
      alert("Failed to generate report.");
    } finally {
      setIsGenerating(null);
    }
  };

  const reportOptions: { type: ReportType, name: string, desc: string, icon: React.FC<any> }[] = [
    { type: 'NABARD_MIS', name: 'NABARD MIS Quarterly', desc: 'Auto-aggregated from farmer and finance data', icon: FileText },
    { type: 'MCA_AOC4', name: 'MCA AOC-4 Data', desc: 'Pre-filled financial statement data', icon: FileText },
    { type: 'MCA_MGT7', name: 'MCA MGT-7 Data', desc: 'Pre-filled annual return data', icon: FileText },
    { type: 'TRACEABILITY', name: 'Traceability Record', desc: 'Farm-to-buyer batch traceability', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportOptions.map((opt) => (
          <div key={opt.type} className="comp-card p-5 hover:border-brand/30 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-brand/5 text-brand flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <opt.icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-800">{opt.name}</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4 h-8">{opt.desc}</p>
            <button
              onClick={() => handleGenerate(opt.type)}
              disabled={isGenerating !== null}
              className={`w-full py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                isGenerating === opt.type 
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-brand text-white hover:bg-brand-dark shadow-sm'
              }`}
            >
              {isGenerating === opt.type ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
              ) : (
                'Generate Now'
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="comp-card p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-semibold text-gray-800">Generated Reports Archive</h3>
          <div className="flex gap-2 text-gray-400">
            <button className="p-1.5 hover:bg-gray-200 rounded-md transition-colors"><Search className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-gray-200 rounded-md transition-colors"><Filter className="w-4 h-4" /></button>
          </div>
        </div>
        
        {reports.length === 0 ? (
          <div className="p-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3 border border-gray-100">
              <FileText className="w-6 h-6 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No reports generated yet</p>
            <p className="text-xs text-gray-400 mt-1 max-w-xs">Use the buttons above to generate automated reports from live ERP data.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {reports.map(report => (
              <div key={report.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{report.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">ID: {report.id}</span>
                      <span className="text-xs text-gray-400">{new Date(report.generatedAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(report.data, null, 2)], {type: "application/json"});
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${report.title}.json`;
                    a.click();
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all bg-white shadow-sm"
                >
                  <Download className="w-4 h-4 text-gray-500" />
                  Download JSON
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
