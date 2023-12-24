const mongoose = require("mongoose");
const servicesSchema = new mongoose.Schema({
  detail: {
    type: String,
  },
  product: { type: mongoose.Types.ObjectId, ref: "Product" },
});
module.exports = mongoose.model("Service", servicesSchema);
