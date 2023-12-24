const mongoose = require("mongoose");
const featureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    detail: {
      type: String,
    },
    image: {
      type: String,
    },
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feature", featureSchema);
