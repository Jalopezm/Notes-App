import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewNote() {
  const token = localStorage.getItem("jwt");
  const [src, setSrc] = useState("");

  const { id } = useParams();
  const [note, setNote] = useState({});

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
        getImg(data[0].uri);
        console.log(data[0].uri);
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
        setSrc(URL.createObjectURL(data));
      });
  }
  if (!note.isVoiceNote) {
    return (
      <>
        <div className="note-body">
          <h1>{note.title}</h1>
          <p>{note.body}</p>
        </div>
        <div className="img">
          <img alt="img" src={`${src}`}></img>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="note-body">
          <h1>{note.title}</h1>
          <p>{note.body}</p>
        </div>
        <div className="img">
          <audio src={`${src}`} controls></audio>
        </div>
      </>
    );
  }
}
