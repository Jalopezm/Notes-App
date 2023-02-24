import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserUpdate(){
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { oldPassword, newPassword };

        await fetch("http://localhost:8081/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("jwtExp",data.expiration)
                
                console.log(data)
                return navigate("/notes");
            })
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