import React, { memo } from 'react';

const FilterBar = ({ filters, onFilterChange, options }) => {
    return (
        <div className="table-header-actions" style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>

            <select
                value={filters.priority}
                onChange={(e) => onFilterChange('priority', e.target.value)}
                className="sort-btn"
            >
                <option value="">All Priorities</option>
                {options.priorities.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>

            <select
                value={filters.status}
                onChange={(e) => onFilterChange('status', e.target.value)}
                className="sort-btn"
            >
                <option value="">All Statuses</option>
                {options.statuses.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );
};

export default memo(FilterBar);