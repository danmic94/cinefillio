import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav
      className="navbar sticky-top navbar-light"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <Link to={process.env.PUBLIC_URL + "/"} className="navbar-brand">
        <h4>Cinefillio</h4>
      </Link>
      <Link to={process.env.PUBLIC_URL + "/favourites"} className="nav-link">
        Favourites
      </Link>
    </nav>
  );
}

export default NavBar;
