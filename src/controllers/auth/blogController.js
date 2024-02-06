// blogController.js
const BlogData = require('../../models/blogModel');

const createBlog = async (req, res) => {
  const { title, content, image } = req.body;

  try {
    const newBlog = new BlogData({ title, content, image });
    await newBlog.save();
    res.status(201).json({ message: 'Blog data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogData.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getBlogById = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await BlogData.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createBlog, getAllBlogs, getBlogById };
