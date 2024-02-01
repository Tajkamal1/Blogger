import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleForgetClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/checkEmail', { email });

      if (response.data.exists) {
        const tokenResponse = await axios.post('http://localhost:5000/api/generateToken', { email });
        const resetPasswordLink = `http://yourwebsite.com/reset-password/${tokenResponse.data.token}`;

        await axios.post('http://localhost:5000/api/sendResetEmail', { email, resetPasswordLink });

        setMessage('Password reset link sent to your email. Please check your inbox.');
      } else {
        setMessage('Email not found in the database.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while processing your request.');
    }
  };

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
    <div>
      <h2>Forget Password</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      
      <button onClick={handlePasswordReset}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgetPassword;
