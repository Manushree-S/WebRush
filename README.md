# FocusList ⚡

> Organize effortlessly. Focus deeply. Achieve more.

FocusList is a modern, responsive task management application built with React and Vite. It helps users organize daily tasks, set priorities, track completion progress, and manage tasks through a simple and intuitive interface.

The application is frontend-only and uses browser LocalStorage to persist task data.

## Live Demo

https://focuslist-manushree.vercel.app/

## GitHub Repository

https://github.com/Manushree-S/WebRush

---

## Features

- Create tasks with High, Medium, or Low priority
- Validate empty or whitespace-only task titles
- Mark tasks as completed or pending
- Edit task titles and priorities
- Delete tasks
- Search tasks in real time
- Filter tasks by status:
  - All
  - Active
  - Completed
- Filter tasks by priority:
  - All Priorities
  - High
  - Medium
  - Low
- Combine search, status, and priority filters
- Display live task statistics:
  - Total Tasks
  - Pending Tasks
  - Completed Tasks
  - Overall Progress
- Persist task data using browser LocalStorage
- Responsive design for desktop, tablet, and mobile devices
- Keyboard-friendly interactions
- Clear empty-state and no-result messages
- Accessible form labels, controls, and focus states

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | User interface |
| Vite 6 | Development server and build tool |
| JavaScript | Application logic |
| CSS3 | Styling and responsive design |
| LocalStorage | Client-side data persistence |
| Vercel | Deployment |

---

## How It Works

1. Enter a task title.
2. Select the required priority level.
3. Click **Add Task**.
4. Use search or filters to find specific tasks.
5. Mark tasks as completed when finished.
6. Edit or delete tasks when required.
7. Monitor overall progress using the statistics section.

All task updates are reflected immediately in the interface.

---

## Data Persistence

FocusList uses the browser's `localStorage` API to store task information.

The application uses the following LocalStorage key:

`focuslist_tasks`

Each task follows a structure similar to:

    {
      "id": "unique-task-id",
      "title": "Complete project documentation",
      "priority": "High",
      "completed": false,
      "createdAt": "2026-09-20T05:15:00.000Z"
    }

Task data is updated whenever a task is:

- Added
- Edited
- Completed
- Reopened
- Deleted

This allows tasks to remain available after refreshing or reopening the browser.

---

## Responsive Design

FocusList is designed to provide a consistent experience across:

- Desktop
- Tablet
- Mobile

The interface uses responsive layouts and touch-friendly controls to maintain usability across different screen sizes.

---

## Accessibility

FocusList includes accessibility-focused design practices such as:

- Semantic HTML elements
- Associated form labels
- Keyboard-friendly controls
- Visible focus states
- Accessible validation messages
- Text and symbol-based priority indicators
- Clear distinction between completed and pending tasks

---

## Testing

The application's core functionality has been tested, including:

- Task creation
- Empty task validation
- Task completion
- Task editing
- Task deletion
- Real-time search
- Status filtering
- Priority filtering
- Combined filtering
- Statistics and progress updates
- LocalStorage persistence
- Responsive layouts

The production build was successfully verified using:

    npm run build

---

## Local Development

### Prerequisites

Make sure the following are installed:

- Node.js 18 or later
- npm

### Clone the Repository

    git clone https://github.com/Manushree-S/WebRush.git

### Navigate to the Project

    cd WebRush

### Install Dependencies

    npm install

### Start the Development Server

    npm run dev

The application will normally be available at:

    http://localhost:5173

---

## Production Build

To create an optimized production build:

    npm run build

The generated production files are stored in:

    dist/

To preview the production build locally:

    npm run preview

---

## Deployment

FocusList is a client-side application and can be deployed using static hosting platforms.

### Vercel

The application is deployed using Vercel.

Live Demo:

https://focuslist-manushree.vercel.app/

Deployment configuration:

    Framework: Vite
    Build Command: npm run build
    Output Directory: dist

---

## Project Structure

    WebRush/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── ...
    ├── dist/
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    └── README.md

---

## Limitations

FocusList is currently a frontend-only application.

- No backend server
- No external database
- No user authentication
- Task data is stored locally in the user's browser
- Tasks are not synchronized across different devices or browsers

---

## Future Improvements

Possible future enhancements include:

- User authentication
- Cloud-based task synchronization
- Due dates and reminders
- Task categories and tags
- Drag-and-drop task organization
- Theme customization
- Cloud database integration
- Progressive Web App (PWA) support

---

## License

This project is available under the MIT License.

---

## Author

**Manushree S**

GitHub:  
https://github.com/Manushree-S/WebRush

LinkedIn:  
https://www.linkedin.com/in/manushrees-dev/


MIT License &copy; 2026 FocusList Contributors.
