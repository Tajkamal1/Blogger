// Home.js
import React from 'react';
import { Link} from 'react-router-dom';
import './Home.css';

function Home() {

  return (
    <div className="home">
      <nav className="navbar">
        <img id="icon" src={`${process.env.PUBLIC_URL}/icon.svg`} alt="Icon" />
        <Link id="app" to="/Home">
          Blogger App
        </Link>
        <Link id="login" to="/login">
          Login
        </Link>
      </nav>
      <div className="content">
        <h1>Welcome to Home Page</h1>
      </div>
    </div>
  );
}

export default Home;
