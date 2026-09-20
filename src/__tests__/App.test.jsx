import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';

describe('FocusList Application', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('1. Application starts successfully with empty state and zero stats', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /FocusList/i })).toBeInTheDocument();
    expect(screen.getByText(/Organize effortlessly/i)).toBeInTheDocument();
    expect(screen.getByTestId('stat-total')).toHaveTextContent('0');
    expect(screen.getByTestId('stat-pending')).toHaveTextContent('0');
    expect(screen.getByTestId('stat-completed')).toHaveTextContent('0');
    expect(screen.getByText(/Your focus list is clear!/i)).toBeInTheDocument();
  });

  it('2. Add task works with custom title and default priority', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to accomplish\?/i);
    const addButton = screen.getByRole('button', { name: /Add Task to FocusList/i });

    await user.type(input, 'Write unit tests');
    await user.click(addButton);

    expect(screen.getByText('Write unit tests')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByTestId('stat-total')).toHaveTextContent('1');
    expect(screen.getByTestId('stat-pending')).toHaveTextContent('1');
    expect(screen.getByTestId('stat-completed')).toHaveTextContent('0');
  });

  it('3. Empty title is rejected and whitespace-only title is rejected', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to accomplish\?/i);
    const addButton = screen.getByRole('button', { name: /Add Task to FocusList/i });

    // Submit with empty string
    await user.click(addButton);
    expect(screen.getByRole('alert')).toHaveTextContent(/Task title cannot be empty/i);
    expect(screen.getByTestId('stat-total')).toHaveTextContent('0');

    // Submit with whitespace only
    await user.type(input, '     ');
    await user.click(addButton);
    expect(screen.getByRole('alert')).toHaveTextContent(/Task title cannot be empty/i);
    expect(screen.getByTestId('stat-total')).toHaveTextContent('0');
  });

  it('4. All three priorities work (High, Medium, Low)', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to accomplish\?/i);
    const prioritySelect = screen.getByLabelText(/^Priority$/i);
    const addButton = screen.getByRole('button', { name: /Add Task to FocusList/i });

    // High
    await user.type(input, 'Task High');
    await user.selectOptions(prioritySelect, 'High');
    await user.click(addButton);

    // Medium
    await user.type(input, 'Task Medium');
    await user.selectOptions(prioritySelect, 'Medium');
    await user.click(addButton);

    // Low
    await user.type(input, 'Task Low');
    await user.selectOptions(prioritySelect, 'Low');
    await user.click(addButton);

    expect(screen.getByText('Task High')).toBeInTheDocument();
    expect(screen.getByText('Task Medium')).toBeInTheDocument();
    expect(screen.getByText('Task Low')).toBeInTheDocument();

    const highBadges = screen.getAllByLabelText(/Priority: High/i);
    expect(highBadges.length).toBeGreaterThan(0);
    const medBadges = screen.getAllByLabelText(/Priority: Medium/i);
    expect(medBadges.length).toBeGreaterThan(0);
    const lowBadges = screen.getAllByLabelText(/Priority: Low/i);
    expect(lowBadges.length).toBeGreaterThan(0);
  });

  it('5. Complete/uncomplete works and updates statistics', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to accomplish\?/i);
    const addButton = screen.getByRole('button', { name: /Add Task to FocusList/i });

    await user.type(input, 'Finish project milestone');
    await user.click(addButton);

    const checkbox = screen.getByRole('checkbox', { name: /Mark "Finish project milestone" as completed/i });
    expect(checkbox).toHaveAttribute('aria-checked', 'false');

    // Mark completed
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByTestId('stat-completed')).toHaveTextContent('1');
    expect(screen.getByTestId('stat-pending')).toHaveTextContent('0');

    // Mark active again
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByTestId('stat-completed')).toHaveTextContent('0');
    expect(screen.getByTestId('stat-pending')).toHaveTextContent('1');
  });

  it('6. Edit works and modifies task rather than duplicating it', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to accomplish\?/i);
    const addButton = screen.getByRole('button', { name: /Add Task to FocusList/i });

    await user.type(input, 'Original Task Title');
    await user.click(addButton);

    expect(screen.getByTestId('stat-total')).toHaveTextContent('1');

    const editButton = screen.getByTitle('Edit task');
    await user.click(editButton);

    const editInput = screen.getByLabelText('Edit task title');
    const editPrioritySelect = screen.getByLabelText('Edit task priority');
    const saveButton = screen.getByRole('button', { name: /Save changes/i });

    await user.clear(editInput);
    await user.type(editInput, 'Updated Task Title');
    await user.selectOptions(editPrioritySelect, 'High');
    await user.click(saveButton);

    expect(screen.queryByText('Original Task Title')).not.toBeInTheDocument();
    expect(screen.getByText('Updated Task Title')).toBeInTheDocument();
    expect(screen.getByLabelText(/Priority: High/i)).toBeInTheDocument();
    expect(screen.getByTestId('stat-total')).toHaveTextContent('1'); // No duplicate created
  });

  it('7. Delete works and updates statistics', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to accomplish\?/i);
    const addButton = screen.getByRole('button', { name: /Add Task to FocusList/i });

    await user.type(input, 'Task to be deleted');
    await user.click(addButton);

    expect(screen.getByText('Task to be deleted')).toBeInTheDocument();
    expect(screen.getByTestId('stat-total')).toHaveTextContent('1');

    const deleteButton = screen.getByTitle('Delete task');
    await user.click(deleteButton);

    expect(screen.queryByText('Task to be deleted')).not.toBeInTheDocument();
    expect(screen.getByTestId('stat-total')).toHaveTextContent('0');
  });

  it('8. Real-time search works on task titles', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to accomplish\?/i);
    const addButton = screen.getByRole('button', { name: /Add Task to FocusList/i });

    await user.type(input, 'Buy groceries');
    await user.click(addButton);

    await user.type(input, 'Write code');
    await user.click(addButton);

    const searchInput = screen.getByPlaceholderText(/Search tasks by title\.\.\./i);
    await user.type(searchInput, 'groceries');

    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.queryByText('Write code')).not.toBeInTheDocument();

    // Clear search
    const clearSearchBtn = screen.getByRole('button', { name: /Clear search input/i });
    await user.click(clearSearchBtn);

    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Write code')).toBeInTheDocument();
  });

  it('9. Status filter works: All, Active, Completed', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to accomplish\?/i);
    const addButton = screen.getByRole('button', { name: /Add Task to FocusList/i });

    await user.type(input, 'Task 1 (Pending)');
    await user.click(addButton);

    await user.type(input, 'Task 2 (To Complete)');
    await user.click(addButton);

    // Complete Task 2
    const completeTask2Btn = screen.getByRole('checkbox', { name: /Mark "Task 2 \(To Complete\)" as completed/i });
    await user.click(completeTask2Btn);

    const activeFilterBtn = screen.getByRole('button', { name: /^Active$/i });
    const completedFilterBtn = screen.getByRole('button', { name: /^Completed$/i });
    const allFilterBtn = screen.getByRole('button', { name: /^All$/i });

    // Filter Active
    await user.click(activeFilterBtn);
    expect(screen.getByText('Task 1 (Pending)')).toBeInTheDocument();
    expect(screen.queryByText('Task 2 (To Complete)')).not.toBeInTheDocument();

    // Filter Completed
    await user.click(completedFilterBtn);
    expect(screen.queryByText('Task 1 (Pending)')).not.toBeInTheDocument();
    expect(screen.getByText('Task 2 (To Complete)')).toBeInTheDocument();

    // Filter All
    await user.click(allFilterBtn);
    expect(screen.getByText('Task 1 (Pending)')).toBeInTheDocument();
    expect(screen.getByText('Task 2 (To Complete)')).toBeInTheDocument();
  });

  it('10. Priority filter works: All Priorities, High, Medium, Low', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to accomplish\?/i);
    const prioritySelect = screen.getByLabelText(/^Priority$/i);
    const addButton = screen.getByRole('button', { name: /Add Task to FocusList/i });

    await user.type(input, 'Alpha High');
    await user.selectOptions(prioritySelect, 'High');
    await user.click(addButton);

    await user.type(input, 'Beta Low');
    await user.selectOptions(prioritySelect, 'Low');
    await user.click(addButton);

    const priorityFilter = screen.getByLabelText(/Filter by priority/i);

    // Filter High
    await user.selectOptions(priorityFilter, 'High');
    expect(screen.getByText('Alpha High')).toBeInTheDocument();
    expect(screen.queryByText('Beta Low')).not.toBeInTheDocument();

    // Filter Low
    await user.selectOptions(priorityFilter, 'Low');
    expect(screen.queryByText('Alpha High')).not.toBeInTheDocument();
    expect(screen.getByText('Beta Low')).toBeInTheDocument();

    // Filter All
    await user.selectOptions(priorityFilter, 'all');
    expect(screen.getByText('Alpha High')).toBeInTheDocument();
    expect(screen.getByText('Beta Low')).toBeInTheDocument();
  });

  it('11. Search + status + priority filtering work simultaneously', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to accomplish\?/i);
    const prioritySelect = screen.getByLabelText(/^Priority$/i);
    const addButton = screen.getByRole('button', { name: /Add Task to FocusList/i });

    // Task 1: "Design homepage", High, Active
    await user.type(input, 'Design homepage');
    await user.selectOptions(prioritySelect, 'High');
    await user.click(addButton);

    // Task 2: "Design database", High, Completed
    await user.type(input, 'Design database');
    await user.selectOptions(prioritySelect, 'High');
    await user.click(addButton);
    const checkTask2 = screen.getByRole('checkbox', { name: /Mark "Design database" as completed/i });
    await user.click(checkTask2);

    // Task 3: "Design logo", Low, Active
    await user.type(input, 'Design logo');
    await user.selectOptions(prioritySelect, 'Low');
    await user.click(addButton);

    // Filter: search="design" + status=active + priority=High
    const searchInput = screen.getByPlaceholderText(/Search tasks by title\.\.\./i);
    await user.type(searchInput, 'design');

    const activeFilterBtn = screen.getByRole('button', { name: /^Active$/i });
    await user.click(activeFilterBtn);

    const priorityFilter = screen.getByLabelText(/Filter by priority/i);
    await user.selectOptions(priorityFilter, 'High');

    // Only "Design homepage" matches all three criteria!
    expect(screen.getByText('Design homepage')).toBeInTheDocument();
    expect(screen.queryByText('Design database')).not.toBeInTheDocument();
    expect(screen.queryByText('Design logo')).not.toBeInTheDocument();
  });

  it('12. LocalStorage persistence: saves to focuslist_tasks and survives reload', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to accomplish\?/i);
    const prioritySelect = screen.getByLabelText(/^Priority$/i);
    const addButton = screen.getByRole('button', { name: /Add Task to FocusList/i });

    await user.type(input, 'Persisted Task');
    await user.selectOptions(prioritySelect, 'High');
    await user.click(addButton);

    const storedData = localStorage.getItem('focuslist_tasks');
    expect(storedData).not.toBeNull();
    const parsed = JSON.parse(storedData);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]).toMatchObject({
      title: 'Persisted Task',
      priority: 'High',
      completed: false,
    });
    expect(parsed[0].id).toBeDefined();
    expect(parsed[0].createdAt).toBeDefined();

    unmount();

    // Re-render (simulate page reload)
    render(<App />);
    expect(screen.getByText('Persisted Task')).toBeInTheDocument();
    expect(screen.getByTestId('stat-total')).toHaveTextContent('1');
    expect(screen.getByTestId('stat-pending')).toHaveTextContent('1');
  });

  it('13. Empty filter state displays message and Reset Filters button works', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to accomplish\?/i);
    const addButton = screen.getByRole('button', { name: /Add Task to FocusList/i });

    await user.type(input, 'Apples and Oranges');
    await user.click(addButton);

    const searchInput = screen.getByPlaceholderText(/Search tasks by title\.\.\./i);
    await user.type(searchInput, 'NonExistentTermXYZ');

    expect(screen.getByText(/No matching tasks/i)).toBeInTheDocument();

    const resetButton = screen.getByRole('button', { name: /Clear all active filters and search queries/i });
    await user.click(resetButton);

    expect(screen.getByText('Apples and Oranges')).toBeInTheDocument();
  });

  it('14. Keyboard navigation: Escape cancels edit and Enter saves edit', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to accomplish\?/i);
    const addButton = screen.getByRole('button', { name: /Add Task to FocusList/i });

    await user.type(input, 'Original Task');
    await user.click(addButton);

    const editButton = screen.getByTitle('Edit task');
    await user.click(editButton);

    const editInput = screen.getByLabelText('Edit task title');
    await user.clear(editInput);
    await user.type(editInput, 'Typed But Cancelled');
    fireEvent.keyDown(editInput, { key: 'Escape', code: 'Escape' });

    // Should revert back to Original Task
    expect(screen.getByText('Original Task')).toBeInTheDocument();
    expect(screen.queryByText('Typed But Cancelled')).not.toBeInTheDocument();

    // Now test Enter key
    await user.click(screen.getByTitle('Edit task'));
    const editInput2 = screen.getByLabelText('Edit task title');
    await user.clear(editInput2);
    await user.type(editInput2, 'Typed And Saved');
    fireEvent.keyDown(editInput2, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('Typed And Saved')).toBeInTheDocument();
  });
});
