import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './similarblog.css';
import likeIcon from '../icons/like1.png'; // Import the like icon image

const SimilarBlogs = ({ currentBlogId }) => {
    const [similarBlogs, setSimilarBlogs] = useState([]);

    useEffect(() => {
        const fetchSimilarBlogs = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/similar-blogs/${currentBlogId}`);
                if (response.ok) {
                    const data = await response.json();
                    setSimilarBlogs(data);
                } else {
                    console.error('Failed to fetch similar blogs');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSimilarBlogs();
    }, [currentBlogId]);

    return (
        <div className='similarblog'>
            <div>
                <h2>Most popular Blogs:</h2>
            </div>
            <div className='scroll'>
                {similarBlogs.map((blog) => (
                    <div className='similar-blogs' key={blog._id}>
                        <Link to={`/blog/${blog._id}`}>
                            <h2 className='similar-blog-title'>{blog.title}</h2>
                            <div className='blog-body'>
                                <p className='similar-blog-content'>{blog.content}</p>
                                <img
                                    src={`data:image/jpeg;base64,${blog.image}`}
                                    alt="Blog"
                                    className='similarblog-image'
                                />
                            </div>
                            <div className='similar-blog-icons'>
                                <p>Likes: {blog.likes}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarBlogs;
