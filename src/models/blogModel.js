const mongoose = require('mongoose');

const BlogDataSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
});

const BlogData = mongoose.model('BlogData', BlogDataSchema);

module.exports = BlogData;
