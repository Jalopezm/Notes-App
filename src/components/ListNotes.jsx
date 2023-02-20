import { useState } from "react";

export default function ListNotes() {
  const token = localStorage.getItem("jwt");
  const [notes, setNotes] = useState([]);
  const [uri, setUri] = useState("");
  const [file, setFile] = useState();
  fetch("http://localhost:8081/notes", {
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
      if (notes.length !== data.length) {
        console.log(data);
        setNotes(data);
      }
    });
  async function deleteNote(id) {
    await fetch(`http://localhost:8081/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });
  }
  async function getNote(id) {
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
        setUri(data[0].uri);
        console.log(data[0].uri);
        getFile();
      });
  }
  async function getFile() {
    await fetch(`http://localhost:8081/notes/5/files/5`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }).then((data) => {
      setFile(data);
    });
  }
  return (
    <>
      <table className="note_table">
        <thead>
          <tr>
            <th className="table_header">UserId</th>
            <th className="table_header">Title</th>
            <th className="table_header">Note Text</th>
            <th className="table_header">Created At Date</th>
            <th className="table_header">Created At Hour</th>
            <th className="table_header">Modified At Date</th>
            <th className="table_header">Modified At Hour</th>
            <th className="table_header">Delete</th>
            <th className="table_header">Update</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={index}>
              <td className="table_data">{note.userId}</td>
              <td className="table_data">{note.title}</td>
              <td className="table_data">{note.body}</td>
              <td className="table_data">{note.createdAt.slice(0, 10)}</td>
              <td className="table_data">{note.createdAt.slice(11, 19)}</td>
              <td className="table_data">{note.modifiedAt.slice(0, 10)}</td>
              <td className="table_data">{note.modifiedAt.slice(11, 19)}</td>
              <td className="table_delete">
                <button onClick={(e) => deleteNote(note.id)}>Delete</button>
              </td>
              <td className="table_update">
                <button onClick={(e) => getNote(note.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <img src={`http://localhost:8081/notes/6/files/6`} alt="" />
    </>
  );
}
