// SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to the signup endpoint
      const response = await axios.post('http://localhost:5000/api/signup', {
        fullName,
        usernameOrEmail,
        password,
        confirmPassword,
      });

      console.log('Registration successful:', response.data);
      // You may want to redirect the user or perform other actions upon successful registration
    } catch (error) {
      console.error('User registration failed:', error.message);
      // Handle registration failure, show error message, etc.
    }
  };

  return (
    <div className="signup">
      <nav className="navbar">
        <img id="icon" src={`${process.env.PUBLIC_URL}/icon.svg`} alt="Icon" />
        <Link id="app" to="/Home">
          Blogger App
        </Link>
      </nav>
      <div className="container">
        <div className="right-image-container">
          {/* Background image for the right side */}
          <div className="background-image"></div>
        </div>
        <div className="signup-title">Sign Up</div>
        <div className="form-container">
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

            <label htmlFor="usernameOrEmail">Username or Email</label>
            <input
              type="text"
              id="usernameOrEmail"
              className="input-field"
              placeholder="Enter username or email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
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
              <Link to="/login">Already have an account?</Link>
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
