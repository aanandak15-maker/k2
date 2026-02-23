import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FileText, Download, Filter } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { exportFullSystemData } from '../../utils/exportUtils';

export default function CEOReportsContent() {
  const { toast } = useToast();
  const { state } = useAdminStore();
  const [selectedType, setSelectedType] = useState('All');

  const reports = [
    { id: 1, name: 'Monthly Financial Statement', date: 'Jan 2025', type: 'Finance', format: 'PDF, Excel' },
    { id: 2, name: 'Farmer Onboarding Summary', date: 'Q3 2024-25', type: 'Operations', format: 'PDF' },
    { id: 3, name: 'Input Sales & Inventory', date: 'Rabi 2024', type: 'Sales', format: 'Excel' },
    { id: 4, name: 'Loan Disbursement & Recovery', date: 'Jan 2025', type: 'Finance', format: 'PDF, Excel' },
    { id: 5, name: 'Procurement Register', date: 'Wheat 2024', type: 'Operations', format: 'Excel' },
    { id: 6, name: 'Compliance Audit Report', date: 'FY 2023-24', type: 'Compliance', format: 'PDF' },
  ];

  const reportTypes = ['All', ...Array.from(new Set(reports.map(report => report.type)))];

  const filteredReports = selectedType === 'All'
    ? reports
    : reports.filter(report => report.type === selectedType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Reports & Statements</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 pointer-events-none" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-9 rounded-md border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 appearance-none cursor-pointer"
            >
              {reportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              toast({ message: 'Generating Full FPO Report...', variant: 'success' });
              exportFullSystemData(state);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Generate New Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-emerald-50 transition-colors">
                  <FileText className="h-6 w-6 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                </div>
                <Badge variant="outline">{report.type}</Badge>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">{report.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{report.date}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{report.format}</span>
                <button
                  onClick={() => toast({ message: `Downloading ${report.name}...`, variant: 'success' })}
                  className="text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
