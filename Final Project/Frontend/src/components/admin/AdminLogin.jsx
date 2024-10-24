import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './AdminLogin.css'; // Optional: Include your CSS for styling
import Header from '../Dashboard/Header';
import Navbar from '../Dashboard/Navbar';
import axios from 'axios';

const AdminLogin = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate(); 
  // const [credentials, setCredentials] = useState({
  //   usernameOrEmail: '',
  //   password: '',
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setData(data)
      console.log(data)
      const response = await axios.post('http://localhost:1024/admin/loginAdmin', data)
      console.log(response)
      const token = localStorage.setItem('adminToken', response.data.token);
      if (token) {
        navigate("/admin/viewAdmin")
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(()=> {
  //   handleSubmit()
  // },[])

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setUsername(credentials.usernameOrEmail)
  //   setPassword(credentials.password)
   
  //   // Implement login functionality here
  //   try {
  //     setData(data)
  //     console.log(data)
  //     const response = await axios.post(`http://localhost:1024/admin/loginAdmin`, data);

  //     console.log(username)
  //     console.log(password)

      
  //     if (response.ok) {
  //       localStorage.setItem('adminToken', response.data.token);
  //       Handle successful login (e.g., redirecting to dashboard)

  //       navigate('/admin/viewAdmin'); 
  //     } else {
  //       Handle login error (e.g., show error message)
  //       const errorData = await response.json();
  //       alert(errorData.message || 'Login failed. Please try again.'); 
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     alert('An error occurred. Please try again later.');
  //   }
  // };

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
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={data.password}
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
