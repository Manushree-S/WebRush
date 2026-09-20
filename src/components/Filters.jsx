import React from 'react';

export default function Filters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  onResetFilters,
  hasActiveFilters,
}) {
  return (
    <section className="filters-section" aria-label="Search and Filter Tasks">
      <div className="search-bar-wrapper">
        <label htmlFor="task-search-input" className="sr-only">
          Search tasks by title
        </label>
        <div className="search-input-container">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="task-search-input"
            type="text"
            className="search-input"
            placeholder="Search tasks by title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="btn-clear-search"
              onClick={() => onSearchChange('')}
              aria-label="Clear search input"
              title="Clear search"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="filter-controls">
        <div className="status-filters" role="group" aria-label="Filter tasks by status">
          <button
            type="button"
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => onStatusChange('all')}
            aria-pressed={statusFilter === 'all'}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-btn ${statusFilter === 'active' ? 'active' : ''}`}
            onClick={() => onStatusChange('active')}
            aria-pressed={statusFilter === 'active'}
          >
            Active
          </button>
          <button
            type="button"
            className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onStatusChange('completed')}
            aria-pressed={statusFilter === 'completed'}
          >
            Completed
          </button>
        </div>

        <div className="priority-filter-wrapper">
          <label htmlFor="priority-filter-select" className="sr-only">
            Filter by priority
          </label>
          <select
            id="priority-filter-select"
            className="priority-filter-select"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            aria-label="Filter by priority"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn btn-reset-filters"
            onClick={onResetFilters}
            aria-label="Reset all search and filter criteria"
          >
            <svg
              className="reset-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </section>
  );
}
