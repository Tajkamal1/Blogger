import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Face.css';

function Face() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/userdata');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
       <div className="home">
      <nav className="navbar">
        <img id="icon" src={`${process.env.PUBLIC_URL}/icon.svg`} alt="Icon" />
      </nav>

      <h1>Face Component</h1>
      {data ? (
        <ul>
          {data.map((user) => (
            <li key={user._id}>
              <strong>Email:</strong> {user.email}
            </li>
          ))}
        </ul>
      ) : (
        'Loading...'
      )}
    </div>
  );
}

export default Face;
