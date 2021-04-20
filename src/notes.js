let allNotes = [];

const renderNote = note => {
  const notes = document.getElementById("notes");
  const node = document.createElement("span");
  const text = document.createTextNode(note.title);
  node.setAttribute("nav-selectable", "true");
  node.appendChild(text);
  notes.appendChild(node);
};

const addNote = note => {
  allNotes.push(note);
  localStorage.setItem('notes', JSON.stringify(allNotes));
};

const deleteNote = idx => {
  allNotes.splice(idx, 1);

  const notes = document.getElementById("notes");
  notes.removeChild(notes.childNodes[idx]);

  localStorage.setItem('notes', JSON.stringify(allNotes));

  return allNotes.length;
};

const editNote = (idx, note) => {
  allNotes.splice(idx, 1, note);
  localStorage.setItem('notes', JSON.stringify(allNotes));
};

const getNoteByIdx = idx => allNotes[idx];

const renderNotes = () => {
  if (!allNotes.length) {
    const notes = document.getElementById("notes");
    const node = document.createElement("span");
    // const text = document.createTextNode(translate('message'));
    const text = document.createTextNode('Create a note to get started');
    node.appendChild(text);
    notes.appendChild(node);

    return;
  }
  allNotes.forEach(note => renderNote(note));
  return allNotes.length;
};

const loadNotes = () => {
  // Get previously saved notes from localstorage/IndexedDB/DeviceStorage
  const allNotesStr = localStorage.getItem('notes');
  if (allNotesStr)
    allNotes = JSON.parse(allNotesStr);
};

export default { renderNotes, addNote, loadNotes, deleteNote, editNote, getNoteByIdx };