import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListNotes from "../components/ListNotes";

export default function UserInfo() {
  let navigate = useNavigate();
  useEffect(() => {
    const id = setInterval(() => {
      const token = localStorage.getItem("jwt");
      const tokenExp = localStorage.getItem("jwtExp");
      if (!token || token === "" || new Date(tokenExp) <= new Date()) {
        localStorage.setItem("jwtExp", "");
        localStorage.setItem("jwt", "");
        window.alert("No Loggued User Or Your Session Expired LogIn Again");
        return navigate("/login");
      }
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [navigate]);

  function logout() {
    localStorage.setItem("jwt", "");
    localStorage.setItem("jwtExp", "");
    return navigate("/");
  }
  return (
    <>
      <button onClick={logout}>LogOut</button>
      <div className="note-table" >
        <ListNotes />
      </div>
    </>
  );
}
