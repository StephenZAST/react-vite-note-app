import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../api/firebase';
import { createNote, updateNote } from '../../api/services/noteServices';
import { useTheme } from '../ThemeContext';
import { MdOutlineSaveAs } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import 'daisyui/dist/full.css';
import '../styles/HomeDark.css';
import '../styles/HomeLight.css';
import '../styles/Home-media-screen.css';
import '../styles/Dash.css';
import '../styles/DashLight.css';
import '../styles/DashMediaScreen.css';
import '../styles/Notes.css';

const Notes = ({ currentUser }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const { isDarkTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const q = query(collection(db, 'notes'), where('userId', '==', currentUser?.uid));
        const querySnapshot = await getDocs(q);
        const notesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setNotes(notesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des notes :', error);
      }
    };

    fetchNotes();
  }, [currentUser]);

  const handleNoteClick = (noteId) => {
    setSelectedNote(notes.find((note) => note.id === noteId));
  };

  const handleNoteChange = (event) => {
    setSelectedNote((prevNote) => ({ ...prevNote, text: event.target.value }));
  };

  const handleCreateNote = async () => {
    const newNoteId = await createNote(currentUser.uid, 'Nouvelle note');
    setNotes((prevNotes) => [...prevNotes, { id: newNoteId, text: 'Nouvelle note', timestamp: new Date() }]);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteDoc(doc(db, 'notes', noteId));
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la note :', error);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp?.seconds * 1000).toLocaleDateString();
  };

  const renderNotes = () => {
    return notes.map((note) => (
      <div className='note-item'>
        <Link to={`/dashboard/notes/${note.id}`}>
      <li key={note.id} className={`${isDarkTheme ? "note-item-dark" : "note-item-light"}`} onClick={() => handleNoteClick(note.id)}>
        <p className={`  ${isDarkTheme ? "description-dark" : "description-light"}`}>{note.text.substring(0, 20)}...</p>
        <p className={` note-date  ${isDarkTheme ? "description-dark" : "description-light"}`}>{formatDate(note.timestamp)}</p>
      </li></Link></div>
    ));
  };

  return (
    <div className="notes-container">
      <div className={`notes-drawer ${isDarkTheme ? "notes-drawer-dark" : "notes-drawer-light"}`}>
        <h2 className={` note-drawer-title  ${isDarkTheme ? "description-dark" : "description-light"}`}>Vos Notes</h2>
        <ul className="notes-list">{renderNotes()}</ul>
        <div className='add-note-button-div'>
          <button
            className="add-note-button"
            onClick={() => createNote(currentUser.uid, 'Nouvelle note')}
          >
            <h2 className='nouvelle-note'>+ Nouvelle Note</h2>
          </button>
        </div>
      </div>
      <div className="notes-content">
        {selectedNote && (
          <div className="note-details">
            <div className='note-title-date'>
              <div className='note-title-date-two'> 
              <button className="note-title edit-note-button"
                  onClick={() => updateNote(selectedNote.id, selectedNote.text)}>
                <MdOutlineSaveAs />
              </button>
              <button className="note-title edit-note-button"
                  onClick={() => handleDeleteNote(selectedNote.id)}>
                <MdDeleteForever />
              </button>
              </div>
              <p className="note-date">{formatDate(selectedNote.timestamp)}</p></div>
            <textarea
              className="note-content"
              value={selectedNote.text}
              onChange={handleNoteChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
