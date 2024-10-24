import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/employee/viewEmployee" className="navbar-link">View Employee</Link>
        </li>
        <li className="navbar-item">
          <Link to="/employee/changePassword" className="navbar-link">Change Password</Link>
        </li>
        <li className="navbar-item">
          <Link to="/employee/forgotPassword" className="navbar-link">Forgot Password</Link>
        </li>
        <li className="navbar-item">
          <Link to="/employee/checkOtp" className="navbar-link">Check OTP</Link>
        </li>
        <li className="navbar-item logout"> {/* Logout button aligned to the right */}
          <Link to="/" className="navbar-link">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
