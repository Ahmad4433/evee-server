const mongoose = require("mongoose");
const sliderSchema = new mongoose.Schema(
  {
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slider", sliderSchema);
