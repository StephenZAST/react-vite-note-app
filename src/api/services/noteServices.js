import { db } from "../firebase";
import { collection, addDoc, query, where, getDoc, getDocs, doc, updateDoc, deleteDoc, orderBy } from "firebase/firestore";

export const createNote = async (userId, text) => {
  try {
    const noteData = {
      userId, 
      text,
      timestamp: new Date(),
    };

    const docRef = await addDoc(collection(db, "notes"), noteData);
    console.log("Note créée avec succès !");
    return { id: docRef.id, ...noteData };
  } catch (error) {
    console.error("Erreur lors de la création de la note :", error);
    throw error;
  }
};

export const updateNote = async (noteId, newText) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    const noteData = await getDoc(noteRef);
    const timestamp = noteData.data().timestamp.toDate ? noteData.data().timestamp.toDate().toISOString() : new Date(noteData.data().timestamp.seconds * 1000).toISOString();
    const key = `${noteId}-${timestamp}`;

    await updateDoc(noteRef, {
      text: newText,
      timestamp: new Date(),
    });

    console.log("Note mise à jour avec succès !");
    return { id: noteId, text: newText, timestamp: new Date(), key };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la note :", error);
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    await deleteDoc(noteRef);
    console.log("Note supprimée avec succès !");
    return noteId;
  } catch (error) {
    console.error("Erreur lors de la suppression de la note :", error);
    throw error;
  }
};

export const fetchNotes = async (userId) => {
  try {
    const q = query(
      collection(db, 'notes'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp.toDate ? data.timestamp.toDate().toISOString() : new Date(data.timestamp.seconds * 1000).toISOString()
      };
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des notes :", error);
    throw error;
  }
};
