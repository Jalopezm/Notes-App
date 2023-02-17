import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUploadForm from "../FileUploadForm.js";
import NewAudioNote from "./getAudio.jsx";

export default function NewNote({ noteType }) {
  let navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [blob, setBlob] = useState(null);
  const [noteId, setNoteId] = useState(0);
  const [notes, setNotes] = useState([]);
  // const [file, setFile] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      const token = localStorage.getItem("jwt");
      const tokenExp = localStorage.getItem("jwtExp");
      if (!token || token === "" || new Date(tokenExp) <= new Date()) {
        localStorage.setItem("jwtExp", "");
        localStorage.setItem("jwt", "");
        window.alert("No Loggued User Or Your Session Expired LogIn Again");
        return navigate("/login");
      }
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [navigate]);

  // function fileToBlob(file) {
  //   const blob = URL.createObjectURL(file);
  //   console.log(blob);
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title: title,
      body: note,
      isPublic: isPublic,
      isVoiceNote: noteType !== "text",
    };
    console.log("json" + JSON.stringify(data));
    await fetch("http://localhost:8081/notes", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      return response.json();
    }).then((data) => {
      setNoteId(data.id)
      console.log("Success:", data);
      
    });
  };

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
            <input type="submit" value="Send" />
          </form>
          <FileUploadForm noteid = {noteId} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1 className="note-title">New Audio Note</h1>
        <div className="text-form">
          <form action="/note" method="post">
            <label htmlFor="note-title">Title</label>
            <input
              type="text"
              name="note-tilte"
              id="note-title"
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <input type="submit" value="Send" />
          </form>
          <NewAudioNote onLoaded={(audio) => setBlob(audio)} />
        </div>
      </>
    );
  }
}
