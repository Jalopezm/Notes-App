import { Link, Outlet } from "react-router-dom";
import ToggleMenu from "../assets/js/toggleMenu";

export default function Root() {
  return (
    <>
      <ToggleMenu />
      <nav className="menu" >
        <ul>
          <li className="menuItem">
            <Link to="/">Homepage</Link>
          </li>
          <li className="menuItem">
            <Link to="/login">Login</Link>
          </li>
          <li className="menuItem">
            <Link to="/signup">SignUp</Link>
          </li>
          <li className="menuItem">
            <Link to="/notes">Notes</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}