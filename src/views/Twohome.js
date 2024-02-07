// Twohome.js

import React, { useState } from 'react';
import './Twohome.css';

function Twohome() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        <div className="nav-links">
          <button onClick={() => console.log('Link 1 clicked')}>Link 1</button>
          <button onClick={() => console.log('Link 2 clicked')}>Link 2</button>
          <button onClick={() => console.log('Link 3 clicked')}>Link 3</button>
        </div>
      </nav>

      {/* Vertical Menu */}
      {showMenu && (
        <div className="vertical-menu">
          <button onClick={() => console.log('Link 1 clicked')}>Link 1</button>
          <button onClick={() => console.log('Link 2 clicked')}>Link 2</button>
          <button onClick={() => console.log('Link 3 clicked')}>Link 3</button>
        </div>
      )}

      {/* Blog Details Section */}
      <div className="blog-details">
        <h1>Hello</h1>
        {/* Replace the marquee with your dynamic blog content */}
        <div>Blog details will scroll here.</div>
      </div>
    </div>
  );
}

export default Twohome;
