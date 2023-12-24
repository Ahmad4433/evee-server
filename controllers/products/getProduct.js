const Product = require("../../models/Product");

const filterProduct = require("../../utils/filterProduct");

const getProduct = async (req, res, next) => {
  try {
    const findedProduct = await Product.find().populate([
      {
        path: "feature",
      },
      {
        path: "services",
      },
      {
        path: "reviews",
        populate: [
          {
            path: "user",
          },
        ],
      },
    ]);

    const formatedProduct = filterProduct(findedProduct, req);

    res.status(200).json({ message: "success", formatedProduct });
  } catch (error) {
    next(error);
  }
};

module.exports = getProduct;
