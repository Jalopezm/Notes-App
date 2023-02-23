import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListNotes() {
  let navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [notes, setNotes] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [findBody, setFindBody] = useState("");
  const [findTitle, setFindTitle] = useState("");
  const [findType, setFindType] = useState("");

  useEffect(() => {
    let setTimes = [];
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
          console.log("ARRAY" + data);
          let filterByTitle = data.filter((note) =>
            note.title.toUpperCase().includes(findTitle.toUpperCase())
          );
          console.log(filterByTitle);
          let filterByBody = filterByTitle.filter((note) =>
            note.body.toUpperCase().includes(findBody.toUpperCase())
          );
          console.log(filterByBody);

          let filterByType = filterByBody.filter((note) => {
            if (findType !== "") {
              return findType !== "Audio"
                ? !note.isVoiceNote
                : note.isVoiceNote;
            } else {
              return filterByBody;
            }
          });
          for (let i = 0; i < filterByType.length; i++) {
            setTimes.push(formatTime(filterByType[i]));
          }

          setNotes(sortNotesBy(filterByType, sortBy));
        });
    }

    getNote();
  }, [token, findBody, findTitle, findType, sortBy]);

  const formatTime = (data) => {
    data.createdAt = new Date(data.createdAt).getTime()
    data.modifiedAt = new Date(data.modifiedAt).getTime()
  };

  const sortNotesBy = (data, key) => {
    switch (key) {
      case "title":
        data.sort(function (a, b) {
          let titleA = a.title.toUpperCase();
          let titleB = b.title.toUpperCase();
          return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
        });
        break;

      default:
        data.sort(function (a, b) {
          return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
        });
        break;
    }
    return data;
  };
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
      <label htmlFor="sortBy">Sort by: </label>
      <select
        name="sortBy"
        id="select_sortBy"
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="title">Title</option>
        <option value="createdAt">Creation Date</option>
        <option value="modifiedAt">Last Update</option>
      </select>

      <label htmlFor="findType">Find By Type:</label>
      <select
        name="findType"
        id="select_type"
        onChange={(e) => setFindType(e.target.value)}
      >
        <option value="">Find By Type</option>
        <option value="Text">Text</option>
        <option value="Audio">Audio</option>
      </select>

      <label htmlFor="findTitle">Find By Title:</label>
      <input
        type="text"
        name="findTitle"
        onChange={(e) => setFindTitle(e.target.value)}
      />

      <label htmlFor="findBody">Find By Content:</label>
      <input
        type="text"
        name="findBody"
        onChange={(e) => setFindBody(e.target.value)}
      />
      <table className="note_table">
        <thead>
          <tr>
            <th className="table_header">UserId</th>
            <th className="table_header">Title</th>
            <th className="table_header">Created At Hour</th>
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
              <td className="table_data">
                {new Date(note.createdAt).toLocaleTimeString()}
              </td>
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
                <button
                  onClick={(e) => navigate("/notes/" + note.id + "/edit")}
                >
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
