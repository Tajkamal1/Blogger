import React, { useState } from "react";
import { Link} from 'react-router-dom';
import "./Write.css";


function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        console.log("Blog data saved successfully");
        setTitle("");
        setContent("");
      } else {
        console.error("Failed to save blog data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <nav className="navbar-write">
        <img id="icon" src={require("../images/Blogger-App.png")} alt="Icon" />
        <Link id="login" className="Sign-Up" to="/Home">
          Home
        </Link>
      </nav>
      <div className="container-write">
        <div className="form-container-write">
                <div>
                  <h className='heading'>Create a New Blog </h>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                  <label htmlFor="content">Content:</label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <button className='write' onClick={handleSubmit}>Submit</button>
              </div>
          </div>
    </div>
  );
}

export default Write;
