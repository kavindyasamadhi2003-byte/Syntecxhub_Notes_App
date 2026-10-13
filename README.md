# Syntecxhub Notes App

A simple, responsive notes app built with React. Add, edit, and delete notes. Your notes are saved in the browser, so they are still there after you refresh or close the page.

Built as part of the **Syntecxhub Web Development Internship** (Week 1, Project 3).

## Features

- Add a note with a title and body
- Edit an existing note and save the changes
- Delete a note
- Notes persist across sessions using `localStorage`
- Title field is focused automatically on load and after each action
- Responsive layout for desktop and mobile

## React concepts used

| Concept | Where it is used |
|---|---|
| `useState` | Manages the notes list, form inputs, and the note being edited |
| `useRef` | Moves focus to the title input on load, after saving, and when editing |
| `useEffect` | Saves notes to `localStorage` whenever they change |
| `localStorage` | Keeps notes between browser sessions |

## Tech stack

- React
- Vite
- CSS

## Getting started

Make sure you have [Node.js](https://nodejs.org) installed, then run:

```bash
git clone https://github.com/kavindyasamadhi2003-byte/Syntecxhub_Notes_App.git
cd Syntecxhub_Notes_App
npm install
npm run dev
```

Open the local link shown in the terminal (usually `http://localhost:5173`).

## Project structure

```
Syntecxhub_Notes_App/
├── src/
│   ├── App.jsx      # App logic and UI
│   ├── App.css      # Styles
│   └── main.jsx     # Entry point
├── index.html
└── package.json
```

## Author

Samadhi Kariyawasam
