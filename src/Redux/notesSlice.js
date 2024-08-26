import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createNote as createNoteService, updateNote as updateNoteService, deleteNote as deleteNoteService, fetchNotes as fetchNotesService } from '../api/services/noteServices';
import { onSnapshot, query, collection, where, orderBy } from 'firebase/firestore';
import { db } from '../api/firebase';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (userId, { dispatch }) => {
    const q = query(
      collection(db, 'notes'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    const notes = await fetchNotesService(userId);

    // Listen for real-time updates
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const noteData = { id: change.doc.id, ...change.doc.data() };
        noteData.timestamp = noteData.timestamp.toDate ? noteData.timestamp.toDate().toISOString() : new Date(noteData.timestamp.seconds * 1000).toISOString();
        const key = `${noteData.id}-${noteData.timestamp}`;

        if (change.type === 'added') {
          dispatch(noteAdded({ ...noteData, key }));
        }
        if (change.type === 'modified') {
          dispatch(noteUpdated({ ...noteData, key }));
        }
        if (change.type === 'removed') {
          dispatch(noteDeleted(change.doc.id));
        }
      });
    });

    return notes.map(note => ({
      ...note,
      timestamp: note.timestamp.toDate ? note.timestamp.toDate().toISOString() : new Date(note.timestamp.seconds * 1000).toISOString(),
      key: `${note.id}-${note.timestamp}` // Ajouter clé unique
    }));
});

export const createNote = createAsyncThunk('notes/createNote', async ({ userId, text }) => {
  const noteData = await createNoteService(userId, text);
  // Store the created note in memory
  notesStore.notes.push(noteData);

  return { ...noteData };
});

export const updateNote = createAsyncThunk('notes/updateNote', async ({ noteId, newText }) => {
  const noteData = await updateNoteService(noteId, newText);
  noteData.timestamp = noteData.timestamp.toISOString();
  const key = `${noteData.id}-${noteData.timestamp}`; // Clé unique
  return { ...noteData, key };
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId) => {
  await deleteNoteService(noteId);
  return noteId;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    status: 'idle',
    error: null,
    isNotesUpdated: false
  },
  reducers: {
    noteAdded: (state, action) => {
      const exists = state.notes.some(note => note.id === action.payload.id);
      if (!exists) {
        state.notes.push(action.payload);
        state.isNotesUpdated = true;
      }
      
    },
    noteUpdated: (state, action) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    noteDeleted: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });
  },
});

export const { noteAdded, noteUpdated, noteDeleted } = notesSlice.actions;

export default notesSlice.reducer;