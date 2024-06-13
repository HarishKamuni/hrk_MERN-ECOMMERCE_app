const userModel = require('../models/userModel');

const userDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    res.status(200).json({
      data: user,
      success: true,
      error: false,
      message: 'User Details',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: [],
      error: true,
      success: false,
    });
  }
};

const allUsers = async (req, res) => {
  try {
    // console.log('allUserId', req.userId);
    const allUsers = await userModel.find();
    res.status(200).json({
      message: 'All Users',
      data: allUsers,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const sessionId = req.userId;
    const { userId, email, name, role } = req.body;
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };
    const user = await userModel.findById(sessionId);
    console.log('user.role', user.role);
    const updatedUser = await userModel.findByIdAndUpdate(userId, payload);
    console.log('updatedUser', updatedUser);
    res.status(200).json({
      message: 'user updated successfully!!',
      data: updatedUser,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = { userDetails, allUsers, updateUser };
