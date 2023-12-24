const Service = require("../../models/Service");
const mongoose = require("mongoose");
const Product = require("../../models/Product");

const deleteService = async (req, res, next) => {
  const { serviceId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      const error = new Error("invalid service id");
      error.statusCode = 400;
      throw error;
    }

    const deletedService = await Service.findByIdAndDelete(serviceId);
    const updatedProduct = await Product.findOneAndUpdate(
      { services: serviceId },
      { $pull: { services: serviceId } },
      { new: true }
    );
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteService;
