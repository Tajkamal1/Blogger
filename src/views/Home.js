import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { useUser } from '../UserContext';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [commentedBlogId, setCommentedBlogId] = useState(null);
  const [addCommentMsg, setAddCommentMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userDetails, setUserDetails] = useState({}); // Add userDetails state
  const [userFullName, setUserFullName] = useState('');
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const navigate = useNavigate();
  const { userEmail, logout } = useUser();

  const [searchVisible, setSearchVisible] = useState(false);

  const handleSearchIconClick = () => {
    setSearchVisible(!searchVisible);
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blogs');
      if (response.ok) {
        const data = await response.json();

        const blogsWithUserDetails = await Promise.all(
          data.map(async (blog) => {
            const userDetailsResponse = await fetch(`http://localhost:5000/api/user/${blog.email}`);
            if (userDetailsResponse.ok) {
              const userDetails = await userDetailsResponse.json();
              return { ...blog, userDetails };
            } else {
              console.error(`Failed to fetch user details for blog ${blog._id}`);
              return blog;
            }
          })
        );
        setBlogs(blogsWithUserDetails);
      } else {
        console.error('Failed to fetch blogs');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserFullName = useCallback(async () => {
    try {
      if (userEmail) {
        const response = await fetch(`http://localhost:5000/api/user/${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setUserFullName(data.fullName);
        } else {
          console.error('Failed to fetch user full name');
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [userEmail]);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsNavbarVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchBlogs();
    fetchUserFullName();
  }, [userEmail, fetchUserFullName]);

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
    navigate('/write');
  };

  const handleBlogClick = (blog) => {
    navigate(`/blog/${blog._id}`, {
      state: { userDetails: blog.userDetails, userFullName, email: userEmail },
    });
  };

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  const fetchUserDetails = async () => {
    try {
      if (!userEmail) {
        console.log(userEmail);
        console.error('User email is empty.');
        return;
      }

      // Fetch user details for the logged-in user
      const userDetailsResponse = await fetch(`http://localhost:5000/api/user/${userEmail}`);

      if (userDetailsResponse.ok) {
        const userDetailsData = await userDetailsResponse.json();
        setUserDetails(userDetailsData);
      } else {
        console.error(`Failed to fetch user details for user with email ${userEmail}`);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Handle error gracefully, for example, show an error message to the user
    }
  };

  // Check if userEmail is not empty before fetching user details
  if (userEmail) {
    fetchUserDetails();
  }

  return (
    <div className='home'>
      <div className={`navbar-Home ${isNavbarVisible ? 'visible' : 'hidden'}`}>
        <img id='icon' src={require('../images/blogger.png')} alt='Icon' />
        <div className={`search-bar ${searchVisible ? 'active' : ''}`}>
          <input
            type='text'
            id='searchInput'
            name='searchInput'
            autoComplete='off'
            placeholder='Search Blogs'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul>
          <li>
            <img
              id='search-icon'
              src={require('../icons/search.png')}
              alt='Icon'
              onClick={handleSearchIconClick}
            />
          </li>
          <li>
            <button onClick={handleNewPostClick}>
              <img id='new-post' src={require('../icons/new_post.png')} alt='Icon' />
            </button>
          </li>
          <li>
            <div onClick={handleLogout}>
              <img className='logout-icon' src={require('../icons/logout.png')} alt='Logout Icon' />
            </div>
          </li>
          <li>
            <Link to='/profile'>
              {userDetails.profilePicture ? (
                <img
                  src={`data:image/png;base64,${userDetails.profilePicture}`}
                  alt='User Profile'
                  className='profile-icon'
                />
              ) : (
                <img
                  src={require('../images/default-profile.jpg')}
                  alt='Default Profile'
                  className='profile-icon'
                />
              )}
            </Link>
          </li>
        </ul>
      </div>
      <ul className='blog-list'>
        {filteredBlogs.map((blog) => (
          <li key={blog._id} className='blog-item'>
            <div className='user-info'>
              {blog.userDetails && (
                <img
                  className='user-icon'
                  src={`data:image/jpeg;base64,${blog.userDetails.profilePicture}`}
                  alt='User'
                />
              )}
              <span className='user-name'>
                {blog.userDetails ? blog.userDetails.fullName : 'Unknown User'}
              </span>
            </div>
            <div className='blog-content'>
              <h3 onClick={() => handleBlogClick(blog)}>{blog.title}</h3>
              <img
                src={`data:image/jpeg;base64,${blog.image}`}
                alt='Blog'
                className='blog-image'
                onClick={() => handleBlogClick(blog)}
              />
              <p className='home-content-p' onClick={() => handleBlogClick(blog)}>
                {blog.content}
              </p>
            </div>
            <div className='blog-icons'>
              <img
                src={require('../icons/like1.png')}
                alt='Like'
                className='like'
                onClick={() => handleLike(blog._id)}
              />
              <span className='like-count'>{blog.likes}</span>
              <img
                src={require('../icons/comment.gif')}
                alt='Comment'
                className='comment'
                onClick={() => handleComment(blog._id)}
              />
            </div>
            {commentedBlogId === blog._id && (
              <div className='text-area'>
                <textarea
                  id='commentInput'
                  className='home-comment-textarea'
                  rows='4'
                  cols='50'
                  placeholder='Enter your comment...'
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                ></textarea>
                <img
                  src={require('../icons/send-comment.png')}
                  alt='Submit'
                  onClick={() => submitComment(blog._id)}
                  className='comment-submit-button'
                />
                {addCommentMsg && <p className='success-msg'>{addCommentMsg}</p>}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
