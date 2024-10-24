import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditEmployee.css';
import Header from './Header';
import Navbar from './Navbar';

function EditEmployee() {
    const { id } = useParams(); // Get employee ID from URL parameters
    const navigate = useNavigate() // For navigation
    const [employee, setEmployee] = useState({
      username: '',
      email: '',
      phone: '',
      image: null, // Change to null to hold image file
    });
  
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
  
    useEffect(() => {
      // Fetch employee data from API (using mock data for this example)
      const fetchEmployee = async () => {
        // Simulating an API call
        const mockEmployee = {
          id,
          username: 'employee1',
          email: 'employee1@example.com',
          phone: '123-456-7890',
          image: 'https://via.placeholder.com/150', // Placeholder image
        };
        setEmployee(mockEmployee);
        setImagePreview(mockEmployee.image); // Set initial image preview
      };
  
      fetchEmployee();
    }, [id]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: value,
      }));
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result); // Set image preview
          setEmployee((prevEmployee) => ({
            ...prevEmployee,
            image: file, // Store file for upload
          }));
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Implement the update functionality here (e.g., API call to update employee)
      console.log('Updated Employee:', employee);
      // Redirect back to the view employee page after saving
      navigate('/view-employee'); // Adjust the route as necessary
    };
  
    return (
      <>
      <Header/>
      <Navbar/>
      
      <div className="edit-admin-container">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={employee.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Profile Image</label>
            <input
              type="file"
              accept="image/*" // Accept only images
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Admin" />
              </div>
            )}
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
      </>
    );
  };

export default EditEmployee
