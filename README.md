# FocusList ⚡

> **Organize effortlessly. Focus deeply. Achieve more.**

FocusList is a modern, lightweight, accessible, frontend-only productivity application built to help individuals and teams organize daily tasks and focus on what matters most. Built with React and Vite, it delivers instant responsiveness, real-time search, multi-filter capabilities, task metrics, and complete offline persistence via browser LocalStorage.

---

## 🚀 Features

- **Intuitive Task Creation**: Add tasks quickly with title and priority levels (**High**, **Medium**, **Low**). Empty or whitespace-only titles are automatically validated and rejected with accessible alerts.
- **Task Management**:
  - Toggle completion status with instant visual feedback (strike-through and muted appearance).
  - Inline editing of title and priority preserving task history and identifiers without duplication.
  - Delete tasks cleanly with instant statistics updates.
- **Visual Priority Badges**: Priority is communicated clearly through distinct labels, symbols (`▲ High`, `■ Medium`, `▼ Low`), and color schemes ensuring full WCAG accessibility (does not rely on color alone).
- **Real-Time Instant Search**: Filter task titles on the fly as you type with a one-click search clearing mechanism.
- **Status Filters**: Switch between **All**, **Active**, and **Completed** tasks.
- **Priority Filters**: Filter specifically by **All Priorities**, **High**, **Medium**, or **Low**.
- **Simultaneous Multi-Filtering**: Search, status filter, and priority filter evaluate synchronously in real-time.
- **Live Statistics Cards**:
  - **Total Tasks**
  - **Pending Tasks** (`Pending = Total - Completed`)
  - **Completed Tasks**
  - Interactive progress indicator reflecting overall completion percentage.
- **Persistent LocalStorage**: Automatically synchronizes all task changes under the key `focuslist_tasks`. Refreshing or reopening the browser never loses your data.
- **Accessible & Responsive**:
  - Semantic HTML (`<header>`, `<main>`, `<section>`, `<form>`, `<label>`, `<ul>`, `<li>`, `<button>`).
  - Full keyboard accessibility (including `Enter` to save edits, `Escape` to cancel edits, and visible `:focus-visible` outlines).
  - Mobile, tablet, and desktop responsive layout with touch-friendly targets.
  - Dedicated empty states for empty lists and zero-match search results with a quick reset button.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Bundler & Dev Server**: Vite 6
- **Styling**: Pure Modern CSS (CSS custom properties, CSS Grid, Flexbox, responsive breakpoints)
- **Persistence**: Browser `localStorage` (`focuslist_tasks`)
- **Testing**: Vitest & React Testing Library
- **Dependencies**: Zero backend, zero external database, zero bloated libraries

---

## 💾 LocalStorage Implementation

FocusList stores all task records in browser `localStorage` using the key `focuslist_tasks`.
Each task item conforms to the strict data schema:
```json
{
  "id": "uuid-or-unique-timestamp",
  "title": "Clean codebase and write tests",
  "priority": "High",
  "completed": false,
  "createdAt": "2026-09-20T05:15:00.000Z"
}
```
Tasks are read on application initialization and safely written whenever any task is added, updated, toggled, or removed.

---

## 💻 Local Development

### Prerequisites

Ensure you have **Node.js** (v18 or newer) and **npm** installed.

### 1. Clone the repository
```bash
git clone https://github.com/Manushree-S/WebRush.git
cd WebRush
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Run test suite
```bash
npm test
```

---

## 📦 Production Build

To compile a production-ready static build:

```bash
npm run build
```

This creates an optimized, minified bundle in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment Instructions

FocusList is a pure client-side Single Page Application (SPA) with no backend, making it deployable on any static hosting provider.

### Vercel
1. Install the Vercel CLI: `npm i -g vercel` or connect the GitHub repository `https://github.com/Manushree-S/WebRush.git` on [vercel.com](https://vercel.com).
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.

### Netlify
1. Connect your repository on [netlify.com](https://netlify.com) or use Netlify CLI.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy site.

### GitHub Pages
1. Set `base: './'` in `vite.config.js` if deploying to a subpath or user page.
2. Run `npm run build`.
3. Deploy the `dist` folder to the `gh-pages` branch or configure GitHub Actions.

---

## 📊 Dataset Notice

Per project guidelines, FocusList relies entirely on user input and persistent browser `localStorage`. No external Kaggle dataset, API, or backend is required.

---

## 📄 License

MIT License &copy; 2026 FocusList Contributors.
