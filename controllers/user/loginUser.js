const User = require("../../models/User");

const generateToken = require("../../services/generateToken");
const bcrypt = require("bcrypt");
const joi = require("joi");
const loginUser = async (req, res, next) => {
  const { error: validationError } = validateUser(req.body);
  const { email, password } = req.body;

  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }
    const findedUser = await User.findOne({ email: email });
    if (!findedUser) {
      const error = new Error("no user found");
      error.statusCode = 400;
      throw error;
    }

    const isMathched = await bcrypt.compare(password, findedUser.password);
    if (!isMathched) {
      const error = new Error("invalid password");
      error.statusCode = 400;
      throw error;
    }
    const data = {
      email: findedUser.email,
      role: findedUser.role,
      id: findedUser._id,
    };
    const { accessToken, refreshToken } = await generateToken(data);

    res.status(200).json({
      message: "success",
      accessToken,
      refreshToken,
      userId: findedUser._id,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = loginUser;
function validateUser(data) {
  const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });
  return userSchema.validate(data);
}
