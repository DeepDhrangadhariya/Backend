import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditAdmin.css'; // Optional: Include your CSS for styling
import Header from './Header';
import Navbar from './Navbar';

const EditAdmin = () => {
  const { id } = useParams(); // Get admin ID from URL parameters
  const navigate = useNavigate() // For navigation
  const [admin, setAdmin] = useState({
    username: '',
    email: '',
    phone: '',
    image: null, // Change to null to hold image file
  });

  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  useEffect(() => {
    // Fetch admin data from API (using mock data for this example)
    const fetchAdmin = async () => {
      // Simulating an API call
      const mockAdmin = {
        id,
        username: 'admin1',
        email: 'admin1@example.com',
        phone: '123-456-7890',
        image: 'https://via.placeholder.com/150', // Placeholder image
      };
      setAdmin(mockAdmin);
      setImagePreview(mockAdmin.image); // Set initial image preview
    };

    fetchAdmin();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set image preview
        setAdmin((prevAdmin) => ({
          ...prevAdmin,
          image: file, // Store file for upload
        }));
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the update functionality here (e.g., API call to update admin)
    console.log('Updated Admin:', admin);
    // Redirect back to the view admin page after saving
    navigate('/view-admin'); // Adjust the route as necessary
  };

  return (
    <>
    <Header/>
    <Navbar/>

    <div className="edit-admin-container">
      <h2>Edit Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={admin.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={admin.phone}
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

export default EditAdmin;
