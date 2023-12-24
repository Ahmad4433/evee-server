const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    order: { type: mongoose.Types.ObjectId, ref: "Order" },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Address", addressSchema);
