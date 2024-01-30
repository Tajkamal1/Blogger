import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Update import
import './Write.css';

function Write() {
  const navigate = useNavigate(); // Use useNavigate hook

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any additional validations or actions here

    // Navigate to Face page and pass the form data as state
    navigate('/Face', {
      state: { formData },
    });
  };

  return (
    <div className="home">
      <nav className="navbar">
        <img id="icon" src={`${process.env.PUBLIC_URL}/icon.svg`} alt="Icon" />
        <Link id="app" to="/Home">
          Blogger App
        </Link>
      </nav>
      <div className="content">
       

        {/* Form for blog data */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Write;
