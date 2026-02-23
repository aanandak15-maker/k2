import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CheckCircle2, Clock, AlertCircle, Calendar as CalendarIcon, Filter, MapPin } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

// Mock Tasks Data specifically for Moderator App
const mockTasks = [
    { id: 'TSK-001', title: 'Collect ₹4,500 pending dues', farmerName: 'Ramesh Kumar', location: 'Sikandrabad', status: 'Pending', priority: 'High', type: 'Collection', dueDate: 'Today' },
    { id: 'TSK-002', title: 'Verify crop damage (Wheat)', farmerName: 'Suresh Patel', location: 'Kheda', status: 'Pending', priority: 'Medium', type: 'Inspection', dueDate: 'Today' },
    { id: 'TSK-003', title: 'Deliver 5 bags fertilizer', farmerName: 'Mohan Singh', location: 'Navi Pardi', status: 'Completed', priority: 'Low', type: 'Delivery', dueDate: 'Yesterday' },
    { id: 'TSK-004', title: 'KYC Document Collection', farmerName: 'Anita Dev', location: 'Sikandrabad', status: 'Overdue', priority: 'High', type: 'Compliance', dueDate: '2 Days Ago' },
    { id: 'TSK-005', title: 'Routine farm visit', farmerName: 'Vikram Yadav', location: 'Kheda', status: 'Pending', priority: 'Low', type: 'Visit', dueDate: 'Tomorrow' },
];

export function ModeratorTaskList() {
    const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('All');
    const { toast } = useToast();

    const filteredTasks = mockTasks.filter(t => {
        if (filter === 'All') return true;
        if (filter === 'Completed') return t.status === 'Completed';
        return t.status !== 'Completed'; // Pending and Overdue
    });

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 mt-4">
            {/* Tab Filters */}
            <div className="flex bg-slate-100 p-1 rounded-lg">
                {['All', 'Pending', 'Completed'].map((tab) => (
                    <button
                        key={tab}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === tab ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        onClick={() => setFilter(tab as any)}
                    >
                        {tab}
                        {tab === 'Pending' && <span className="ml-1.5 bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-[10px]">{mockTasks.filter(t => t.status !== 'Completed').length}</span>}
                    </button>
                ))}
            </div>

            <div className="flex justify-between items-center px-1">
                <h2 className="font-bold text-slate-800 text-sm">
                    {filter === 'All' ? 'All Assignments' : filter === 'Pending' ? 'To Do' : 'Completed'}
                </h2>
                <button onClick={() => toast({ message: 'Advanced filters coming in v2', variant: 'info' })} className="text-slate-500 hover:text-emerald-600">
                    <Filter size={16} />
                </button>
            </div>

            <div className="space-y-3">
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-10 text-slate-500">
                        <CheckCircle2 size={32} className="mx-auto text-slate-300 mb-2" />
                        <p>No tasks found in this category.</p>
                    </div>
                ) : (
                    filteredTasks.map(task => (
                        <Card key={task.id} className={`border ${task.status === 'Completed' ? 'opacity-70 bg-slate-50 border-slate-200' : task.status === 'Overdue' ? 'border-red-200 bg-red-50/30' : 'border-slate-200'} shadow-sm relative overflow-hidden`}>
                            {task.priority === 'High' && task.status !== 'Completed' && (
                                <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-500"></div>
                            )}
                            <CardContent className="p-3">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        {task.status === 'Completed' ? (
                                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                                        ) : task.status === 'Overdue' ? (
                                            <AlertCircle size={16} className="text-red-500 shrink-0" />
                                        ) : (
                                            <Clock size={16} className="text-amber-500 shrink-0" />
                                        )}
                                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                                            {task.type}
                                        </span>
                                    </div>
                                    <Badge variant={
                                        task.status === 'Completed' ? 'success' :
                                            task.status === 'Overdue' ? 'danger' : 'warning'
                                    } className="text-[10px] px-1.5 py-0 h-4">
                                        {task.status}
                                    </Badge>
                                </div>

                                <h3 className={`font-bold text-sm mb-1 ${task.status === 'Completed' ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                    {task.title}
                                </h3>

                                <div className="flex items-center gap-3 text-xs text-slate-600 mt-2">
                                    <div className="flex items-center gap-1">
                                        <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-[8px] font-bold">
                                            {task.farmerName.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        {task.farmerName}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={12} className="text-slate-400" />
                                        {task.location}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                                    <div className={`flex items-center gap-1 text-[10px] font-medium ${task.status === 'Overdue' ? 'text-red-600' : 'text-slate-500'}`}>
                                        <CalendarIcon size={12} />
                                        Due: {task.dueDate}
                                    </div>
                                    {task.status !== 'Completed' && (
                                        <button onClick={() => toast({ message: `Taking action on: ${task.title}`, variant: 'success' })} className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-md hover:bg-emerald-100">
                                            Take Action
                                        </button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
