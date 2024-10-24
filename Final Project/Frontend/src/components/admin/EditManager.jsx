import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditManager.css'
import Header from './Header';
import Navbar from './Navbar';

function EditManager() {
    const { id } = useParams(); // Get manager ID from URL parameters
    const navigate = useNavigate() // For navigation
    const [manager, setManager] = useState({
      username: '',
      email: '',
      phone: '',
      image: null, // Change to null to hold image file
    });
  
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
  
    useEffect(() => {
      // Fetch manager data from API (using mock data for this example)
      const fetchManager = async () => {
        // Simulating an API call
        const mockManager = {
          id,
          username: 'manager1',
          email: 'manager1@example.com',
          phone: '123-456-7890',
          image: 'https://via.placeholder.com/150', // Placeholder image
        };
        setManager(mockManager);
        setImagePreview(mockManager.image); // Set initial image preview
      };
  
      fetchManager();
    }, [id]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setManager((prevManager) => ({
        ...prevManager,
        [name]: value,
      }));
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result); // Set image preview
          setManager((prevManager) => ({
            ...prevManager,
            image: file, // Store file for upload
          }));
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Implement the update functionality here (e.g., API call to update manager)
      console.log('Updated Manager:', manager);
      // Redirect back to the view manager page after saving
      navigate('/view-Manager'); // Adjust the route as necessary
    };
  
    return (
      <>
      <Header/>
      <Navbar/>

      <div className="edit-admin-container">
        <h2>Edit Manager</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={manager.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={manager.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={manager.phone}
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

export default EditManager
