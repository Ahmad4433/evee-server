const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    fpOtp: {
      type: Number,
    },
    fpOtpExp: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    order: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
      },
    ],
    cart: [{ type: mongoose.Types.ObjectId, ref: "Cart" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
