// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import SmokeEffect from './SmokeEffect';
import Face from './Face';
import Write from './Write';
import ForgetPassword from './ForgetPassword';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<SmokeEffect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/face" element={<Face />} />
        <Route path="/write" element={<Write/>} />
        <Route path="/ForgetPassword" element={<ForgetPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;
