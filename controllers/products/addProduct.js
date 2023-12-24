const Product = require("../../models/Product");
const fs = require("fs");
const path = require("path");
const joi = require("joi");
const addProduct = async (req, res, next) => {
  const {
    name,
    price,
    detail,
    color,
    isActive,
    offerPer,
    offerStTime,
    offerEnTime,
    offerStDate,
    offerEnDate,
    shipping,
    purchase,
    stock,
    model,
  } = req.body;
  const { error: validationError } = validateProduct(req.body, isActive);
  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (isActive) {
      if (!dateRegex.test(offerStDate) || !dateRegex.test(offerEnDate)) {
        const error = new Error("please enter a valid date");
        error.statusCode = 400;
        throw error;
      }
      if (!timeRegex.test(offerStTime) || !timeRegex.test(offerEnTime)) {
        const error = new Error("please enter a valid time");
        error.statusCode = 400;
        throw error;
      }
    }

    const formatedName = name.toString().toLowerCase();

    const isDuplicate = await Product.findOne({ name: formatedName });
    if (isDuplicate) {
      const error = new Error("duplicate name not allowed");
      error.statusCode = 400;
      throw error;
    }

    let newProduct;
    if (isActive === "true") {
      newProduct = new Product({
        name: formatedName,
        price,
        detail,
        color,
        images: req.files.map((file) => {
          return file.path;
        }),
        purchase,
        shipping,
        stock: parseInt(stock),
        model,

        offer: {
          offerPer,
          offerStDate,
          offerEnDate,
          offerStTime,
          offerEnTime,
        },
      });
    } else {
      newProduct = new Product({
        name: formatedName,
        price,
        detail,
        color,
        images: req.files.map((file) => {
          return file.path;
        }),
        purchase,
        shipping,
        stock: parseInt(stock),
        model,
      });
    }

    const savedProduct = await newProduct.save();
    res.status(200).json({ message: "product created" });
  } catch (error) {
    req.files.map((file) => {
      const filePath = path.join(process.cwd()) + "/";

      fs.unlink(filePath + file.path, (err) => {});
    });

    next(error);
  }
};
module.exports = addProduct;

function validateProduct(data, isActive) {
  const productSchema = joi.object({
    name: joi.string().min(2).max(76).required(),
    price: joi.number().min(1).required(),
    color: joi.string().min(1).max(76).required(),
    detail: joi.string().min(1).required(),
    image: joi.any().allow(null),
    offerPer: isActive && joi.number().min(1).required(),
    offerStDate: joi.any().allow(null),
    offerEnDate: joi.any().allow(null),
    offerStTime: joi.any().allow(null),
    offerEnTime: joi.any().allow(null),
    isActive: joi.any().allow(null),
    shipping: joi.number().min(1).required(),
    purchase: joi.number().min(1).required(),
    stock: joi.number().min(1).required(),
    model: joi.string().min(2).required(),
  });

  return productSchema.validate(data);
}
