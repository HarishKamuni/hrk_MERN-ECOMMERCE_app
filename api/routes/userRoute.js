const express = require('express');
const authToken = require('../middleware/authToken');
const {
  userDetails,
  allUsers,
  updateUser,
} = require('../controller/userController');

const router = express.Router();

router.get('/userdetails', authToken, userDetails);
router.get('/all-users', authToken, allUsers);
router.post('/update-user', authToken, updateUser);

module.exports = router;
