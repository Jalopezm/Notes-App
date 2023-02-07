import NewNote from "../assets/js/NewNote";
import { useState } from "react";


export default function Notes() {
    const [noteType, setNoteType] = useState("text");
    return (
        <div>
            <h1>Notes App</h1>
            <label htmlFor="note-type">Select Your Note Type: </label>
            <select
                id="note-type"
                value={noteType}
                onChange={(e) => setNoteType(e.target.value)}
            >
                <option value="text">Text Note</option>
                <option value="audio">Audio Note</option>
            </select>
            <NewNote noteType={noteType}/>
        </div>
    );
}
