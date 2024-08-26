const Notes = ({ currentUser }) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
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

  // ... (reste du code inchangé)

  // Handle new note creation
  const handleCreateNote = async () => {
    await dispatch(createNote({
      userId: currentUser.uid,
      text: 'Nouvelle note'
    }));
    // Mise à jour de la liste des notes après la création
    await dispatch(fetchNotes(currentUser.uid));
  };

  // Handle note update
  const handleNoteUpdate = async (noteId, newText) => {
    await dispatch(updateNote({
      noteId,
      newText
    }));
    // Mise à jour de la liste des notes après la mise à jour
    await dispatch(fetchNotes(currentUser.uid));
  };

  // Handle note deletion
  const handleNoteDelete = async (noteId) => {
    const noteIndex = notes.findIndex(note => note.id === noteId);
    const previousNoteId = noteIndex > 0 ? notes[noteIndex - 1].id : null;

    await dispatch(deleteNote(noteId));
    // Mise à jour de la liste des notes après la suppression
    await dispatch(fetchNotes(currentUser.uid));

    if (previousNoteId) {
      setActiveNoteId(previousNoteId);
      navigate(`/dashboard/notes/${previousNoteId}`);
    } else {
      setActiveNoteId(null);
      navigate('/dashboard/notes');
    }
  };

  // ... (reste du code inchangé)
};