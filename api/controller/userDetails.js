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
module.exports = userDetails;
