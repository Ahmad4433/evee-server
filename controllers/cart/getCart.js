const User = require("../../models/User");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const calculateOfferDate = require("../../utils/calculateOfferDate");

const getCart = async (req, res, next) => {
  const userId = req.userId;

  try {
    const findedCart = await User.findById(userId).populate([
      {
        path: "cart",
        populate: [
          {
            path: "product",
          },
        ],
      },
    ]);
    // if (!findedCart) {
    //   const error = new Error("no item in cart");
    //   error.statusCode = 400;
    //   throw error;
    // }

    const cartTotal = findedCart.cart
      .reduce((acc, cur) => {
        return (acc +=
          parseFloat(cur.quantity) * calculateOfferDate(cur.product));
      }, 0)
      .toFixed(2);

    const userInfo = {
      name: findedCart.name,
      email: findedCart.email,
    };

    const formatedCart = findedCart.cart.map((cart) => {
      return {
        product: {
          name: cart.product.name,
          quantity: cart.quantity,
          productPrice: cart.product.price,
          offerPrice: calculateOfferDate(cart.product),
          totalPrice:
            calculateOfferDate(cart.product) *
            parseFloat(cart.quantity).toFixed(2),
          images: cart.product.images[0],
        },
      };
    });

    res.status(200).json({
      message: "success",
      cartTotal,
      userInfo,
      formatedCart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCart;
