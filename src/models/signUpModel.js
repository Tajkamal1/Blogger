// src/models/signUpModel.js
const mongoose = require('mongoose');

const SignUpSchema = new mongoose.Schema({
  fullName: String,
  Email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const SignUp = mongoose.model('SignUp', SignUpSchema);

module.exports = SignUp;
