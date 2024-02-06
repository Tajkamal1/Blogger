import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import './BlogDetail.css'; // Import the external CSS file

function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  const fetchBlogDetail = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blog/${blogId}`);

      if (response.ok) {
        const data = await response.json();
        setBlog(data);
      } else {
        console.error('Failed to fetch blog details');
      }
    } catch (error) {
      console.error(error);
    }
  }, [blogId]);

  useEffect(() => {
    fetchBlogDetail();
  }, [fetchBlogDetail]);

  const submitComment = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: 'John Doe', text: commentInput }),
      });

      if (response.ok) {
        // Clear the comment input and refetch blog details to update comments
        setCommentInput('');
        fetchBlogDetail();
      } else {
        console.error('Failed to submit the comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/comment/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refetch blog details after deleting the comment
        fetchBlogDetail();
      } else {
        console.error('Failed to delete the comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <nav className="blog-detail-nav">
        <img id="icon" src={require("../images/Blogger-App.png")} alt="Icon" />
        <Link to={'/Home'}>Home</Link>
      </nav>

      <div className="container-forget">
        <div className="blog-background-shodow">
          <div className="container-blogdetail">
            {blog ? (
              <>
                <h2 className="title-blog">{blog.title}</h2>
                <img
                  src={`data:image/jpeg;base64,${blog.image}`}
                  alt="Blog"
                  className="blogdata-image"
                />
                <p className="blog-content">{blog.content}</p>

                <div className="likes-comments">
                  <span className="like-count">{blog.likes} Likes</span>
                  <div className="comments-section">
                    <h3>Comments</h3>
                    {blog.comments.map((comment, index) => (
                      <div key={index} className="comment-item">
                        <p>
                          {comment.user}: {comment.text}
                          <button onClick={() => deleteComment(comment._id)}>
                            Delete Comment
                          </button>
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="comment-input-section">
                    <textarea
                      id="commentInput"
                      rows="4"
                      cols="50"
                      placeholder="Enter your comment..."
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    ></textarea>
                    <button onClick={submitComment}>Submit Comment</button>
                  </div>
                </div>
              </>
            ) : (
              <p className="loading">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
