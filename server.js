const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://taj:taj@cluster0.wzantar.mongodb.net/Login', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = mongoose.model('User', {
  email: String,
  password: String,
});

const SignUp = mongoose.model('SignUp', {
  fullName: String,
  usernameOrEmail: String,
  password: String,
});

const generateToken = () => {
  return Math.random().toString(36).substring(2, 15);
};

const ResetPassword = mongoose.model('ResetPassword', {
  usernameOrEmail: String,
  token: String,
  expiresAt: Date,
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// SignUp endpoint for registration
app.post('/api/signup', async (req, res) => {
  try {
    const { fullName, usernameOrEmail, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if the username or email is already registered
    const existingUser = await SignUp.findOne({ $or: [{ usernameOrEmail }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email is already taken' });
    }

    // Create a new signup
    const signup = new SignUp({ fullName, usernameOrEmail, password });
    await signup.save();

    res.status(201).json({ message: 'User registration successful' });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint for checking if the email exists in the Users collection
app.post('/api/check-email', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    const exists = !!user;

    res.status(200).json({ exists });
  } catch (error) {
    console.error('Error checking email:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint for initiating the forget password process
app.post('/api/forget-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if the email exists in the Users collection
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a token and store it in the database
    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

    const resetPassword = new ResetPassword({ email, token, expiresAt });
    await resetPassword.save();

    // In a real-world scenario, send the token to the user's email
    console.log(`Token for ${email}: ${token}`);

    // Update the password in the Users collection
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Token sent to email for password reset' });
  } catch (error) {
    console.error('Error initiating forget password:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Fetch user data endpoint
app.get('/api/userdata', async (req, res) => {
  try {
    const users = await User.find({}, 'email');
    res.json(users);
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, your server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
