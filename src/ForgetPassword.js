import React, { useState } from "react";
import axios from 'axios';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [resetToken, setResetToken] = useState(null); // Added state for reset token

  const handleForgetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email });
      setSuccess(response.data.message);
      setError(null);
      setResetToken(response.data.resetToken); // Set the reset token in the state
    } catch (error) {
      setError(error.response.data.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <h1>Forget Password</h1>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button onClick={handleForgetPassword}>Submit</button>
      {error && <p>Error: {error}</p>}
      {success && <p>Success: {success}</p>}
      {resetToken && (
        <div>
          <p>Reset Token: {resetToken}</p>
          <p>Provide this token to reset your password.</p>
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;
