const userModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      throw new Error('Please fill all the fields');
    }
    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error('User Already Exist.');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    if (!hashPassword) {
      throw new Error('Something is wrong!!');
    }
    const userData = new userModel({
      ...req.body,
      role: 'GENERAL',
      password: hashPassword,
    });

    const saveUser = userData.save();
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: 'User created successfully!',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Please fill all the fields');
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error('User Not Found!!');
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw new Error('Invailid email or password!!');
    } else {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      res.cookie('token', token, tokenOption).status(201).json({
        data: token,
        success: true,
        error: false,
        message: 'Login Successfully!!',
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
};

const LogOut = async (req, res) => {
  try {
    res.clearCookie('token');

    res.status(200).json({
      error: false,
      success: true,
      message: 'User Logged Out Successfully!!',
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
};

module.exports = { signup, signIn, LogOut };
