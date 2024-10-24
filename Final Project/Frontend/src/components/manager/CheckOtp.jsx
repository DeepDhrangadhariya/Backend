import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckOtp.css'; // Optional: Include your CSS for styling
import Header from './Header';
import Navbar from './Navbar';

const CheckOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangeOtp = (e) => {
    setOtp(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic password match validation
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('YOUR_API_ENDPOINT/check-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, newPassword }), // Send OTP and new password
      });

      if (response.ok) {
        alert('Password reset successfully.');
        navigate('/login'); // Redirect to login page after successful reset
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
    <Header/>
    <Navbar/>

    <div className="check-otp-container">
      <h2>Check OTP</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={handleChangeOtp}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={handleChangeNewPassword}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <button type="submit">Verify OTP and Reset Password</button>
      </form>
    </div>
    </>
  );
};

export default CheckOtp;
