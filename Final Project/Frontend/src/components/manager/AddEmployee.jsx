import React, { useState } from 'react';
import './AddEmployee.css';
import Header from './Header';
import Navbar from './Navbar';

function AddEmployee() {

    const [employeeDetails, setEmployeeDetails] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        image: null,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeDetails({
          ...employeeDetails,
          [name]: value,
        });
      };
    
      const handleFileChange = (e) => {
        setEmployeeDetails({
          ...employeeDetails,
          image: e.target.files[0],
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., API call to add the admin)
        console.log(employeeDetails);
        // Reset the form after submission if needed
        setEmployeeDetails({
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
            value={employeeDetails.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={employeeDetails.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employeeDetails.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={employeeDetails.password}
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

export default AddEmployee
