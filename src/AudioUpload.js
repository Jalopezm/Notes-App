const baseUrl = "http://localhost:8081";

export default function audioUpload({ noteId, blob }) {
    const formData = new FormData();
    formData.append("audio", blob);
    fetch(`${baseUrl}/notes/${noteId}/files`, {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    });
}