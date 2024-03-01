const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import controllers
const getUserFullNameController = require('./src/controllers/auth/getUserDetails');
const checkEmailController = require('./src/controllers/auth/checkEmailController');
const resetPasswordController = require('./src/controllers/auth/resetPasswordController');
const loginController = require('./src/controllers/auth/loginController');
const signupController = require('./src/controllers/auth/signupController');
const blogController = require('./src/controllers/auth/blogController');
const sendOtpByEmailController = require('./src/controllers/auth/sendOtpByEmailController');
const getUserDetailsController = require('./src/controllers/auth/getUserDetails'); // Corrected import
const similarBlogsController = require('./src/controllers/auth/similarBlogsController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

mongoose.connect('mongodb+srv://taj:taj@cluster0.wzantar.mongodb.net/Blogger', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.post('/api/checkEmail', checkEmailController);
app.post('/api/resetPassword', resetPasswordController);
app.post('/api/login', loginController);
app.post('/api/signup', signupController);

// Blog routes
app.post('/api/blog', blogController.createBlog);
app.get('/api/blogs', blogController.getAllBlogs);
app.get('/api/blog/:blogId', blogController.getBlogById);
app.post('/api/blogs/:blogId/like', blogController.handleLike);
app.post('/api/blogs/:blogId/comment', blogController.handleComment);
app.delete('/api/blogs/:blogId/comment/:commentId', blogController.handleDeleteComment);

// Get user full name route
app.get('/api/getUserDetails/:email', getUserFullNameController.getUserDetails);

// Add the new route for fetching user details
app.get('/api/getUserDetails/:email', getUserDetailsController.getUserDetails); 

// Send OTP by email route
app.post('/api/sendOtpByEmail', sendOtpByEmailController);

app.get('/api/similar-blogs/:currentBlogId', similarBlogsController.getSimilarBlogs);

// Default route
app.get('/', (req, res) => {
  res.send('Hello, your server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
