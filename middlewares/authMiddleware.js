const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access denied');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

exports.isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  if (user.role !== 'admin') {
    return res.status(403).send('Access denied');
  }
  next();
};
