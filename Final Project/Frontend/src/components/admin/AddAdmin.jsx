import React, { useState } from 'react';
import './AddAdmin.css';
import Header from './Header';
import Navbar from './Navbar';
import axios from 'axios';

const AddAdmin = () => {
  const [adminDetails, setAdminDetails] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({
      ...adminDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setAdminDetails({
      ...adminDetails,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', adminDetails.username);
    formData.append('email', adminDetails.email);
    formData.append('phone', adminDetails.phone);
    formData.append('password', adminDetails.password);
    formData.append('image', adminDetails.image); // image file

    const token = localStorage.getItem('adminToken'); // Ensure you're sending the token
      const response = await axios.post(`http://localhost:1024/admin/addAdmin`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

    // Handle form submission (e.g., API call to add the admin)
    console.log(adminDetails);
    // Reset the form after submission if needed
    setAdminDetails({
      username: '',
      email: '',
      phone: '',
      password: '',
      image: null,
    });
  };

  return (
    <>
    <Header/>
    <Navbar/>

    <div className="add-admin-container">
      <h2>Add Admin</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Profile Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={adminDetails.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={adminDetails.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={adminDetails.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={adminDetails.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Admin</button>
      </form>
    </div>
    </>

  );
};

export default AddAdmin;
