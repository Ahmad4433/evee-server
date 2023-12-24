const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    product: [
      {
        type: Object,
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    orderTotal: {
      type: Number,
    },
    shipping: {
      type: Number,
    },
    status: {
      type: String,
      default: "accepted",
    },
    orderDate: {
      type: String,
    },
    profit: {
      type: Number,
    },
    address: { type: mongoose.Types.ObjectId, ref: "Address" },
    paymentMethod: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
