import { NavLink } from "react-router-dom";
//import SearchBox from "./../common/searchBox";

const NavBar=({user})=> {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/profile">{user.id}</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto"> 
          <NavLink className="nav-item nav-link" to="home">Books</NavLink>
          <NavLink className="nav-item nav-link" to="/publishers">Publishers</NavLink>
          <NavLink className="nav-item nav-link" to="/users">Users</NavLink>
          <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;