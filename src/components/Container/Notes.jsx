import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, createNote, updateNote, deleteNote } from '../../Redux/notesSlice';
import NoteDetailsWrapper from './NoteDetailsWrapper '; 
import { useTheme } from '../ThemeContext';
import { format } from 'date-fns';
import { IoIosSearch } from "react-icons/io";
import 'daisyui/dist/full.css';
import '../styles/HomeDark.css';
import '../styles/HomeLight.css';
import '../styles/Home-media-screen.css';
import '../styles/Dash.css';
import '../styles/DashLight.css';
import '../styles/DashMediaScreen.css';
import '../styles/Notes.css';

// Utility function to format date
const formatDate = (timestamp) => {
  if (!timestamp) return 'Date invalide';
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? 'Date invalide ici' : format(date, 'dd MMMM yyyy à HH:mm:ss');
};

const Notes = ({ currentUser }) => {
  const dispatch = useDispatch();
  const { notes, isNotesUpdated } = useSelector((state) => state.notes);
  const { isDarkTheme } = useTheme();
  const navigate = useNavigate();

  const [activeNoteId, setActiveNoteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchText, setSearchText] = useState('');

  // Fetch notes when the component mounts or currentUser changes
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchNotes(currentUser.uid)).finally(() => setLoading(false));
    }
  }, [currentUser, dispatch]);

  // Handle note selection
  const handleNoteClick = (noteId) => {
    setActiveNoteId(noteId);
    navigate(`/dashboard/notes/${noteId}`);
  };

  // Handle new note creation
const handleCreateNote = async () => {
  await dispatch(createNote({
    userId: currentUser.uid,
    text: 'Nouvelle note'
  }));
  dispatch(fetchNotes(currentUser.uid));
};

  // Handle note update
  const handleNoteUpdate = async (noteId, newText) => {
    await dispatch(updateNote({
      noteId,
      newText
    }));
    dispatch(fetchNotes(currentUser.uid));
  };

  // Handle note deletion
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

  // Render notes list
  const renderNotes = () => {
    const filteredNotes = notes.filter(note => 
      note.text.toLowerCase().includes(searchText.toLowerCase())
    );

    const sortedNotes = [...filteredNotes].sort((a, b) => {
      return sortOrder === 'desc' 
        ? new Date(b.timestamp) - new Date(a.timestamp)
        : new Date(a.timestamp) - new Date(b.timestamp);
    });

    return sortedNotes.map((note, index) => {
      // Créez une clé unique en combinant note.id et index
      const uniqueKey = `${note.id}-${index}`;

      return (
        <div className='note-item' key={uniqueKey}>
          <Link to={`/dashboard/notes/${note.id}`}>
            <li 
              className={`note-item ${activeNoteId === note.id ? 'active' : ''} ${isDarkTheme ? "note-item-dark" : "note-item-light"}`} 
              onClick={() => handleNoteClick(note.id)}
            >
              <p className={`${isDarkTheme ? "description-dark" : "description-light"}`}>
                {note.text.substring(0, 20)}...
              </p>
              <p className={`note-date ${isDarkTheme ? "description-dark" : "description-light"}`}>
                {formatDate(note.timestamp)}
              </p>
            </li>
          </Link>
        </div>
      );
    });
};

  return (
    <div className="notes-container">
      <div className={`notes-drawer ${isDarkTheme ? "notes-drawer-dark" : "notes-drawer-light"}`}>
        <h2 className={`note-drawer-title ${isDarkTheme ? "description-dark" : "description-light"}`}>Vos Notes</h2>
        <div className='note-sort'>
          <div className='dash-search-div'>
            <IoIosSearch className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher"
              className="search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="dropdown dropdown-right sort-button">
            <div tabIndex={0} role="button" className="btn m-1 sort-button-one">Trier</div>
            <ul tabIndex={0} className="dropdown-content menu sort-button-two z-[1] p-2 shadow">
              <li><a onClick={() => setSortOrder('desc')}>Plus Récent</a></li>
              <li><a onClick={() => setSortOrder('asc')}>Plus Ancien</a></li>
            </ul>
          </div>
        </div>

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
          <Route 
            path=":noteId" 
            element={
              <NoteDetailsWrapper
                currentUser={currentUser}
                handleNoteUpdate={handleNoteUpdate}
                handleNoteDelete={handleNoteDelete}
              />
            } 
          />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Notes;