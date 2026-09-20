import React, { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Task title cannot be empty.');
      return;
    }

    onAddTask({
      title: trimmedTitle,
      priority,
    });

    setTitle('');
    setPriority('Medium');
    setError('');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (error && e.target.value.trim()) {
      setError('');
    }
  };

  return (
    <section className="task-form-card" aria-label="Add new task">
      <form onSubmit={handleSubmit} className="task-form" noValidate>
        <div className="form-row">
          <div className="form-group title-group">
            <label htmlFor="task-title-input" className="form-label">
              Task Title <span className="required-star" aria-hidden="true">*</span>
            </label>
            <input
              id="task-title-input"
              type="text"
              className={`form-input ${error ? 'input-error' : ''}`}
              placeholder="What do you want to accomplish?"
              value={title}
              onChange={handleTitleChange}
              aria-describedby={error ? 'task-title-error' : undefined}
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>

          <div className="form-group priority-group">
            <label htmlFor="task-priority-select" className="form-label">
              Priority
            </label>
            <select
              id="task-priority-select"
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">🔴 High Priority</option>
              <option value="Medium">🟡 Medium Priority</option>
              <option value="Low">🟢 Low Priority</option>
            </select>
          </div>

          <div className="form-group submit-group">
            <button
              type="submit"
              className="btn btn-primary btn-add"
              aria-label="Add Task to FocusList"
            >
              <svg
                className="btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {error && (
          <p id="task-title-error" className="error-message" role="alert">
            <svg
              className="error-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </p>
        )}
      </form>
    </section>
  );
}
