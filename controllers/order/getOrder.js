const Order = require("../../models/Order");
const User = require("../../models/User");
const getOrder = async (req, res, next) => {
  try {
    const findedOrder = await Order.find().populate([
      {
        path: "user",
        select: "name email",
      },
      {
        path: "address",
        select: "address city mobile",
      },
    ]);

    const sortedOrder = findedOrder.map((order) => {
      return {
        orderDetail: {
          orderId: order._id,
          orderPlaceDate: order.orderDate,
          shipping: order.shipping,
          totalAmount: order.orderTotal,
          nextProfit: order.profit,
          status: order.status,
          paymentMethod: order.paymentMethod,
        },
        userDetail: {
          userId: order.user._id,
          userName: order.user.name,
          userEmail: order.user.email,
        },

        address: order.address,

        products: order.product,
      };
    });

    res.status(200).json({ message: "success", sortedOrder });
  } catch (error) {
    next(error);
  }
};

module.exports = getOrder;
