const Feature = require("../../models/Feature");
const Product = require("../../models/Product");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const deleteFeature = async (req, res, next) => {
  const { featureId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(featureId)) {
      const error = new Error("invalid featureId");
      error.statusCode = 400;
      throw error;
    }

    const findedFeature = await Feature.findById(featureId);

    if (!findedFeature) {
      const error = new Error("no feature found");
      error.statusCode = 400;
      throw error;
    }

    const deletdFeature = await Feature.findByIdAndDelete(featureId);
    fs.unlink(
      path.join(process.cwd()) + "/" + findedFeature.image,
      (err) => {}
    );
    const updatedProduct = await Product.findOneAndUpdate(
      { feature: featureId },
      { $pull: { feature: featureId } },
      { new: true }
    );

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteFeature;
