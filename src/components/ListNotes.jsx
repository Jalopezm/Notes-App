import { useState } from "react";

export default function ListNotes() {
  const token = localStorage.getItem("jwt");
  const [notes, setNotes] = useState([]);
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
                <button>Delete</button>
              </td>
              <td className="table_update">
                <button>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
