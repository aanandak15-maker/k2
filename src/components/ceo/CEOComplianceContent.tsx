import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CheckCircle, AlertTriangle, Clock, FileText } from 'lucide-react';

export default function CEOComplianceContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Compliance & Governance</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Calendar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-medium text-slate-500">Requirement</th>
                    <th className="px-6 py-3 font-medium text-slate-500">Due Date</th>
                    <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                    <th className="px-6 py-3 font-medium text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">AGM 2024</td>
                    <td className="px-6 py-4 text-slate-600">30 Sep 2024</td>
                    <td className="px-6 py-4"><Badge variant="success">Completed</Badge></td>
                    <td className="px-6 py-4"><button className="text-emerald-600 hover:text-emerald-700 font-medium text-xs">View Minutes</button></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">GST Return (GSTR-3B)</td>
                    <td className="px-6 py-4 text-slate-600">20 Feb 2025</td>
                    <td className="px-6 py-4"><Badge variant="warning">Due in 8 days</Badge></td>
                    <td className="px-6 py-4"><button className="text-emerald-600 hover:text-emerald-700 font-medium text-xs">File Now</button></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">ROC Annual Filing (MGT-7)</td>
                    <td className="px-6 py-4 text-slate-600">30 Nov 2024</td>
                    <td className="px-6 py-4"><Badge variant="success">Filed</Badge></td>
                    <td className="px-6 py-4"><button className="text-emerald-600 hover:text-emerald-700 font-medium text-xs">Download Receipt</button></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">Statutory Audit</td>
                    <td className="px-6 py-4 text-slate-600">31 Mar 2025</td>
                    <td className="px-6 py-4"><Badge variant="warning">Pending</Badge></td>
                    <td className="px-6 py-4"><button className="text-emerald-600 hover:text-emerald-700 font-medium text-xs">Appoint Auditor</button></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">Director KYC</td>
                    <td className="px-6 py-4 text-slate-600">30 Apr 2025</td>
                    <td className="px-6 py-4"><Badge variant="success">Up to date</Badge></td>
                    <td className="px-6 py-4"><button className="text-emerald-600 hover:text-emerald-700 font-medium text-xs">Check Status</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheme Tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-slate-900 text-sm">PM KISAN FPO Scheme</div>
                  <div className="text-xs text-slate-500">Equity Grant</div>
                </div>
                <Badge variant="success">Sanctioned</Badge>
              </div>
              <div className="text-sm text-slate-600 mb-2">Amount: ₹15,00,000</div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span>Application Approved</span>
                <span className="text-slate-300">•</span>
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span>Agreement Signed</span>
                <span className="text-slate-300">•</span>
                <Clock className="h-3.5 w-3.5 text-amber-500" />
                <span>Disbursement Pending</span>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-slate-900 text-sm">Agriculture Infrastructure Fund (AIF)</div>
                  <div className="text-xs text-slate-500">Interest Subvention Loan</div>
                </div>
                <Badge variant="warning">Under Review</Badge>
              </div>
              <div className="text-sm text-slate-600 mb-2">Amount: ₹25,00,000</div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span>DPR Submitted</span>
                <span className="text-slate-300">•</span>
                <Clock className="h-3.5 w-3.5 text-amber-500" />
                <span>Bank Appraisal</span>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-slate-900 text-sm">SMAM (Mechanization)</div>
                  <div className="text-xs text-slate-500">Subsidy on Machinery</div>
                </div>
                <Badge variant="outline">Draft</Badge>
              </div>
              <div className="text-sm text-slate-600 mb-2">Subsidy: 80% on CHC</div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FileText className="h-3.5 w-3.5 text-slate-400" />
                <span>Application in Draft</span>
              </div>
              <button className="mt-2 text-emerald-600 hover:text-emerald-700 font-medium text-xs">Resume Application</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
