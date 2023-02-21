import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewNote() {
  const token = localStorage.getItem("jwt");
  const [src, setSrc] = useState("");
  const [type, setType] = useState("");

  const { id } = useParams();
  const [note, setNote] = useState({});

  useEffect(()=>{
    getNote()
  },[])

  async function getNote() {
    await fetch(`http://localhost:8081/notes/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setNote(data);
        getFile();
      });
  }
  async function getFile() {
    await fetch(`http://localhost:8081/notes/${id}/files`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        getImg(data[0].uri);
        console.log(data[0].uri)
      });
  }
  async function getImg(uri) {
    await fetch(`http://localhost:8081${uri}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.blob();
      })
      .then((data) => {
        console.log(data);
        setType(data.type);
        setSrc(URL.createObjectURL(data));
      });
  }
  async function updateNote() {
    const data = {
      title: note.title,
      body: note.body,
      isPublic: note.isPublic,
      isVoiceNote: note.isVoiceNote,
    };
    await fetch(`http://localhost:8081/notes/${note.id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      });
  }
  if(!note.isVoiceNote){
  return (
    <>
        <div className="note-body">
        <form onSubmit={updateNote}>
            <label htmlFor="note-title">Title</label>
            <br />
            <input
              type="text"
              name="note-tilte"
              id="note-title"
              value={note.title}
              onChange={(event) => setNote({ ...note, title: event.target.value })}
              required
            />
            <br />
            <label htmlFor="text-note">Note Cotent</label>
            <br />
            <textarea
              name="text-note"
              id="text-note"
              value={note.body}
              onChange={(event) => setNote({ ...note, body: event.target.value })}
              required
            ></textarea>
            <br />
            <br />
            <input type="submit" value="Send" />
          </form>
        </div>
        <div className="img">
          <img alt="img" src={`${src}`} ></img>
        </div>
    </>
  );
  }else{
    return(
      <>
      <div className="note-body">
      <form onSubmit={updateNote}>
            <label htmlFor="note-title">Title</label>
            <br />
            <input
              type="text"
              name="note-tilte"
              id="note-title"
              value={note.title}
              onChange={(event) => setNote({ ...note, title: event.target.value })}
              required
            />
            <br />
            <label htmlFor="text-note">Note Cotent</label>
            <br />
            <textarea
              name="text-note"
              id="text-note"
              value={note.body}
              onChange={(event) => setNote({ ...note, body: event.target.value })}
              required
            ></textarea>
            <br />
            <br />
            <input type="submit" value="Send" />
          </form>
        </div>
        <div className="img">
          <audio src={`${src}`}></audio>
        </div>
      </>
    )
  }
}
