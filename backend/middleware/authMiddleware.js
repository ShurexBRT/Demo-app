const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Token comes trouh Authorization header: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next(); // allow further access
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorised access - invalid token' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Unauthorised access - missing token' });
  }
};

module.exports = { protect };
