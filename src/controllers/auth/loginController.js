// src/controllers/auth/loginController.js
const SignUp = require('../../models/signUpModel');
const LoginData = require('../../models/loginDataModel');

const loginController = async (req, res) => {
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
};

module.exports = loginController;
