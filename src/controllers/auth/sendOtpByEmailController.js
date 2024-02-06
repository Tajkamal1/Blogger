// sendOtpByEmailController.js

const nodemailer = require('nodemailer');

const sendOtpByEmailController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gagguturutajkamal07@gmail.com', // Replace with your Gmail email
        pass: 'Tajk@12345', // Replace with your Gmail password
      },
    });

    // Email options
    const mailOptions = {
      from: 'gagguturutajkamal07@gmail.com', // Replace with your Gmail email
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for verification is: ${otp}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`OTP sent to ${email} via email: ${otp}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending OTP via email:', error.message);
    res.status(500).json({ success: false, error: 'Failed to send OTP via email' });
  }
};

module.exports = sendOtpByEmailController;
