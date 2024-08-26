import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, createNote, updateNote, deleteNote } from '../../Redux/notesSlice';
import NoteDetailsWrapper from './NoteDetailsWrapper'; 
import { useTheme } from '../ThemeContext';
import { format } from 'date-fns';

const formatDate = (timestamp) => {
  if (!timestamp) return 'Date invalide';
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? 'Date invalide ici' : format(date, 'dd MMMM yyyy à HH:mm:ss');
};

const Notes = ({ currentUser }) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const { isDarkTheme } = useTheme();
  const navigate = useNavigate();
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchNotes(currentUser.uid)).finally(() => setLoading(false));
    }
  }, [currentUser, dispatch]);

  const handleNoteClick = (noteId) => {
    setActiveNoteId(noteId);
    navigate(`/dashboard/notes/${noteId}`);
  };

  const handleCreateNote = async () => {
    await dispatch(createNote({
      userId: currentUser.uid,
      text: 'Nouvelle note'
    }));
    dispatch(fetchNotes(currentUser.uid));
  };

  const handleNoteUpdate = async (noteId, newText) => {
    await dispatch(updateNote({
      noteId,
      newText
    }));
    dispatch(fetchNotes(currentUser.uid));
  };

  const handleNoteDelete = async (noteId) => {
    const noteIndex = notes.findIndex(note => note.id === noteId);
    const previousNoteId = noteIndex > 0 ? notes[noteIndex - 1].id : null;

    await dispatch(deleteNote(noteId));
    dispatch(fetchNotes(currentUser.uid));

    if (previousNoteId) {
      setActiveNoteId(previousNoteId);
      navigate(`/dashboard/notes/${previousNoteId}`);
    } else {
      setActiveNoteId(null);
      navigate('/dashboard/notes');
    }
  };

  const renderNotes = () => {
    const uniqueNotes = Array.from(new Set(notes.map(note => note.id)))
      .map(id => notes.find(note => note.id === id));

    return uniqueNotes.map((note) => (
      <div className='note-item' key={note.id}>
        <Link to={`/dashboard/notes/${note.id}`} >
          <li className={`note-item ${activeNoteId === note.id ? 'active' : ''} ${isDarkTheme ? "note-item-dark" : "note-item-light"}`} onClick={() => handleNoteClick(note.id)}>
            <p className={`${isDarkTheme ? "description-dark" : "description-light"}`}>{note.text.substring(0, 20)}...</p>
            <p className={`note-date ${isDarkTheme ? "description-dark" : "description-light"}`}>{formatDate(note.timestamp)}</p>
          </li>
        </Link>
      </div>
    ));
  };

  return (
    <div className="notes-container">
      <div className={`notes-drawer ${isDarkTheme ? "notes-drawer-dark" : "notes-drawer-light"}`}>
        <h2 className={`note-drawer-title ${isDarkTheme ? "description-dark" : "description-light"}`}>Vos Notes</h2>
        {loading ? (
          <p className='note-drawer-title'><span className="loading loading-spinner text-primary"></span></p>
        ) : (
          <ul className="notes-list">{renderNotes()}</ul>
        )}
        <div className='add-note-button-div'>
          <button className="add-note-button" onClick={handleCreateNote}>
            <h2 className='nouvelle-note'>+ Nouvelle Note</h2>
          </button>
        </div>
      </div>
      <div className="notes-content">
        <Routes>
          <Route path=":noteId" element={<NoteDetailsWrapper currentUser={currentUser} handleNoteUpdate={handleNoteUpdate} handleNoteDelete={handleNoteDelete} />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Notes;
