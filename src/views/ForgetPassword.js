// ForgetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import './ForgetPassword.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/resetPassword', { email, newPassword });

      if (response.data.success) {
        setMessage('Password reset successful');
      } else {
        setMessage('User not found. Please check your email and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while resetting your password.');
    }
  };

  return (
    <div className="forget-password-container">
      <video autoPlay muted loop id="background-video-forget">
        <source src={require("../images/background_video.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="form-container-forget">
        <form>
          <h2 className='forget-passsword-h2'>Forget Password</h2>
          <div>
            <label className='forget-password-label' htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className='forget-input-email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label className='forget-password-label' htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className='forget-input-newpassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button className='button-forget' onClick={handlePasswordReset}>Reset Password</button>
          <p className='forget-password-p'>{message}</p>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
