import '../css/input.css';

const createNote = `
  <section id="new-note" class="new-note">
    <input type="text" id='note-title' nav-selectable="true" autofocus name="title" placeholder="Title" />
    <textarea id='note-desc' nav-selectable="true" name="description" placeholder="Description"></textarea>
    <p>
      <span>Location:&nbsp;</span>
      <span id="note-location-label">Updating...</span>
    </p>
  </section>
  <section id="softkey">
    <label id="left">Back</label>
    <label id="center">Save</label>
    <label id="right">Erase</label>
  </section>
`;

export default createNote;