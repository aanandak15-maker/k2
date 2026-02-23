import React from 'react';
import { StatCard } from '../ui/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ShoppingCart, Truck, Package, CheckCircle } from 'lucide-react';
import { useAdminStore } from '../../store/AdminStore';

export default function CEOOperationsContent() {
  const { state } = useAdminStore();

  const totalOrdersValue = state.orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const fulfilledOrders = state.orders.filter(o => o.status === 'Fulfilled').length;
  const inStockItems = state.inventory.filter(i => i.status === 'In Stock').length;
  const inventoryValue = state.inventory.reduce((acc, i) => acc + (i.currentStock * i.averageCost), 0);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Operations Overview</h2>
      </div>

      {/* Operations Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Demand Collected"
          value={`₹${((totalOrdersValue * 1.2) / 100000).toFixed(1)}L`} // Mock multiplier for demand
          trend="↑ 12%"
          trendDirection="up"
          pulseColor="green"
          icon={ShoppingCart}
        />
        <StatCard
          title="POs Raised"
          value={`₹${(totalOrdersValue / 100000).toFixed(2)}L`}
          trend={`${fulfilledOrders} fulfilled`}
          trendDirection="neutral"
          pulseColor="green"
          icon={Truck}
        />
        <StatCard
          title="Received at Warehouse"
          value={`₹${(inventoryValue / 100000).toFixed(2)}L`}
          trend={`${inStockItems} items in stock`}
          trendDirection="neutral"
          pulseColor="yellow"
          icon={Package}
        />
        <StatCard
          title="Gross Volume Distributed"
          value={`₹${(totalOrdersValue * 0.8 / 100000).toFixed(2)}L`}
          trend={`${state.orders.length} total orders`}
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
                  {state.inventory.slice(0, 3).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                      <td className="px-6 py-4 text-slate-600">₹{(item.currentStock * item.averageCost).toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-600">{Math.floor(item.currentStock * 0.8)} {item.unit}</td>
                      <td className={`px-6 py-4 font-medium ${item.currentStock <= item.minimumThreshold ? 'text-red-600' : 'text-slate-600'}`}>
                        {item.currentStock} {item.unit} {item.currentStock <= item.minimumThreshold && '⚠'}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={item.status === 'In Stock' ? 'success' : item.status === 'Low Stock' ? 'warning' : 'danger'}>
                          {item.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
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
