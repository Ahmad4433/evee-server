const Feature = require("../../models/Feature");
const mongoose = require("mongoose");
const Product = require("../../models/Product");
const joi = require("joi");
const fs = require("fs");
const addFeature = async (req, res, next) => {
  const { error: validationError } = validateFeature(req.body);
  const { productId, title, detail } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      const error = new Error("invalidproduct id");
      error.statusCode = 400;
      throw error;
    }

    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const findedProduct = await Product.findById(productId);
    if (!findedProduct) {
      const error = new Error("no product found");
      error.statusCode = 400;
      throw error;
    }

    const createdFeature = new Feature({
      title,
      detail,
      image: req.file.path,
      product: findedProduct._id,
    });

    const savedFeature = await createdFeature.save();
    findedProduct.feature.push(savedFeature._id);
    await findedProduct.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    fs.unlink(req.file.path, (err) => {});

    next(error);
  }
};

module.exports = addFeature;

function validateFeature(data) {
  const featureSchema = joi.object({
    title: joi.string().min(2).required(),
    detail: joi.string().min(2).required(),
    image: joi.any().allow(null),
    productId: joi.string().min(2).required(),
  });
  return featureSchema.validate(data);
}
