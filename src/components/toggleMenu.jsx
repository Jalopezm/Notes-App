import React, { useState, useEffect } from 'react';

function ToggleMenu() {
  const [menu, setMenu] = useState(null);
  const [closeIcon, setCloseIcon] = useState(null);
  const [menuIcon, setMenuIcon] = useState(null);

  useEffect(() => {
    setMenu(document.querySelector(".menu"));
    setCloseIcon(document.querySelector(".closeIcon"));
    setMenuIcon(document.querySelector(".menuIcon"));
  }, []);

  function handleToggleMenu() {
    if (menu.classList.contains("showMenu")) {
      menu.classList.remove("showMenu");
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
    } else {
      menu.classList.add("showMenu");
      closeIcon.style.setProperty("display", "block", "important");
      menuIcon.style.display = "none";
    }
  }

  return (
    <button className="hamburger" onClick={handleToggleMenu}>
      <i className="menuIcon material-icons">menu</i>
      <i className="closeIcon material-icons">close</i>
    </button>
  );
}

export default ToggleMenu;
