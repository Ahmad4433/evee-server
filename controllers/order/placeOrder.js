const Order = require("../../models/Order");
const User = require("../../models/User");
const Cart = require("../../models/Cart");
const calculateOfferDate = require("../../utils/calculateOfferDate");
const getPayment = require("../../utils/stripePayment");
const Address = require("../../models/Address");
const joi = require("joi");
const placeOrder = async (req, res, next) => {
  const { error: validationError } = validateAddress(req.body);
  const userId = req.userId;
  const { address, city, phone, paymentMethod } = req.body;

  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const formatedMethod = paymentMethod.toString().toLowerCase();
    if (formatedMethod !== "card" && formatedMethod !== "cod") {
      const error = new Error("please choice payment method cod or card ");
      error.statusCode = 400;
      throw error;
    }

    const userCarts = await Cart.find({ user: userId }).populate([
      {
        path: "product",
      },
    ]);
    if (!userCarts) {
      const error = new Error("no cart found");
      error.statusCode = 400;
      throw error;
    }
    if (userCarts.length === 0) {
      const error = new Error("no item in the cart for order");

      error.statusCode = 400;
      throw error;
    }
    const findedUser = await User.findById(userId);

    const newAddress = new Address({
      address,
      city,
      mobile: phone,
    });
    const savedAddress = await newAddress.save();
    const orderTotal = userCarts.reduce((acc, curr) => {
      return (acc +=
        parseFloat(curr.quantity) * calculateOfferDate(curr.product));
    }, 0);

    const orderPurchse = userCarts.reduce((acc, curr) => {
      return (acc += parseFloat(curr.product.purchase) * curr.quantity);
    }, 0);

    const profit = parseFloat(orderTotal - orderPurchse);

    const calculatedShipping = parseFloat((orderTotal * 10) / 100);
    const orderDate = new Date().toLocaleString();

    const newOrder = new Order({
      user: userId,
      product: userCarts.map((pro) => {
        return {
          id: pro.product._id,
          name: pro.product.name,
          price: pro.product.price,
          offerPrice: calculateOfferDate(pro.product),

          quantity: pro.quantity,
          totalPrice: parseFloat(
            calculateOfferDate(pro.product) * pro.quantity
          ),
          image: req.domain + pro.product.images[0],
        };
      }),
      paymentMethod: formatedMethod,
      address: savedAddress._id,
      orderDate,
      profit,
      shipping: calculatedShipping,
      orderTotal: parseFloat(orderTotal + calculatedShipping),
    });

    const data = {
      month: 9,
      year: 25,
      amount: orderTotal,
      cvc: 123,
      number: 4242424242424242,
    };
    const status = await getPayment(data);
    if (status.status !== "succeeded") {
      const error = new Error("payment faild");
      error.statusCode = 400;
      throw error;
    }
    const savedOrder = await newOrder.save();
    findedUser.order.push(savedOrder._id);
    findedUser.cart = [];
    savedAddress.order = savedOrder._id;
    await savedAddress.save();
    await findedUser.save();
    await Cart.deleteMany({ user: userId });

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = placeOrder;

function validateAddress(data) {
  const addressSchema = joi.object({
    address: joi.string().min(2).required(),

    phone: joi
      .string()
      .pattern(/^[0-9]{11}$/)
      .required(),
    city: joi.string().min(4).required(),
    paymentMethod: joi.string().alphanum().min(3).max(4).required(),
  });

  return addressSchema.validate(data);
}
