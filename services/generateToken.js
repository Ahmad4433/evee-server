const jwt = require("jsonwebtoken");
require("dotenv").config();
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

const generateToken = async (data) => {
  const accessToken = await jwt.sign(
    { userEmail: data.email, userRole: data.role, userId: data.id },
    accessTokenKey,
    { expiresIn: "7d" }
  );
  const refreshToken = await jwt.sign(
    { userEmail: data.email, userRole: data.role, userId: data.id },
    refreshTokenKey,
    { expiresIn: "7d" }
  );

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = generateToken;
