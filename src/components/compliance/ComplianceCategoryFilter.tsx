import React from 'react';
import { ComplianceCategoryId, COMPLIANCE_CATEGORIES } from '../../data/categories';

interface CategoryFilterProps {
  categories: { id: ComplianceCategoryId | 'ALL', label: string, count: number }[];
  activeCategory: string;
  onSelect: (category: ComplianceCategoryId | 'ALL') => void;
}

export function ComplianceCategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex overflow-x-auto scrollbar-hide py-2 -mx-4 px-4 gap-2 mb-4">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        let colorStyle = {};
        if (isActive && cat.id !== 'ALL') {
          const c = COMPLIANCE_CATEGORIES[cat.id as ComplianceCategoryId];
          if (c) {
            colorStyle = { backgroundColor: c.cssColor, borderColor: c.cssColor, color: 'white' };
          }
        }
        
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            style={colorStyle}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              isActive 
                ? (cat.id === 'ALL' ? 'bg-brand border-brand text-white shadow-sm' : 'shadow-sm')
                : 'bg-transparent border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            {cat.label}
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100'}`}>
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
