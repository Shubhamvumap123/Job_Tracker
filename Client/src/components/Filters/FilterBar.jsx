import React, { memo } from 'react';
import { Filter, Search } from 'lucide-react';

const FilterBar = ({ filters, onFilterChange, options }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="relative w-full sm:w-auto text-gray-500">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    placeholder="Search tickets..."
                    value={filters.search || ''}
                    onChange={(e) => onFilterChange('search', e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
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