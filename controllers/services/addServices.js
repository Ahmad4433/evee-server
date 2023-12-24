const Service = require("../../models/Service");
const Product = require("../../models/Product");
const mongoose = require("mongoose");
const joi = require("joi");
const addServices = async (req, res, next) => {
  const { error: validationError } = validateService(req.body);
  const { detail, productId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      const error = new Error("invalid product id");
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

    const newService = new Service({
      detail: detail,
      product: findedProduct._id,
    });
    const savedService = await newService.save();
    findedProduct.services.push(savedService._id);
    await findedProduct.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = addServices;
function validateService(data) {
  const serviceSchema = joi.object({
    detail: joi.string().min(2).required(),
    productId: joi.string().min(2).required(),
  });

  return serviceSchema.validate(data);
}
