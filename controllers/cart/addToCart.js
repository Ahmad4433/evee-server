const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const User = require("../../models/User");
const joi = require("joi");
const mongoose = require("mongoose");

const addToCart = async (req, res, next) => {
  const { quantity, productId } = req.body;
  const userId = req.userId;
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      const error = new Error("invaid product id");
      error.statusCode = 400;
      throw error;
    }

    const findedUser = await User.findById(userId);

    const findedProduct = await Product.findById(productId);
    if (!findedProduct) {
      const error = new error("no product found");
      error.statusCode = 400;
      throw error;
    }

    const findedCart = await Cart.findOne({ product: productId, user: userId });
    if (findedProduct.stock < parseInt(quantity)) {
      const error = new Error("your cannot exceed stock limit");
      error.statusCode = 400;
      throw error;
    }

    if (findedCart) {
      findedCart.quantity += parseInt(quantity);
      await findedCart.save();
    } else {
      const newtCart = new Cart({
        product: findedProduct._id,
        user: userId,
        quantity: parseInt(quantity),
      });
      const savedCart = await newtCart.save();
      findedUser.cart.push(savedCart._id);
      await findedUser.save();
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = addToCart;
