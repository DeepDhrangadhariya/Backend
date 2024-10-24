import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/admin/addAdmin" className="navbar-link">Add Admin</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/viewAdmin" className="navbar-link">View Admin</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/addManager" className="navbar-link">Add Manager</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/viewManager" className="navbar-link">View Manager</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/viewEmployee" className="navbar-link">View Employee</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/changePassword" className="navbar-link">Change Password</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/forgotPassword" className="navbar-link">Forgot Password</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/checkOtp" className="navbar-link">Check OTP</Link>
        </li>
        <li className="navbar-item logout"> {/* Logout button aligned to the right */}
          <Link to="/" className="navbar-link">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
