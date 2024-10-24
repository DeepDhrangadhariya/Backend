import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './ManagerLogin.css';
import Header from '../Dashboard/Header';
import Navbar from '../Dashboard/Navbar';

function ManagerLogin() {
    const navigate = useNavigate(); // For navigation after successful login
    const [credentials, setCredentials] = useState({
      usernameOrEmail: '',
      password: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCredentials((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Implement login functionality here
      try {
        const response = await fetch('YOUR_API_ENDPOINT/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
  
        if (response.ok) {
          // Handle successful login (e.g., redirecting to dashboard)
          navigate('/view-manager'); // Redirect to the admin view page
        } else {
          // Handle login error (e.g., show error message)
          const errorData = await response.json();
          alert(errorData.message || 'Login failed. Please try again.'); // Display error message
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred. Please try again later.');
      }
    };
  
    return (
      <>
      <Header/>
      <Navbar/>
      <div className="admin-login-container">
        <h2>Manager Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username or Email</label>
            <input
              type="text"
              name="usernameOrEmail"
              value={credentials.usernameOrEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      </>
    );
  };

export default ManagerLogin
