import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './OtpVerify.css';

function OtpVerify() {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isOtpCorrect, setIsOtpCorrect] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve email and otp from location state
  const { email, otp } = location.state || {};

  const handleOtpChange = (e) => {
    setEnteredOtp(e.target.value);
    setIsOtpCorrect(true); // Reset error message on OTP change
  };

  const handleVerifyButtonClick = () => {
    // Check if enteredOtp matches the correct OTP
    if (enteredOtp == otp) {
      // OTP is correct, navigate to ForgetPassword.js
      navigate('/ForgetPassword');
    } else {
      // Incorrect OTP, display error message or handle accordingly
      setIsOtpCorrect(false);
    }
  };

  return (
    <div>
      <nav className="navbar-Otp-Verify">
        <img id="icon" src={require("../images/Blogger-App.png")} alt="Icon" />
        <Link to="/">Home</Link>
      </nav>
      <div className="container-Otp">
        <div className="form-container-Otp">
          <div className="Otp-Verify">
            <h1>OTP Verification</h1>

            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={enteredOtp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
            />

            {isOtpCorrect ? null : (
              <p className="error-message">Incorrect OTP. Please try again.</p>
            )}

            <button onClick={handleVerifyButtonClick}>Verify</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
