const nodemailer = require('nodemailer');

const sendOtpByEmailController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Hardcoded email and password (not recommended for production)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gagguturutajkamal07@gmail.com',
        pass: 'xnja akbt sden xcak',
      },
    });

    // Email options
    const mailOptions = {
      from: 'gagguturutajkamal07@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for verification is: ${otp}`,
    };

    console.log('Before sending mail');

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('After sending mail');

    console.log(`OTP sent to ${email} via email: ${otp}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending OTP via email:', error.stack);
    res.status(500).json({ success: false, error: 'Failed to send OTP via email', errorMessage: error.message });
  }
};

module.exports = sendOtpByEmailController;
