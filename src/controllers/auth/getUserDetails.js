const SignUp = require('../../models/signUpModel');

const getUserDetails = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await SignUp.findOne({ email });

    if (user) {
      res.status(200).json({
        success: true,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture, // Assuming profilePicture is a field in your model
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { getUserDetails };
