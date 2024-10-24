import React, { useState } from 'react';
import './AddManager.css';
import Header from './Header';
import Navbar from './Navbar';

function AddManager() {

    const [managerDetails, setManagerDetails] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        image: null,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setManagerDetails({
          ...managerDetails,
          [name]: value,
        });
      };
    
      const handleFileChange = (e) => {
        setManagerDetails({
          ...managerDetails,
          image: e.target.files[0],
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., API call to add the admin)
        console.log(managerDetails);
        // Reset the form after submission if needed
        setManagerDetails({
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
      <h2>Add Manager</h2>
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
            value={managerDetails.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={managerDetails.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={managerDetails.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={managerDetails.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Admin</button>
      </form>
    </div>
    </>
  )
}

export default AddManager
