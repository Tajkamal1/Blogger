import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <div className='navbar-Home'>
        <img id="icon" src={require("../images/Blogger-App.png")} alt="Icon"/>
        <ul>
          <li><Link to='/Write'>Write</Link></li>
          <li><Link to='/'>LogOut</Link></li>
        </ul>
      </div>
      <ul className='blog-list'>
        {blogs.map((blog) => (
          <li key={blog._id} className='blog-item'>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <img src={require('../icons/like.png')} alt="Like" className='like' />
            <img src={require('../icons/comment-alt-middle.png')}  alt="Comment" className='comment'/>
            <img src={require('../icons/undo.png')} alt="Comment" className='share'/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
