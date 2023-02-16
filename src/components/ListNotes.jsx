import { useState } from "react";

export default function ListNotes() {
  const token = localStorage.getItem("jwt");
  const [notes, setNotes] = useState([]);
  const noteList = [];
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

        for (let i = 0; i < data.length; i++) {
          let noteData = data[i];

          noteList.push(noteData.title);
        }
        setNotes(noteList);
        console.log("noteList:" + noteList+",");
      }
    });

  return (
    <>
      <ul>
       
      </ul>
    </>
  );
}
