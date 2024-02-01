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
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const SignUp = mongoose.model('SignUp', {
  fullName: String,
  Email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const LoginData = mongoose.model('LoginData', {
  email: String,
  password: String,
  loginDateTime: { type: Date, default: Date.now }
});

// Check if the email exists in the SignUp collection
app.post('/api/checkEmail', async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await SignUp.exists({ Email: email });
    res.json({ exists: userExists });
  } catch (error) {
    console.error('Error checking email existence:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Additional route for handling password reset
app.post('/api/resetPassword', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const updatedUser = await SignUp.findOneAndUpdate({ Email: email }, { password: newPassword }, { new: true });

    if (updatedUser) {
      res.json({ success: true, message: 'Password reset successful' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error resetting password:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SignUp.findOne({ Email: email, password: password });

    if (user) {
      const loginData = new LoginData({ email, password });
      await loginData.save();
      res.status(200).json({ success: true, user, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error checking login credentials:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Signup route
app.post('/api/signup', async (req, res) => {
  try {
    const { fullName, Email, password } = req.body;
    const existingUser = await SignUp.findOne({ Email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already taken' });
    }

    const signup = new SignUp({ fullName, Email, password });
    await signup.save();
    res.status(201).json({ success: true, message: 'User registration successful' });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, your server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
