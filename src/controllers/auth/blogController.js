const Blog = require('../../models/blogModel');

const createBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newBlog = new Blog({ title, content });
    await newBlog.save();
    res.status(201).json({ message: 'Blog data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createBlog, getAllBlogs };
