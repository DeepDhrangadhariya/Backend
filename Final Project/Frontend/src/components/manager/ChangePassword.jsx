import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './ChangePassword.css'; // Optional: Include your CSS for styling
import Header from './Header';
import Navbar from './Navbar';

const ChangePassword = () => {
  const navigate = useNavigate(); // For navigation after successful password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }

    // Implement change password functionality here
    try {
      const response = await fetch('YOUR_API_ENDPOINT/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed (e.g., token)
          'Authorization': `Bearer YOUR_TOKEN`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        // Handle successful password change (e.g., redirecting to profile page)
        alert("Password changed successfully.");
        navigate('/profile'); // Redirect to profile page or any other page
      } else {
        // Handle error response
        const errorData = await response.json();
        alert(errorData.message || 'Password change failed. Please try again.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
    <Header/>
    <Navbar/>

    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
    </>
  );
};

export default ChangePassword;
