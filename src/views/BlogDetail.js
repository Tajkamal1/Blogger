import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams,useNavigate} from 'react-router-dom';
import './BlogDetail.css'; // Import local styles
import SimilarBlogs from './SimilarBlogs';
import { useUser } from '../UserContext'; // Adjust the path as needed

// Functional component BlogDetail
function BlogDetail() {
  // Extract blogId from route parameters
  const { blogId } = useParams();
  const navigate = useNavigate();

  
  // State variables
  const [blog, setBlog] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [addCommentMsg, setAddCommentMsg] = useState('');
  const [commentedBlogId, setCommentedBlogId] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userFullName, setUserFullName] = useState('');
  const { userEmail,logout } = useUser(); // Updated to use userEmail from context

  // Fetch blog details from the server
  const fetchBlogDetail = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blog/${blogId}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data);

        // Check if blog is not null before fetching user details
        if (data && data.email) {
          const userDetailsResponse = await fetch(`http://localhost:5000/api/user/${data.email}`);
          if (userDetailsResponse.ok) {
            const userDetails = await userDetailsResponse.json();
            setUserDetails(userDetails);
          }
        }
      } else {
        console.error('Failed to fetch blog details');
      }
    } catch (error) {
      console.error(error);
    }
  }, [blogId]); // Include blogId in the dependency array

  const fetchUserFullName = useCallback(async () => {
    try {
      // Check if userEmail is truthy before making the request
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

  // useEffect hook to fetch blog details when component mounts or blogId changes
  useEffect(() => {
    fetchBlogDetail();
    fetchUserFullName();
  }, [fetchBlogDetail, fetchUserFullName]);

  // Handle the like functionality
  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlog((prevBlog) => ({ ...prevBlog, likes: updatedBlog.likes }));
      } else {
        console.error('Failed to like the blog');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle comment input box for a specific blog post
  const handleComment = () => {
    setCommentedBlogId(commentedBlogId === blogId ? null : blogId);
    setDeleteMsg('');
    setAddCommentMsg('');
  };

  // Submit a comment for a blog post
  const submitComment = async () => {
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
        fetchBlogDetail();
      } else {
        console.error('Failed to submit the comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a comment for a blog post
  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/comment/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCommentedBlogId(blogId);
        setDeleteMsg('Comment deleted successfully');
        fetchBlogDetail();
      } else {
        console.error('Failed to delete the comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle text-to-speech functionality
  const handleSpeech = () => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;

      if (synth.speaking && isSpeaking) {
        synth.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(blog.content);
        synth.speak(utterance);
        setIsSpeaking(true);
      }
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  };
  const handleLogout = () => {
    logout();
    navigate('/')
  };

  // JSX rendering
  return (
    <div>
      {/* Navigation bar */}
      <nav className="blog-detail-nav">
        <img className="blog-icon" src={require("../images/blogger.png")} alt="Icon" />
        <ul>
          <li>
            <Link to={'/Home'} ><img className='home-icon' src={require("../icons/home1.png")} alt="Icon" /></Link>
          </li>
          <li>
          <div onClick={handleLogout}>
              <img className='logout-icon' src={require("../icons/logout.png")} alt="Icon" />
            </div>
          </li>
        </ul>
      </nav>
      <div className='single-blog'>
        {/* Left side content */}
        <div className='left-side'>
          <div className='Blogdetail'>
            <div className="blog-detail-container">
              <div className="blog-detail-background-shodow">
                <div className="container-blogdetail">
                  {blog ? (
                    <>
                      {/* User information */}
                      <div className='user-info'>
                        {userDetails && userDetails.profilePicture && (
                          <img
                            className='user-icon'
                            src={`data:image/jpeg;base64,${userDetails.profilePicture}`}
                            alt="User"
                          />
                        )}
                        <span className='user-name'>{userDetails ? userDetails.fullName : 'Unknown'}</span>
                      </div>

                      {/* Blog details */}
                      <h2 className="title-blog">{blog.title}</h2>
                      <img
                        src={`data:image/jpeg;base64,${blog.image}`}
                        alt="Blog"
                        className="blogdata-image"
                      />
                      <p className="blog-content">{blog.content}</p>

                      {/* Voice icon for text-to-speech */}
                      <img
                        className='voice-icon'
                        src={require('../icons/speak.png')}
                        alt='Voice'
                        onClick={handleSpeech}
                      />

                      {/* Like and Comment functionality */}
                      <div className='blog-icons'>
                        <img
                          src={require('../icons/like1.png')}
                          alt="Like"
                          className='blog-detail-like'
                          onClick={handleLike}
                        />
                        <span className='like-count'> Likes {blog.likes}</span>
                        <img
                          src={require('../icons/comment.gif')}
                          alt="Comment"
                          className='comment-blog'
                          onClick={handleComment}
                        />
                      </div>

                      {/* Comment input and list */}
                      {commentedBlogId === blogId && (
                        <div>
                          <textarea
                            id="commentInput"
                            className='blogdetail-textarea'
                            rows="4"
                            cols="50"
                            placeholder="Enter your comment..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                          ></textarea>
                          <img
                            src={require("../icons/send-comment.png")}
                            alt="Submit"
                            onClick={submitComment}
                            className="comment-submit-button-blog"
                          />
                          {addCommentMsg && <p className="success-msg">{addCommentMsg}</p>}
                          {deleteMsg && <p className="success-msg">{deleteMsg}</p>}
                          <h3>Comments :</h3>
                          {blog.comments.map((comment) => (
                            <div key={comment._id}>
                              <p>
                                {comment.user}:{comment.text}
                                <img
                                  src={require('../icons/delete.png')}
                                  alt="Like"
                                  className='delete'
                                  onClick={() => deleteComment(comment._id)}
                                />
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="loading">Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side content */}
        <div className='right-side'>
          <div className='similar-blogs'>
            {blog && <SimilarBlogs currentBlogId={blog._id} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
