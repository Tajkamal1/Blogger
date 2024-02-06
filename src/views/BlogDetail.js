// BlogDetail.js
import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import './BlogDetail.css'; // Import the external CSS file

function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
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
    };

    fetchBlogDetail();
  }, [blogId]);

  return (
    <div>

    <nav className="blog-detail-nav">
        <img id="icon" src={require("../images/Blogger-App.png")} alt="Icon" />
        <Link to={'/Home'}>
        Home
        </Link>
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
