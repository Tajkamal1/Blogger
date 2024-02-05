// models/blogModel.js
const mongoose = require('mongoose');

const BlogData = mongoose.model('BlogData', {
  title: String,
  content: String,
});

module.exports = BlogData;
