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
    image: '',
  });

  const handleChange = (e) => {
    const {files, name, value } = e.target;
    

    if(name === 'image'){
      setAdminDetails((prevstate)=>({
        ...prevstate,
        [name]: files[0]
      }))
    }else{
      setAdminDetails((prevstate)=>({
        ...prevstate,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append('username', adminDetails.username);
    // formData.append('email', adminDetails.email);
    // formData.append('phone', adminDetails.phone);
    // formData.append('password', adminDetails.password);
    // formData.append('image', adminDetails.image);

    const token = localStorage.getItem('adminToken'); // Ensure you're sending the token
      const response = await axios.post(`http://localhost:1024/admin/addAdmin`, adminDetails, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    
      console.log(response)

    // Handle form submission (e.g., API call to add the admin)
    console.log(adminDetails);
    // Reset the form after submission if needed
    setAdminDetails({
      username: '',
      email: '',
      phone: '',
      password: '',
      image: '',
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
            onChange={handleChange}
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
