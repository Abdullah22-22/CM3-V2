import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Vehicle Rental</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-rental">Add Rental</Link>
         <Link to="/login">Login</Link>
         <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
