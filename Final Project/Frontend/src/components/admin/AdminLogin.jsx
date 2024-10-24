import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './AdminLogin.css'; // Optional: Include your CSS for styling
import Header from '../Dashboard/Header';
import Navbar from '../Dashboard/Navbar';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate(); // For navigation after successful login
  const [credentials, setCredentials] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsername(credentials.usernameOrEmail)
    setPassword(credentials.password)
   
    // Implement login functionality here
    try {
      setData(data)
      console.log(data)
      const response = await axios.post(`http://localhost:1024/admin/loginAdmin`, data);

      console.log(username)
      console.log(password)

      
      if (response.ok) {
        localStorage.setItem('adminToken', response.data.token);
        // Handle successful login (e.g., redirecting to dashboard)

        navigate('/admin/viewAdmin'); // Redirect to the admin view page
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
    <div>
      
    <Header/>
    <Navbar/>

    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username or Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default AdminLogin;
