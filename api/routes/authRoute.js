const express = require('express');

const router = express.Router();
const authController = require('../controller/authController.js');

router.post('/signup', authController.signup);
router.post('/signin', authController.signIn);

module.exports = router;
