const mongoose = require('mongoose');

const BlogDataSchema = new mongoose.Schema({
  userFullName: String,
  title: String,
  content: String,
  image: String,
  likes: { type: Number, default: 0 },
  comments: [{ user: String, text: String }],
});

const BlogData = mongoose.model('BlogData', BlogDataSchema);

module.exports = BlogData;
