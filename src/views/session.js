// session.js
import React from 'react';

// Retrieve email from localStorage
const userEmail = localStorage.getItem('userEmail');

// Functional component Session
function Session() {
  return (
    <div>
      {/* You can use userEmail here in your component as needed */}
    </div>
  );
}

export { userEmail, Session };
