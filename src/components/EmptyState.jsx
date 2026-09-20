import React from 'react';

export default function EmptyState({ isFiltered, onResetFilters }) {
  if (isFiltered) {
    return (
      <div className="empty-state" role="status">
        <div className="empty-icon-box" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h3 className="empty-title">No matching tasks</h3>
        <p className="empty-desc">
          We couldn't find any tasks matching your current search or filter criteria.
        </p>
        <button
          type="button"
          className="btn btn-secondary empty-action-btn"
          onClick={onResetFilters}
          aria-label="Clear all active filters and search queries"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="empty-state" role="status">
      <div className="empty-icon-box" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </div>
      <h3 className="empty-title">Your focus list is clear!</h3>
      <p className="empty-desc">
        You have no tasks lined up. Create your first task above to start organizing your day.
      </p>
    </div>
  );
}
