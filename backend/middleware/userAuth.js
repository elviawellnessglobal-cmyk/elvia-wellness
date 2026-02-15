const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function userAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  // 🔹 No token → allow guest
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    req.userEmail = null;
    return next();
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 IMPORTANT FIX:
    // Fetch real user from database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      req.user = null;
      req.userEmail = null;
      return next();
    }

    // Now req.user is full user object
    req.user = user;
    req.userEmail = user.email;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    req.user = null;
    req.userEmail = null;
    next();
  }
};
