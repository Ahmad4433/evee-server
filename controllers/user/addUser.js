const User = require("../../models/User");
const joi = require("joi");
const bcrypt = require("bcrypt");

const addUser = async (req, res, next) => {
  const { error: validationError } = validateUser(req.body);
  const { name, email, password } = req.body;

  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }
    const isDuplicate = await User.findOne({ email: email });
    if (isDuplicate) {
      const error = new Error("this email is already taken");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = addUser;

function validateUser(data) {
  const userSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  return userSchema.validate(data);
}
