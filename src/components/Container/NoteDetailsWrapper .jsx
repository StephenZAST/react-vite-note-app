import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NoteDetails from './NoteDetails';
import { fetchNotes, updateNote, deleteNote } from '../../Redux/notesSlice';
import { format } from 'date-fns';

const NoteDetailsWrapper = ({ currentUser }) => {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchNotes(currentUser.uid));
    }
  }, [currentUser, dispatch]);

  const note = notes.find(note => note.id === noteId);

  const handleNoteUpdate = (noteId, newText) => {
    dispatch(updateNote({
      noteId,
      newText
    }));
  };

  const handleNoteDelete = (noteId) => {
    dispatch(deleteNote(noteId));
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Date invalide wrapper';
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? 'Date invalide wrapper second' : format(date, 'dd MMMM yyyy à HH:mm:ss');
  };

  const formattedNote = note ? { ...note, timestamp: formatDate(note.timestamp) } : null;

  return (
    <NoteDetails note={formattedNote} handleNoteUpdate={handleNoteUpdate} handleNoteDelete={handleNoteDelete} />
  );
};

export default NoteDetailsWrapper;
