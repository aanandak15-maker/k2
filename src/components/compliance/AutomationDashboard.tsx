import React, { useState, useEffect } from 'react';
import { activityStream, ERPActivity } from '../../lib/activityStream';
import { Activity, CheckCircle2, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPLIANCE_CATALOG } from '../../data/complianceCatalog';
import { motion, AnimatePresence } from 'framer-motion';

export function AutomationDashboard() {
  const [activities, setActivities] = useState<ERPActivity[]>([]);
  
  useEffect(() => {
    // Load initial history
    setActivities(activityStream.getHistory());
    
    // Subscribe to new events
    const unsubscribe = activityStream.subscribe((activity) => {
      setActivities(prev => [activity, ...prev].slice(0, 50)); // Keep last 50
    });
    
    return unsubscribe;
  }, []);

  const triggerMockEvent = () => {
    const types: any[] = ['agm_conducted', 'farmer_onboarded', 'procurement_completed', 'director_changed'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    activityStream.emit({
      type: randomType,
      fpoId: 'FPO-001',
      actorId: 'CEO-1',
      actorRole: 'System',
      payload: { value: Math.floor(Math.random() * 1000) }
    });
  };

  const getEventIcon = (type: string) => {
    if (type.includes('farmer')) return '👨‍🌾';
    if (type.includes('procurement') || type.includes('invoice')) return '🌾';
    if (type.includes('payment')) return '💰';
    if (type.includes('board') || type.includes('agm') || type.includes('director')) return '🏛️';
    return '📋';
  };

  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="comp-card p-5 bg-gradient-to-br from-brand/5 to-white border-brand/20">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-brand font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 fill-brand/20" />
                Compliance Engine Status
              </h3>
              <p className="text-2xl font-black text-gray-900 mt-2">Active</p>
              <p className="text-sm text-gray-500 mt-1">Listening to ERP activity stream</p>
            </div>
            <button 
              onClick={triggerMockEvent}
              className="text-xs bg-brand/10 text-brand hover:bg-brand hover:text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
            >
              Simulate ERP Event
            </button>
          </div>
        </div>

        <div className="comp-card p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-700 font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                Automation Coverage
              </h3>
              <p className="text-2xl font-black text-gray-900 mt-2">32 <span className="text-base font-medium text-gray-500">/ 37</span></p>
              <p className="text-sm text-gray-500 mt-1">Compliances mapped to auto-triggers</p>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-green-500 border-t-gray-200 flex items-center justify-center transform -rotate-45">
              <span className="text-xs font-bold text-gray-700 transform rotate-45">86%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Pipeline View */}
      <div className="comp-card p-0 overflow-hidden flex flex-col h-[500px]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
            Live Event Pipeline
          </h3>
          <span className="text-xs font-medium text-gray-500 bg-gray-200/50 px-2.5 py-1 rounded-full">
            Real-time feed
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50/30">
          <div className="space-y-4">
            <AnimatePresence>
              {activities.length === 0 && (
                <div className="text-center py-10 text-gray-400 text-sm">
                  Waiting for ERP activity...
                </div>
              )}
              {activities.map((activity) => (
                <motion.div 
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={activity.id} 
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl shadow-inner">
                      {getEventIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-semibold text-gray-800 capitalize">
                          {activity.type.replace(/_/g, ' ')}
                        </p>
                        <span className="text-xs text-gray-400 font-medium">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200/50">
                          ID: {activity.id.split('-')[1]}
                        </span>
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded border border-green-100">
                          <CheckCircle2 className="w-3 h-3" /> Processed by Engine
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
