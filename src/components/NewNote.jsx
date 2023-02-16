import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewAudioNote from "./getAudio.jsx";
import ListNotes from "./ListNotes.jsx";

export default function NewNote({ noteType }) {
  let navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  // const [file, setFile] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isVoiceNote, setIsVoiceNote] = useState(false);

  useEffect(() => {
    if (!token || token === "") {
      console.log("adios");
      return navigate("/");
    }
    setIsPublic(false);
    
    if (noteType === "text") {
      setIsVoiceNote(false);
    } else {
      setIsVoiceNote(true);
    }
  }, [token, navigate, title, noteType]);

  function logout() {
    localStorage.setItem("jwt", "");
    return navigate("/");
  }
  // function fileToBlob(file) {
  //   const blob = URL.createObjectURL(file);
  //   console.log(blob);
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      "title": title,
      "body": note,
      "isPublic": isPublic,
      "isVoiceNote": isVoiceNote
    };
    console.log("json"+JSON.stringify(data))
    await fetch("http://localhost:8081/notes", {
      method: "POST",
      headers: {
        "Authorization":"Bearer " + token,
        "Content-Type":"application/json",
      },
      body: JSON.stringify(data)
    })
      .then((data) => {
        console.log("Success:", data);
      });
  };

  if (noteType === "text") {
    return (
      <>
        <h1 className="note-title">New Text Note</h1>
        <button onClick={logout}>LogOut</button>
        <div className="text-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="note-title">Title</label>
            <br />
            <input
              type="text"
              name="note-tilte"
              id="note-title"
              onChange={(event) => setTitle(event.target.value)}
            />
            <br />
            <label htmlFor="text-note">Note Cotent</label>
            <br />
            <textarea
              name="text-note"
              id="text-note"
              onChange={(event) => setNote(event.target.value)}
            ></textarea>
            <br />
            {/* <input
              type="file"
              name="img"
              id="img"
              accept="image/*"
              onChange={(event) => setFile(fileToBlob(event.target.value))}
            /> */}
            <br />
            <input type="submit" value="Send" />
          </form>
        </div>
        <ListNotes/>
      </>
    );
  } else {
    return (
      <div>
        <h1 className="note-title">New Audio Note</h1>
        <div className="text-form">
          <form action="/note" method="post">
            <label htmlFor="note-title">Title</label>
            <input type="text" name="note-tilte" id="note-title" />
            <input type="submit" value="Send" />
          </form>
          <NewAudioNote />
        </div>
        <ListNotes/>
      </div>
    );
  }
}
