import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

const Notes = ({ currentUser }) => {
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch notes from Firestore
    const fetchNotes = async () => {
      const q = query(collection(firestore, 'notes'), where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const notesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(notesData);
    };
    fetchNotes();
  }, [currentUser]);

  const handleNoteClick = (noteId) => {
    setActiveNoteId(noteId);
    navigate(`/dashboard/notes/${noteId}`);
  };

  const renderNotes = () => {
    return notes.map((note) => (
      <li
        key={note.id}
        className={`note-item ${activeNoteId === note.id ? 'active' : ''}`}
        onClick={() => handleNoteClick(note.id)}
      >
        <p>{note.text.substring(0, 20)}...</p>
        <p>{new Date(note.timestamp).toLocaleDateString()}</p>
      </li>
    ));
  };

  return (
    <div className="notes-container">
      <div className="notes-drawer">
        <ul className="notes-list">{renderNotes()}</ul>
      </div>
      <div className="notes-content">
        <Routes>
          <Route path="/dashboard/notes/:noteId" element={<NoteDetails notes={notes} />} />
        </Routes>
      </div>
    </div>
  );
};

const NoteDetails = ({ notes }) => {
  const { noteId } = useParams();
  const note = notes.find(note => note.id === noteId);

  const handleNoteChange = (e) => {
    // Update the note text here
  };

  if (!note) {
    return <p>Select a note to view its details</p>;
  }

  return (
    <div>
      <p>{new Date(note.timestamp).toLocaleDateString()}</p>
      <textarea
        value={note.text}
        onChange={handleNoteChange}
      />
    </div>
  );
};

export default Notes;
