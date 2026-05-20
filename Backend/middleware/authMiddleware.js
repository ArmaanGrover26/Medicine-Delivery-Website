const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Read token from HTTP-only cookie (not header)
  const token = req.cookies && req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    // Token is expired or invalid — clear the stale cookie
    res.clearCookie('auth_token');
    return res.status(401).json({ message: 'Token is not valid or has expired' });
  }
};