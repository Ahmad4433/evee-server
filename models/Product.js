const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    color: {
      type: String,
    },
    images: [{ type: String }],
    detail: {
      type: String,
    },
    feature: [{ type: mongoose.Types.ObjectId, ref: "Feature" }],
    like: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    offer: {
      offerPer: { type: Number, default: 0 },
      offerStDate: { type: String },
      offerEnDate: { type: String },
      offerStTime: { type: String },
      offerEnTime: { type: String },
    },
    shipping: {
      type: Number,
      default: 0,
    },
    purchase: {
      type: Number,
      default: 0,
    },
    margin: {
      type: Number,
      default: 0,
    },
    services: [{ type: mongoose.Types.ObjectId, ref: "Service" }],
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    model: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
