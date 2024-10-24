import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/manager/viewManager" className="navbar-link">View Manager</Link>
        </li>
        <li className="navbar-item">
          <Link to="/manager/addEmployee" className="navbar-link">Add Employee</Link>
        </li>
        <li className="navbar-item">
          <Link to="/manager/viewEmployee" className="navbar-link">View Employee</Link>
        </li>
        <li className="navbar-item">
          <Link to="/manager/changePassword" className="navbar-link">Change Password</Link>
        </li>
        <li className="navbar-item">
          <Link to="/manager/forgotPassword" className="navbar-link">Forgot Password</Link>
        </li>
        <li className="navbar-item">
          <Link to="/manager/checkOtp" className="navbar-link">Check OTP</Link>
        </li>
        <li className="navbar-item logout"> {/* Logout button aligned to the right */}
          <Link to="/" className="navbar-link">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
