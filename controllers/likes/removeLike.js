const Product = require("../../models/Product");
const mongoose = require("mongoose");

const removeLike = async (req, res, next) => {
  const { productId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      const error = new Error("invalid product id");
      error.statusCode = 400;
      throw error;
    }
    const findedProduct = await Product.findById(productId);
    if (!findedProduct) {
      const error = new Error("no product found");
      error.statusCode = 400;
      throw error;
    }

    if (findedProduct.like === 0) {
      const error = new Error("like count alredy 0");
      error.statusCode = 400;
      throw error;
    }

    findedProduct.like--;
    await findedProduct.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeLike;
