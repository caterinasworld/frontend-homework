import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const getLinkClass = ({ isActive }) => (
    isActive ? 'nav-link active' : 'nav-link'
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/home">
          South America Explorer
        </NavLink>

        <div className="navbar-nav ms-auto">
          <NavLink className={getLinkClass} to="/home">
            Home
          </NavLink>

          <NavLink className={getLinkClass} to="/list">
            Countries
          </NavLink>

          <NavLink className={getLinkClass} to="/population">
            Population
          </NavLink>

          <NavLink className={getLinkClass} to="/languages">
            Languages
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
