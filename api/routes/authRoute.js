const express = require('express');

const router = express.Router();
const authController = require('../controller/authController.js');
const authToken = require('../middleware/authToken.js');
const userDetails = require('../controller/userDetails.js');

router.post('/signup', authController.signup);
router.post('/signin', authController.signIn);
router.get('/userdetails', authToken, userDetails);

module.exports = router;
