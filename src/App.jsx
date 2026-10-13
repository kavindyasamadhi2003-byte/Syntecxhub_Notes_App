import { useEffect, useRef, useState } from "react";
import "./App.css";

const STORAGE_KEY = "syntecxhub_notes";

// Page load wenakota localStorage eken notes gannawa
function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [notes, setNotes] = useState(loadNotes);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState(null);

  const titleRef = useRef(null);

  // Notes wenas wena hama welawema localStorage ekata save karanawa
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // App eka open wenakota input field ekata focus karanawa
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const resetForm = () => {
    setTitle("");
    setBody("");
    setEditingId(null);
    titleRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !body.trim()) {
      titleRef.current?.focus();
      return;
    }

    if (editingId) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingId ? { ...n, title: title.trim(), body: body.trim() } : n
        )
      );
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        body: body.trim(),
        createdAt: new Date().toLocaleDateString(),
      };
      setNotes((prev) => [newNote, ...prev]);
    }
    resetForm();
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setBody(note.body);
    titleRef.current?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <main className="app">
      <header className="app__header">
        <h1>Notes</h1>
        <p>{notes.length === 1 ? "1 note saved" : `${notes.length} notes saved`}</p>
      </header>

      <form className="editor" onSubmit={handleSubmit}>
        <input
          ref={titleRef}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Note title"
        />
        <textarea
          placeholder="Write your note here"
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          aria-label="Note body"
        />
        <div className="editor__actions">
          <button type="submit" className="btn btn--primary">
            {editingId ? "Save changes" : "Add note"}
          </button>
          {editingId && (
            <button type="button" className="btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {notes.length === 0 ? (
        <p className="empty">No notes yet. Write your first note above.</p>
      ) : (
        <ul className="grid">
          {notes.map((note) => (
            <li
              key={note.id}
              className={`note ${note.id === editingId ? "note--editing" : ""}`}
            >
              {note.title && <h2>{note.title}</h2>}
              {note.body && <p>{note.body}</p>}
              <footer>
                <span>{note.createdAt}</span>
                <div>
                  <button className="link" onClick={() => startEdit(note)}>
                    Edit
                  </button>
                  <button className="link link--danger" onClick={() => deleteNote(note.id)}>
                    Delete
                  </button>
                </div>
              </footer>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}