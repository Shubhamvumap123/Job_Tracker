import React, { memo } from 'react';
import { Filter } from 'lucide-react';

const FilterBar = ({ filters, onFilterChange, options }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 mr-auto">
                <Filter size={18} />
                <span className="text-sm font-medium">Filters:</span>
            </div>

            <select
                value={filters.priority}
                onChange={(e) => onFilterChange('priority', e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
                <option value="">All Priorities</option>
                {options.priorities.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>

            <select
                value={filters.status}
                onChange={(e) => onFilterChange('status', e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
                <option value="">All Statuses</option>
                {options.statuses.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );
};

export default memo(FilterBar);