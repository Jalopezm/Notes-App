import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListNotes() {
  let navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getNote() {
      await fetch("http://localhost:8081/notes", {
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
          setNotes(data);
        });
    }

    getNote();
  }, [token]);

  async function deleteNote(id) {
    const response = await fetch(`http://localhost:8081/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });
    if (response.status === 204) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  }

  return (
    <>
      <table className="note_table">
        <thead>
          <tr>
            <th className="table_header">UserId</th>
            <th className="table_header">Title</th>
            <th className="table_header">Created At Date</th>
            <th className="table_header">Created At Hour</th>
            <th className="table_header">Modified At Date</th>
            <th className="table_header">Modified At Hour</th>
            <th className="table_header">View Note</th>
            <th className="table_header">Delete</th>
            <th className="table_header">Update</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={index}>
              <td className="table_data">{note.userId}</td>
              <td className="table_data">{note.title}</td>
              <td className="table_data">{note.createdAt.slice(0, 10)}</td>
              <td className="table_data">
                {new Date(note.createdAt).toLocaleTimeString()}
              </td>
              <td className="table_data">{note.modifiedAt.slice(0, 10)}</td>
              <td className="table_data">
                {new Date(note.modifiedAt).toLocaleTimeString()}
              </td>
              <td className="table_view">
                <button onClick={(e) => navigate("/notes/" + note.id)}>
                  Open
                </button>
              </td>
              <td className="table_delete">
                <button onClick={(e) => deleteNote(note.id)}>Delete</button>
              </td>
              <td className="table_update">
                <button onClick={(e) => navigate("/notes/" + note.id)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
