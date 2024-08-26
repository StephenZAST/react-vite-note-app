import React, { useState, useEffect } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../api/firebase';
import { useTheme } from '../ThemeContext';
import { updateNote } from '../../api/services/noteServices';
import { MdOutlineSaveAs } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { format } from 'date-fns';
import 'daisyui/dist/full.css';
import '../styles/HomeDark.css';
import '../styles/HomeLight.css';
import '../styles/Home-media-screen.css';
import '../styles/Dash.css';
import '../styles/DashLight.css';
import '../styles/DashMediaScreen.css';
import '../styles/Notes.css';

const formatDate = (timestamp) => {
  if (!timestamp) return 'Date invalide';
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? 'Date invalide ici' : format(date, 'dd MMMM yyyy à HH:mm:ss');
};

export const NoteDetails = ({ note, handleNoteUpdate, handleNoteDelete }) => {
  const [noteText, setNoteText] = useState(note ? note.text : '');
  const [isSaving, setIsSaving] = useState(false);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    if (note) {
      console.log('Note reçue dans NoteDetails:', note);
      setNoteText(note.text);
    }
  }, [note]);

  const handleNoteChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleSaveNote = async () => {
    setIsSaving(true);
    try {
      await updateNote(note.id, noteText);
      handleNoteUpdate(note.id, noteText);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la note :', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async () => {
    try {
      await deleteDoc(doc(db, 'notes', note.id));
      handleNoteDelete(note.id);
    } catch (error) {
      console.error('Erreur lors de la suppression de la note :', error);
    }
  };

  if (!note) {
    return <div className='laoding-note'><h2 className={`laoding-note-text ${isDarkTheme ? "note-description-dark" : "note-description-light"}`}>Selectionner une note pour l'afficher ici</h2></div>;
  }

  return (
    <div className="note-details">
      <div className='note-title-date'>
        <div className='note-title-date-two'>
          <button className="note-title edit-note-button note-icon-save" onClick={handleSaveNote} disabled={isSaving}>
            <MdOutlineSaveAs />
          </button>
          <button className="note-title edit-note-button note-icon-delete" onClick={handleDeleteNote}>
            <MdDeleteForever />
          </button>
        </div>
        <p className="note-date">{note.timestamp}</p>
      </div>
      <textarea className={`note-content note-content-text ${isDarkTheme ? "note-description-dark" : "note-description-light"}`} value={noteText} onChange={handleNoteChange} />
    </div>
  );
};

export default NoteDetails;
