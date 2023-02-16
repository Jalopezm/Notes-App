import NewNote from "../components/NewNote";
import { useState, useEffect } from "react";

export default function Notes() {
  const [noteType, setNoteType] = useState("text");
  useEffect(() => {
    document.body.classList.add("note");
    return () => {
      document.body.classList.remove("note");
    };
  }, []);
  return (
    <>
      <div className="note-select">
        <label htmlFor="note-type">Select Your Note Type: </label>
        <select
          id="note-type"
          value={noteType}
          onChange={(e) => setNoteType(e.target.value)}
        >
          <option value="text">Text Note</option>
          <option value="audio">Audio Note</option>
        </select>
      </div>
      <NewNote noteType={noteType} />
    </>
  );
}
