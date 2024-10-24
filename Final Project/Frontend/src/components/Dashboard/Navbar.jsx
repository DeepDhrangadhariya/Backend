import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/admin" className="navbar-link">Admin</Link>
        </li>
        <li className="navbar-item">
          <Link to="/manager" className="navbar-link">Manager</Link>
        </li>
        <li className="navbar-item">
          <Link to="/employee" className="navbar-link">Employee</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
