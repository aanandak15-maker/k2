import React, { useState, useMemo } from 'react';
import { ComplianceTask } from '../../data/mock/compliance';
import { ComplianceCategoryId, COMPLIANCE_CATEGORIES } from '../../data/categories';
import { ComplianceTaskCard } from './ComplianceTaskCard';
import { ComplianceCategoryFilter } from './ComplianceCategoryFilter';
import { Filter, Search } from 'lucide-react';

interface ComplianceCalendarProps {
  tasks: ComplianceTask[];
  onTaskClick: (task: ComplianceTask) => void;
}

export function ComplianceCalendar({ tasks, onTaskClick }: ComplianceCalendarProps) {
  const [activeCategory, setActiveCategory] = useState<ComplianceCategoryId | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Generate category stats for filter
  const categoryStats = useMemo(() => {
    const stats = new Map<ComplianceCategoryId | 'ALL', number>();
    stats.set('ALL', tasks.length);
    
    tasks.forEach(t => {
      stats.set(t.category, (stats.get(t.category) || 0) + 1);
    });

    return Array.from(stats.entries()).map(([id, count]) => ({
      id: id as ComplianceCategoryId | 'ALL',
      label: id === 'ALL' ? 'All Tasks' : (COMPLIANCE_CATEGORIES[id as ComplianceCategoryId]?.name || id),
      count
    })).sort((a, b) => {
        if (a.id === 'ALL') return -1;
        if (b.id === 'ALL') return 1;
        return b.count - a.count; // Sort by count desc
    });
  }, [tasks]);

  // Filter & Sort Tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    
    if (activeCategory !== 'ALL') {
      filtered = filtered.filter(t => t.category === activeCategory);
    }
    
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(t => 
            t.name.toLowerCase().includes(q) || 
            (t.formNumber && t.formNumber.toLowerCase().includes(q))
        );
    }

    // Sort by: overdue first, then by date, then completed last
    return filtered.sort((a, b) => {
      if (a.status === 'overdue' && b.status !== 'overdue') return -1;
      if (a.status !== 'overdue' && b.status === 'overdue') return 1;
      
      const aClosed = a.status.includes('closed');
      const bClosed = b.status.includes('closed');
      
      if (aClosed && !bClosed) return 1;
      if (!aClosed && bClosed) return -1;
      
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }, [tasks, activeCategory, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by form or task name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-gray-200 text-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 placeholder-gray-400"
        />
      </div>

      <ComplianceCategoryFilter 
        categories={categoryStats} 
        activeCategory={activeCategory} 
        onSelect={setActiveCategory} 
      />

      {/* Task List */}
      <div className="pb-20">
        {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
                <ComplianceTaskCard 
                  key={task.id} 
                  task={task} 
                  onClick={onTaskClick} 
                />
            ))
        ) : (
            <div className="text-center py-12 bg-white/50 rounded-lg border border-gray-200 border-dashed">
                <Filter className="w-8 h-8 text-gray-400 mx-auto mb-3 opacity-50" />
                <h3 className="text-gray-500 font-medium">No tasks found</h3>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
            </div>
        )}
      </div>
    </div>
  );
}
