const jwt = require('jsonwebtoken');
const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(400).json({
        message: 'User Not Login',
        error: true,
        success: false,
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      console.log('decoded', decoded);
      if (err) {
        console.log(err);
      }
      req.userId = decoded?._id;
      next();
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
      data: [],
    });
  }
};
module.exports = authToken;
