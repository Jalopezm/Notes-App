import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserUpdate(){
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { oldPassword:oldPassword, newPassword:newPassword };

        await fetch("http://localhost:8081/changepassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(() => {
                return navigate("/notes");
            });
    }
    return(
        <>
        <form onSubmit={handleSubmit} className="signup-form">
            <label htmlFor="oldPass">Old Password</label>
            <input type="password" name="oldPass" id="oldPass" onChange={(event) => setOldPassword(event.target.value)} required/>
            <label htmlFor="newPass">New Password</label>
            <input type="password" name="newPass" id="newPass" onChange={(event) => setNewPassword(event.target.value)} required/>
            <input type="submit" value="Send" />
        </form>
        </>
    );
}