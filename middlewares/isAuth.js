const jwt = require("jsonwebtoken");
require("dotenv").config();
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;

const isAuth = async (req, res, next) => {
  const headers = req.get("Authorization") || req.get("authorization");

  try {
    if (!headers) {
      const error = new Error("headers missing");
      error.statusCode = 400;
      throw error;
    }
    const token = headers.split(" ")[1];
    const decoded = await jwt.verify(token, accessTokenKey);

    req.role = decoded.userRole;
    req.email = decoded.userEmail;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuth;
