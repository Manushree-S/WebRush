import React from 'react';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';

export default function TaskList({
  tasks,
  filteredTasks,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  onResetFilters,
  isFiltered,
}) {
  if (filteredTasks.length === 0) {
    return (
      <EmptyState
        isFiltered={isFiltered || tasks.length > 0}
        onResetFilters={onResetFilters}
      />
    );
  }

  return (
    <section className="task-list-section" aria-label="Task List">
      <div className="task-list-header">
        <span className="task-count-text">
          Showing {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          {tasks.length !== filteredTasks.length && ` (filtered from ${tasks.length})`}
        </span>
      </div>
      <ul className="task-list" aria-label="Tasks">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
    </section>
  );
}
