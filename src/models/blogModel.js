const mongoose = require('mongoose');

const BlogDataSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  likes: { type: Number, default: 0 }, // Set a default value for likes
  comments: [{ user: String, text: String }], // Assuming comments have a user and text field
});

const BlogData = mongoose.model('BlogData', BlogDataSchema);

module.exports = BlogData;
