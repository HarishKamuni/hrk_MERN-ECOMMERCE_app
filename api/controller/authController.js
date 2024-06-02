const userModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      throw new Error('Please fill all the fields');
    }
    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error('User Already Exist.');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const userData = new userModel({
      name,
      email,
      password: hashPassword,
    });
    const saveUser = userData.save();
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: 'user created successfully!',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = signup;
