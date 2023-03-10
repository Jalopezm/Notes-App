import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUploadForm from "../FileUploadForm.js";
import NewAudioNote from "./NewAudioNote.jsx";

export default function NewNote({ noteType }) {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [noteId, setNoteId] = useState(note.id);
  let checkbox = document.getElementById("public");

  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const jwt = setInterval(() => {
      const token = localStorage.getItem("jwt");
      const tokenExp = localStorage.getItem("jwtExp");
      setIsPublic(checkbox.checked);
      if (!token || token === "" || new Date(tokenExp) <= new Date()) {
        localStorage.setItem("jwtExp", "");
        localStorage.setItem("jwt", "");
        window.alert("No Loggued User Or Your Session Expired LogIn Again");
        return navigate("/login");
      }
    }, 1000);
    return () => {
      clearInterval(jwt);
    };
  }, [navigate, checkbox]);

  const handleSubmit = async (event) => {
    console.log(isPublic);
    event.preventDefault();
    const data = {
      title: title,
      body: note,
      isPublic: isPublic,
      isVoiceNote: noteType !== "text",
    };
    console.log("json" + JSON.stringify(data));
    setIsLoading(true)
    await fetch("http://localhost:8081/notes", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.id);
        console.log("Success:", data);
        setNoteId(data.id);
      });
  };
  function audioUpload(noteId, blob ) {
    const formData = new FormData();
    formData.append("file", blob);
    setIsLoading(true)
    fetch(`http://localhost:8081/notes/${noteId}/files`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
  }

  if (noteType === "text") {
    return (
      <>
        <h1 className="note-title">New Text Note</h1>
        <div className="text-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="note-title">Title</label>
            <br />
            <input
              type="text"
              name="note-tilte"
              id="note-title"
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <br />
            <label htmlFor="text-note">Note Cotent</label>
            <br />
            <textarea
              name="text-note"
              id="text-note"
              onChange={(event) => setNote(event.target.value)}
              required
            ></textarea>
            <br />
            <br />
            <input type="checkbox" name="isPublic" id="public" />
            Is Public
            <br />
            <input type="submit" value="Send" />
          </form>
          {noteId && <FileUploadForm noteId={noteId} />}
        </div>
        {isLoading&& <p>Loading...</p>}
      </>
    );
  } else {
    return (
      <>
        <h1 className="note-title">New Audio Note</h1>
        <div className="text-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="note-title">Title</label>
            <input
              type="text"
              name="note-tilte"
              id="note-title"
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <input type="checkbox" name="isPublic" id="public" />
            Is Public
            <br />
            <input type="submit" value="Send" />
          </form>
          {noteId && (
            <NewAudioNote
              onLoaded={(audio) => {
                audioUpload(noteId, audio);
              }}
            />
          )}
        </div>
        {isLoading&& <p>Loading...</p>}

      </>
    );
  }
}
