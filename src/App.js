import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Write from './views/Write';
import ForgetPassword from './views/ForgetPassword';
import './App.css';
import Forget from './views/EmailVerify';
import OtpVerify from './views/OtpVerify';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/write" element={<Write />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/Forget" element={<Forget/>} />
          <Route path="/OtpVerify" element={<OtpVerify/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
