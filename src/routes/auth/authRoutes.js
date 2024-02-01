// src/routes/auth/authRoutes.js
const express = require('express');
const checkEmailController = require('../../controllers/auth/checkEmailController');
const resetPasswordController = require('../../controllers/auth/resetPasswordController');
const loginController = require('../../controllers/auth/loginController');
const signupController = require('../../controllers/auth/signupController');

const router = express.Router();

router.post('/checkEmail', checkEmailController);
router.post('/resetPassword', resetPasswordController);
router.post('/login', loginController);
router.post('/signup', signupController);

module.exports = router;
