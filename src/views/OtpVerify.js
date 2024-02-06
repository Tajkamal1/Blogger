import React, { useState, useEffect } from 'react';
import { Link,useNavigate, useLocation } from 'react-router-dom';
import './OtpVerify.css'; // Import the stylesheet

function OtpVerify() {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isOtpCorrect, setIsOtpCorrect] = useState(true); // Initially assuming OTP is correct
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // No need to use 'email' and 'otp' here since they are not used in the component
  }, [location.search]);

  const handleOtpChange = (e) => {
    setEnteredOtp(e.target.value);
    setIsOtpCorrect(true); // Reset error message on OTP change
  };

  const handleVerifyButtonClick = () => {
    // Simulate OTP verification logic, replace with your actual logic
    const correctOtp = location.search.includes(`otp=${enteredOtp}`); // Check if enteredOtp matches the one in the query parameters

    if (correctOtp) {
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
              <Link>
              </Link>
            </nav>
    <div className="container-Otp">
        <div className="form-container-Otp ">

            <div className="Otp-Verify">
                      <h1>OTP Verification</h1>

                      <label htmlFor="otp">Enter OTP:</label>
                      <input
                        type="text"
                        id="otp"
                        name="otp"
                        value={enteredOtp}
                        onChange={handleOtpChange}
                        placeholder='Enter OTP'
                        />

                      {isOtpCorrect ? null : <p className="error-message">Incorrect OTP. Please try again.</p>}

                      <button onClick={handleVerifyButtonClick}>Verify</button>
            </div>
        </div>
    </div>
  </div>
  );
}

export default OtpVerify;
