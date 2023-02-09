export default function NewNote({ noteType }) {
  if (noteType === "text") {
    return (
      <>
        <h1 className="note-title">New Text Note</h1>
        <div className="text-form">
          <form action="/textNote" method="post">
            <label htmlFor="note-title">Title</label>
            <br />
            <input type="text" name="note-tilte" id="note-title" />
            <br />
            <label htmlFor="text-note">Note Cotent</label>
            <br />
            <textarea name="text-note" id="text-note"></textarea>
            <br />
            <input type="file" name="img" id="img" accept="image/*" />
            <br />
            <input type="submit" value="Send" />
          </form>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <h1 className="note-title">New Audio Note</h1>
        <div className="text-form">
          <form action="/audioNote" method="post">
            <label htmlFor="note-title">Title</label>
            <input type="text" name="note-tilte" id="note-title" />
            <p>audio</p>
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    );
  }
}
