const Blog = require('../../models/blogModel');

const getSimilarBlogs = async (req, res) => {
  const { currentBlogId } = req.params;

  try {
    const currentBlog = await Blog.findById(currentBlogId);
    if (!currentBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const similarBlogs = await Blog.find({
      _id: { $ne: currentBlogId },
      // Add your criteria for similarity here
    }).limit(3);

    res.json(similarBlogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getSimilarBlogs };
