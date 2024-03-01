// SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import logo from '../images/blogger.png';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setImage(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        fullName,
        email,
        password,
        confirmPassword,
        profilePicture: image, // Use the correct field name based on your model
      });

      console.log('Registration successful:', response.data);
      navigate('/');
    } catch (error) {
      console.error('User registration failed:', error.message);
    }
  };

  return (
    <div className="signup">
      <video autoPlay muted loop id="background-video-signup">
        <source src={require("../images/background.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="form-container-signup">
        <div className='logo-title'>
          <img src={logo} className="logo" alt='icon' />
          <h1 className="signup-title">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Existing form fields */}
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            className="signup-input-field"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            autoComplete="name"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="signup-input-field"
            placeholder="Enter username or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="signup-input-field"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="signup-input-field"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          {/* New profile picture input field with image conversion */}
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            className="signup-input-field"
            onChange={handleImageChange}
            accept="image/*"
          />

          {/* Existing form fields */}
          <div className="signup-link">
            <Link to="/">Already have an account?</Link>
          </div>
          <br />
          <br />
          <button type="submit" className="signup-submit-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
