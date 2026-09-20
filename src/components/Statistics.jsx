import React from 'react';

export default function Statistics({ total, completed, pending }) {
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="statistics-section" aria-label="Task Statistics">
      <div className="stats-grid">
        <div className="stat-card stat-card-total">
          <div className="stat-icon-wrapper icon-total" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-value" data-testid="stat-total">{total}</span>
          </div>
        </div>

        <div className="stat-card stat-card-pending">
          <div className="stat-icon-wrapper icon-pending" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Pending Tasks</span>
            <span className="stat-value" data-testid="stat-pending">{pending}</span>
          </div>
        </div>

        <div className="stat-card stat-card-completed">
          <div className="stat-icon-wrapper icon-completed" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Completed Tasks</span>
            <span className="stat-value" data-testid="stat-completed">{completed}</span>
          </div>
        </div>
      </div>

      {total > 0 && (
        <div className="progress-container" aria-label={`Progress: ${completionPercentage}% completed`}>
          <div className="progress-header">
            <span className="progress-title">Overall Progress</span>
            <span className="progress-percentage">{completionPercentage}%</span>
          </div>
          <div className="progress-bar-track" role="progressbar" aria-valuenow={completionPercentage} aria-valuemin="0" aria-valuemax="100">
            <div
              className="progress-bar-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
