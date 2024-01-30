// ForgetPassword.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleForgetPassword = async () => {
    try {
      // Check if the entered email is in the Users collection
      const emailCheckResponse = await axios.post('http://localhost:5000/api/check-email', { email });

      if (emailCheckResponse.data.exists) {
        // If the email exists, initiate the forget password process
        await axios.post('http://localhost:5000/api/forget-password', { email, newPassword });
        setSubmitted(true);
        setError('');
      } else {
        setSubmitted(false);
        setError('Email not found in the Users collection');
      }
    } catch (error) {
      setSubmitted(false);
      setError('Error checking email');
      console.error('Error initiating forget password:', error.message);
    }
  };

  return (
    <div>
      <h2>Forget Password</h2>
      {submitted ? (
        <p>Instructions for password reset sent to your email.</p>
      ) : (
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button onClick={handleForgetPassword}>Send Reset Instructions</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
