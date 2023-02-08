import React, { useEffect,useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import ToggleMenu from "../assets/js/toggleMenu";

export default function Root() {
  const [menu, setMenu] = useState(null);
  const [closeIcon, setCloseIcon] = useState(null);
  const [menuIcon, setMenuIcon] = useState(null);
  useEffect(()=>{
    setMenu(document.querySelector(".menu"));
    setCloseIcon(document.querySelector(".closeIcon"));
    setMenuIcon(document.querySelector(".menuIcon"));
  },[]);
  function hideNav(){
    if (menu.classList.contains("showMenu")) {
      menu.classList.remove("showMenu");
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
    }
  }
  return (
    <>
      <ToggleMenu />
      <nav className="menu" >
        <ul>
          <li className="menuItem">
            <Link to="/" onClick={hideNav}>Homepage</Link>
          </li>
          <li className="menuItem">
            <Link to="/login" onClick={hideNav}>Login</Link>
          </li>
          <li className="menuItem">
            <Link to="/signup" onClick={hideNav}>SignUp</Link>
          </li>
          <li className="menuItem">
            <Link to="/notes" onClick={hideNav}>Notes</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}