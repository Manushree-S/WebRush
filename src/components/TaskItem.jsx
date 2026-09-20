import React, { useState } from 'react';

export default function TaskItem({
  task,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editError, setEditError] = useState('');

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(task.createdAt));

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditError('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditError('');
  };

  const handleSaveEdit = (e) => {
    if (e) e.preventDefault();
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) {
      setEditError('Title cannot be empty.');
      return;
    }

    onUpdateTask(task.id, {
      title: trimmedTitle,
      priority: editPriority,
    });
    setIsEditing(false);
    setEditError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit(e);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const priorityBadgeConfig = {
    High: {
      className: 'badge-high',
      icon: '▲',
      label: 'High Priority',
    },
    Medium: {
      className: 'badge-medium',
      icon: '■',
      label: 'Medium Priority',
    },
    Low: {
      className: 'badge-low',
      icon: '▼',
      label: 'Low Priority',
    },
  };

  const badgeInfo = priorityBadgeConfig[task.priority] || priorityBadgeConfig.Medium;

  if (isEditing) {
    return (
      <li className="task-item editing-task-item" data-testid={`task-item-${task.id}`}>
        <form onSubmit={handleSaveEdit} className="edit-form" noValidate>
          <div className="edit-fields">
            <div className="edit-title-group">
              <label htmlFor={`edit-input-${task.id}`} className="sr-only">
                Edit task title
              </label>
              <input
                id={`edit-input-${task.id}`}
                type="text"
                className={`form-input edit-title-input ${editError ? 'input-error' : ''}`}
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                  if (editError && e.target.value.trim()) setEditError('');
                }}
                onKeyDown={handleKeyDown}
                autoFocus
                aria-label="Edit task title"
              />
            </div>

            <div className="edit-priority-group">
              <label htmlFor={`edit-priority-${task.id}`} className="sr-only">
                Edit task priority
              </label>
              <select
                id={`edit-priority-${task.id}`}
                className="form-select edit-priority-select"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                aria-label="Edit task priority"
              >
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
            </div>
          </div>

          {editError && (
            <p className="error-message edit-error" role="alert">
              <span>{editError}</span>
            </p>
          )}

          <div className="edit-actions">
            <button
              type="submit"
              className="btn btn-save"
              aria-label={`Save changes for task ${task.title}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Save</span>
            </button>
            <button
              type="button"
              className="btn btn-cancel"
              onClick={handleCancelEdit}
              aria-label="Cancel editing"
            >
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li
      className={`task-item ${task.completed ? 'task-completed' : ''}`}
      data-testid={`task-item-${task.id}`}
    >
      <div className="task-main">
        <button
          type="button"
          className={`btn-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggleComplete(task.id)}
          aria-label={
            task.completed
              ? `Mark "${task.title}" as active`
              : `Mark "${task.title}" as completed`
          }
          aria-checked={task.completed}
          role="checkbox"
        >
          {task.completed && (
            <svg
              className="check-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>

        <div className="task-content">
          <span
            className={`task-title ${task.completed ? 'completed-title' : ''}`}
            title={task.title}
          >
            {task.title}
          </span>
          <div className="task-meta">
            <span
              className={`priority-badge ${badgeInfo.className}`}
              aria-label={`Priority: ${task.priority}`}
              title={`Priority: ${task.priority}`}
            >
              <span className="priority-symbol" aria-hidden="true">{badgeInfo.icon}</span>
              <span className="priority-text">{task.priority}</span>
            </span>
            <span className="task-timestamp" title={`Created on ${task.createdAt}`}>
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="btn-icon-action btn-edit"
          onClick={handleStartEdit}
          aria-label={`Edit task "${task.title}"`}
          title="Edit task"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>

        <button
          type="button"
          className="btn-icon-action btn-delete"
          onClick={() => onDeleteTask(task.id)}
          aria-label={`Delete task "${task.title}"`}
          title="Delete task"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </li>
  );
}
