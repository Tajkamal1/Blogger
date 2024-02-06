import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EmailVerify.css';

function EmailVerify() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const generateRandomSixDigitNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const sendOtpByEmail = async (otp) => {
    try {
      // Make a POST request to send OTP via email
      await fetch('http://localhost:5000/api/sendOtpByEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
    } catch (error) {
      console.error('Error sending OTP via email:', error.message);
    }
  };

  const handleForgetPasswordClick = async () => {
    try {
      // Make a POST request to check if the email exists
      const response = await fetch('http://localhost:5000/api/checkEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.exists) {
        // Email exists, generate a six-digit number
        const otp = generateRandomSixDigitNumber();

        // Send the OTP via email
        await sendOtpByEmail(otp);

        // Navigate to OtpVerify.js page with the generated OTP
        navigate(`/OtpVerify?email=${email}&otp=${otp}`);
      } else {
        // Email does not exist, handle accordingly (e.g., show an error message)
        console.log('Email does not exist');
      }
    } catch (error) {
      console.error('Error checking email:', error.message);
    }
  };

  return (
    <div>
      <nav className="navbar-emailverify">
        <img id="icon" src={require("../images/Blogger-App.png")} alt="Icon" />
        <Link to="/">Home</Link>
      </nav>
      <div className="container-email-verify">
        <div className="form-container-email-verify">
          <div className="container2">
            <label htmlFor="email" className="label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              className="input"
              placeholder="Enter your Email Id"
            />
            {/* Use onClick to trigger the email check */}
            <button onClick={handleForgetPasswordClick} className="button">
              Forget Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerify;
