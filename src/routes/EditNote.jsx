import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FileUploadForm from "../FileUploadForm";
import NewAudioNote from "../components/NewAudioNote";

export default function EditNote() {
  const token = localStorage.getItem("jwt");
  const [src, setSrc] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [fileId, setFileId] = useState({});
  useEffect(() => {
    getNote();
  }, []);

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
        console.log(data[0].uri.split('/')[4]);
        setFileId(data[0].uri.split('/')[4])
        getContent(data[0].uri);
        console.log(data[0].uri);
      });
  }
  async function getContent(uri) {
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
        setSrc(URL.createObjectURL(data));
      });
  }
  const updateNote = async (event) => {
    event.preventDefault();
    const data = {
      title: note.title,
      body: note.body,
      isPublic: note.isPublic,
      isVoiceNote: note.isVoiceNote,
    };
    console.log("json" + JSON.stringify(data));
    await fetch(`http://localhost:8081/notes/${id}`, {
      method: "PUT",
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
        console.log("Success:", data);
      });
  };
  function isUpdatingSet() {
    setIsUpdating(true);
  }
  function audioUpload(noteId, blob) {
    fetch(`http://localhost:8081/notes/${noteId}/files/${fileId}`, {
      method: "DELETE",
      body: blob,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const formData = new FormData();
    formData.append("file", blob);
    console.log("Updating Audio")
    fetch(`http://localhost:8081/notes/${noteId}/files`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
  }
  if (!note.isVoiceNote) {
    return (
      <>
        <button onClick={isUpdatingSet}>Update Image</button>
        <div className="note-body">
          <form onSubmit={updateNote}>
            <label htmlFor="note-title">Title</label>
            <br />
            <input
              type="text"
              name="note-tilte"
              id="note-title"
              value={note.title}
              onChange={(event) =>
                setNote({ ...note, title: event.target.value })
              }
              required
            />
            <br />
            <label htmlFor="text-note">Note Cotent</label>
            <br />
            <textarea
              name="text-note"
              id="text-note"
              value={note.body}
              onChange={(event) =>
                setNote({ ...note, body: event.target.value })
              }
              required
            ></textarea>
            <br />
            <br />
            <input type="submit" value="Send" />
          </form>
        </div>

        {isUpdating && <FileUploadForm noteId={id} />}

        {!isUpdating && (
          <div className="img">
            <img alt="img" src={src}></img>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <button onClick={isUpdatingSet}>Update Audio</button>
        <div className="note-body">
          <form onSubmit={updateNote}>
            <label htmlFor="note-title">Title</label>
            <br />
            <input
              type="text"
              name="note-tilte"
              id="note-title"
              value={note.title}
              onChange={(event) =>
                setNote({ ...note, title: event.target.value })
              }
              required
            />
            <br />
            <br />
            <input type="submit" value="Send" />
          </form>
        </div>
        {!isUpdating && (
          <div className="img">
            <audio src={src} controls></audio>
          </div>
        )}
        {isUpdating && (
          <NewAudioNote
            onLoaded={(audio) => {
              audioUpload(id, audio);
            }}
          />
        )}
      </>
    );
  }
}
