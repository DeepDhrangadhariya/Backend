import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Optional: Include your CSS for styling
import Header from './Header';
import Navbar from './Navbar';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement forgot password functionality here
    try {
      const response = await fetch('YOUR_API_ENDPOINT/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('An OTP has been sent to your email.');
        navigate('/check-otp'); // Redirect to check OTP page
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
    <Header/>
    <Navbar/>

    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Send OTP</button>
      </form>
    </div>
    </>
  );
};

export default ForgotPassword;
