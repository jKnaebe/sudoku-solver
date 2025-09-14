## Sudoku Solver
An interactive Sudoku solver and generator built with modern web technologies.

---

## Table of Contents
- Overview
- Architecture & Technologies
- How it works
- Project structure
- Getting started
- Future improvements

---

## Overview
This project provides a web application to generate and solve Sudoku puzzles.
Users can input their own Sudoku or generate one randomly. 
The solver then computes and displays a valid solution.

---

## Architetcture & Technologies
<table>
  <tr><th>Component</th><th>Description</th></tr>
  <tr><td>Frontend</td><td>Built with React + TypeScript.</td></tr>
  <tr><td>State Management</td><td>Uses Zustand, a lightweight state management library, to handle global Sudoku state.</td></tr>
  <tr><td>Styling</td><td>Tailwind CSS for utility-first, responsive design.</td></tr>
  <tr><td>Build / Tooling</td><td>Vite as fast dev server and bundler.</td></tr>
  <tr><td>Sudoku generation</td><td>Includes a script (generate-sudoku-list.cjs) for automatically inserting the Sudokus.</td></tr>
</table>

---

## Project Structure

```txt
/
├── public/                     # Static assets (index.html, icons, etc.)
├── src/                        # Main TypeScript/JavaScript source code
├── generate-sudoku-list.cjs    # Script to generate Sudoku samples
├── index.html
├── package.json
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS setup
├── postcss.config.js           # PostCSS setup
├── tsconfig*.json              # TypeScript configurations
├── eslint.config.js            # ESLint rules
└── .gitignore
```

---

## Getting started

```bash
# Clone the Repo
git clone https://github.com/jKnaebe/sudoku-solver.git
cd sudoku-solver

# Install dependencies
npm install

# Start the dev Server
npm run dev
```

---

## Future improvements

- Advanced solving techniques for more difficult Sudokus
- Extended UI features
- (Support for larger Sudoku grids)
