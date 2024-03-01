import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [commentedBlogId, setCommentedBlogId] = useState(null);
  const [addCommentMsg, setAddCommentMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  useEffect(() => {
    const fetchUserFullName = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getUserDetails/${email}`);
        if (response.status === 200) {
          const { fullName, profilePicture } = response.data;
          setUserFullName(fullName);
          setUserProfilePicture(profilePicture);
        } else {
          console.error('Failed to fetch user full name');
        }
      } catch (error) {
        console.error('Error fetching user full name:', error);
      }
    };
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
    if (email) {
      fetchUserFullName();
      localStorage.setItem('email', email); 
    }
    fetchBlogs();
  }, [email]);

  const handleLike = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === blogId ? { ...blog, likes: updatedBlog.likes } : blog
          )
        );
      } else {
        console.error('Failed to like the blog');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = (blogId) => {
    setCommentedBlogId(commentedBlogId === blogId ? null : blogId);
    setAddCommentMsg('');
  };

  const submitComment = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userFullName, text: commentInput }),
      });

      if (response.ok) {
        setCommentInput('');
        setCommentedBlogId(blogId);
        setAddCommentMsg('Comment added successfully');
      } else {
        console.error('Failed to submit the comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewPostClick = () => {
    navigate('/write', { state: { userFullName } });
  };

  return (
    <div className='home'>
      <div className='navbar-Home'>
        <img id="icon" src={require("../images/blogger.png")} alt="Icon" />
        <div className="search-bar">
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            autoComplete="off"
            placeholder="Search Blogs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul>
          <li>
            <button onClick={handleNewPostClick}>New Post</button>
          </li>
          <li>
            <Link to='/'>
              <img className='logout-icon' src={require("../icons/logout.png")} alt="Icon" />
            </Link>
          </li>
        </ul>
      </div>
      <ul className='blog-list'>
        {filteredBlogs.map((blog) => (
          <li key={blog._id} className='blog-item'>
            <div className='user-info'>
              {userProfilePicture && (
                <img
                  className='user-icon'
                  src={`data:image/jpeg;base64,${userProfilePicture}`}
                  alt="User"
                />
              )}
              <span className='user-name'>{blog.userFullName}</span>
            </div>
            <Link className='blog-link' to={`/blog/${blog._id}`}>
              <h3>{blog.title}</h3>
              <img
                src={`data:image/jpeg;base64,${blog.image}`}
                alt="Blog"
                className='blog-image'
              />
              <p className='home-content'>{blog.content.split('\n').slice(0, 1).join('\n')}</p>
            </Link>
            <div className='blog-icons'>
              <img
                src={require('../icons/like1.png')}
                alt="Like"
                className='like'
                onClick={() => handleLike(blog._id)}
              />
              <span className='like-count'>{blog.likes}</span>
              <img
                src={require('../icons/comment.gif')}
                alt="Comment"
                className='comment'
                onClick={() => handleComment(blog._id)}
              />
            </div>
            {commentedBlogId === blog._id && (
              <div className='text-area'>
                <textarea
                  id="commentInput"
                  className='home-comment-textarea'
                  rows="4"
                  cols="50"
                  placeholder="Enter your comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                ></textarea>
                <img
                  src={require("../icons/send-comment.png")}
                  alt="Submit"
                  onClick={() => submitComment(blog._id)}
                  className="comment-submit-button"
                />

                {addCommentMsg && <p className="success-msg">{addCommentMsg}</p>}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
