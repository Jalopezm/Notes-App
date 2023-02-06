export default function NewNote({ noteType }) {
  if (noteType === "text") {
    return (
      <div>
        <h1>New Text Note</h1>
        <form action="/textNote" method="post">
          <label htmlFor="note-title">Title</label>
          <input type="text" name="note-tilte" id="note-title" />
          <label htmlFor="text-note">Note Cotent</label>
          <textarea
            name="text-note"
            id="text-note"
            cols="30"
            rows="10"
          ></textarea>
          <label htmlFor="img">Add an Image</label>
          <input type="file" name="img" id="img" />
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h1>New Audio Note</h1>
        <form action="/audioNote" method="post">
            <label htmlFor="note-title">Title</label>
          <input type="text" name="note-tilte" id="note-title" />
          <p>audio</p>
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}
