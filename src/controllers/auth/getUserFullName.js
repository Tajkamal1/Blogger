const SignUp = require('../../models/signUpModel');

const getUserFullName = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await SignUp.findOne({ Email: email }, 'fullName');

    if (user) {
      res.status(200).json({ fullName: user.fullName });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user full name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getUserFullName };
