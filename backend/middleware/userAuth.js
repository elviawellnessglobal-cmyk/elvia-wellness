const jwt = require("jsonwebtoken");

module.exports = function userAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    req.userEmail = null;
    return next(); // guest allowed
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;
    req.userEmail = decoded.email;

    next();
  } catch (err) {
    req.user = null;
    req.userEmail = null;
    next();
  }
};
