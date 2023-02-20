import React, { useState } from "react";

const baseUrl = "http://localhost:8081";

export default function FileUploadForm({ noteId }) {
    const [file, setFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            await uploadFile(noteId, file);
        }
    };

    return (
        <>
            <div className="file-form">
                <form onSubmit={handleSubmit}>
                    <br />
                    <label htmlFor="fileInput">File:</label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={(event) => setFile(event.target.files[0])}
                    />
                    <input type="submit" value="Upload File" />
                </form>
            </div>
        </>
    );
}
const uploadFile = async (noteId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${baseUrl}/notes/${noteId}/files`, {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    });
    return await response.json();
};