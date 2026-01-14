import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, onFilterChange, availableTags }) => {
    return (
        <div className="filter-bar">
            <div className="filter-group">
                <label htmlFor="type-filter">Type:</label>
                <select
                    id="type-filter"
                    value={filters.type}
                    onChange={(e) => onFilterChange('type', e.target.value)}
                >
                    <option value="All">All Types</option>
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="tag-filter">Category:</label>
                <select
                    id="tag-filter"
                    value={filters.tag}
                    onChange={(e) => onFilterChange('tag', e.target.value)}
                >
                    <option value="All">All Categories</option>
                    {availableTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
