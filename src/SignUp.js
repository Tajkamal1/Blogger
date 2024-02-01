import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Use useNavigate to get the navigate function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to the signup endpoint
      const response = await axios.post('http://localhost:5000/api/signup', {
        fullName,
        Email,
        password,
        confirmPassword,
      });

      console.log('Registration successful:', response.data);
      // Use navigate function to redirect to the login page upon successful registration
      navigate('/');
    } catch (error) {
      console.error('User registration failed:', error.message);
      // Handle registration failure, show error message, etc.
    }
  };

  return (
    <div className="signup">
      <nav className="navbar">
        <img id="icon" src={require("./images/Blogger-App.png")} alt="Icon" />
      </nav>
      <div className="container">
        <div className="form-container">
          <div className="signup-title">Sign Up</div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="input-field"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <label htmlFor="Email">Email</label>
            <input
              type="email"
              id="Email"
              className="input-field"
              placeholder="Enter username or email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="input-field"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="login-link">
              <Link to="/">Already have an account?</Link>
            </div>
            <br />
            <br />
            <button type="submit" className="bn5">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
