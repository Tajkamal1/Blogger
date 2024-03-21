import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from '../images/blogger.png';
import { useUser } from '../UserContext'; // Adjust the path as needed

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Add this line

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      console.log('Login successful:', response.data);
      setUser(email); // Set the email using the context
      navigate('/home', { state: { email } });
    } catch (error) {
      console.error('Login failed:', error.message);
      setErrorMessage('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
        <img src={require("../images/background-image.png")}id="background-video" className="logo" alt='img'/>
      <div className="login-form">
        <div className='logo-title'>
          <img src={logo} className="logo" alt='icon' />
          <h1 className="login-title">Login</h1>
        </div>

        <p className="login-subtitle">Login to start managing your blogs!</p>
        {errorMessage && <p className="login-error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="login-input-field"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="login-input-field"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="login-forgot-password">
            <Link to={'/Forget'}>Forgot password?</Link>
          </div>
          <button type="submit" className="login-submit-button">
            Login
          </button>
          <div className="login-create-account-link">
            <Link to={'/SignUp'}>Create a new account? - SignUp</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
