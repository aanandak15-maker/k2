import React from 'react';
import { StatCard } from '../ui/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ShoppingCart, Truck, Package, CheckCircle } from 'lucide-react';

export default function CEOOperationsContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Operations Overview</h2>
      </div>

      {/* Operations Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Demand Collected"
          value="₹24.8L"
          trend="↑ 12%"
          trendDirection="up"
          pulseColor="green"
          icon={ShoppingCart}
        />
        <StatCard
          title="POs Raised"
          value="₹22.1L"
          trend="89% of demand"
          trendDirection="neutral"
          pulseColor="green"
          icon={Truck}
        />
        <StatCard
          title="Received at Warehouse"
          value="₹18.5L"
          trend="Stock In"
          trendDirection="neutral"
          pulseColor="yellow"
          icon={Package}
        />
        <StatCard
          title="Distributed to Farmers"
          value="₹16.2L"
          trend="87% fulfillment"
          trendDirection="up"
          pulseColor="green"
          icon={CheckCircle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Procurement Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-medium text-slate-500">Product</th>
                    <th className="px-6 py-3 font-medium text-slate-500">PO Value</th>
                    <th className="px-6 py-3 font-medium text-slate-500">Distributed</th>
                    <th className="px-6 py-3 font-medium text-slate-500">Remaining</th>
                    <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">DAP Fertilizer (Iffco)</td>
                    <td className="px-6 py-4 text-slate-600">₹6,75,000</td>
                    <td className="px-6 py-4 text-slate-600">480 bags</td>
                    <td className="px-6 py-4 text-red-600 font-medium">18 bags ⚠</td>
                    <td className="px-6 py-4"><Badge variant="success">Active</Badge></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">Propiconazole (UPL)</td>
                    <td className="px-6 py-4 text-slate-600">₹64,000</td>
                    <td className="px-6 py-4 text-slate-600">145 L</td>
                    <td className="px-6 py-4 text-slate-600">55 L</td>
                    <td className="px-6 py-4"><Badge variant="success">Active</Badge></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">Wheat Seed HD-2967</td>
                    <td className="px-6 py-4 text-slate-600">₹1,30,000</td>
                    <td className="px-6 py-4 text-slate-600">0 kg</td>
                    <td className="px-6 py-4 text-slate-600">2000 kg</td>
                    <td className="px-6 py-4"><Badge variant="warning">In Transit</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output / Sales Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-medium text-slate-500">Crop</th>
                    <th className="px-6 py-3 font-medium text-slate-500">Expected</th>
                    <th className="px-6 py-3 font-medium text-slate-500">Committed</th>
                    <th className="px-6 py-3 font-medium text-slate-500">Locked Price</th>
                    <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">Wheat HD-2967</td>
                    <td className="px-6 py-4 text-slate-600">4,200 qtl</td>
                    <td className="px-6 py-4 text-slate-600">3,000 qtl</td>
                    <td className="px-6 py-4 text-emerald-600 font-medium">₹2,350/qtl</td>
                    <td className="px-6 py-4"><Badge variant="success">On Track</Badge></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">Mustard Pusa Bold</td>
                    <td className="px-6 py-4 text-slate-600">1,800 qtl</td>
                    <td className="px-6 py-4 text-slate-600">1,200 qtl</td>
                    <td className="px-6 py-4 text-emerald-600 font-medium">₹5,100/qtl</td>
                    <td className="px-6 py-4"><Badge variant="success">On Track</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-6 pt-2">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-emerald-900">Buyer Contract: Agri Corp Ltd — ₹2,400/qtl for 2,000 qtl Wheat</div>
                    <div className="text-xs text-emerald-700 mt-1">Delivery: Mar 25–Apr 5 · Advance received: ₹2,00,000</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
