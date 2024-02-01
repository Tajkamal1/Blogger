import React, { useState } from "react";

function Write() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the data, including the image file
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("image", formData.image);

    try {
      // Make a fetch request to your backend API to store data in MongoDB
      const response = await fetch("http://localhost:5000/api/blog", { // Update with your backend server URL
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        // Handle success, maybe redirect or show a success message
        console.log("Blog created successfully");
      } else {
        // Handle error, maybe show an error message
        console.error("Failed to create blog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Content:
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Image:
        <input type="file" name="image" onChange={handleImageChange} />
      </label>

      <button type="submit">Create a new blog</button>
    </form>
  );
}

export default Write;
