const Review = require("../../models/Review");
const mongoose = require("mongoose");
const Product = require("../../models/Product");
const fs = require("fs");

const addNewReview = async (req, res, next) => {
  const { productId, review, rating } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      const error = new Error("invalid product id");
      error.statusCode = 400;
      throw error;
    }
    if (rating) {
      if (isNaN(rating) || parseInt(rating) > 5 || parseInt(rating) < 1) {
        const error = new Error("please enter a valid rating between 1 and 5");
        error.statusCode = 400;
        throw error;
      }
    }

    if (review) {
      if (!isNaN(review)) {
        const error = new Error("please enter valid review in text");
        error.statusCode = 400;
        throw error;
      }
    }

    const findedProduct = await Product.findById(productId);
    if (!findedProduct) {
      const error = new Error("no product found");
      error.statusCode = 400;
      throw error;
    }

    if (req.files) {
      req.files.map((file) => {
        if (
          file.minetype !== "image/jpg" &&
          file.mimetype !== "image/jpeg" &&
          file.minetype !== "image/png"
        ) {
          const error = new Error("please choice a valid file formated");
          error.statusCode = 400;
          throw error;
        }
      });

      req.files.map((file) => {
        if (file.size > 1024 * 1024 * 3) {
          const error = new Error("you can upload image below then 3mb");
          error.statusCode = 400;
          throw error;
        }
      });
    }

    const newReview = new Review({
      rating,
      review,
      images: req.files.map((file) => {
        return file.path;
      }),
      product: findedProduct._id,
      user: req.userId,
    });

    const savedreview = await newReview.save();
    findedProduct.reviews.push(savedreview._id);
    await findedProduct.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    if (req.files) {
      req.files.map((file) => {
        fs.unlink(file.path, (err) => {});
      });
    }
    next(error);
  }
};

module.exports = addNewReview;
