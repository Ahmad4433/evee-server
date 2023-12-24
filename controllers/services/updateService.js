const Services = require("../../models/Service");
const mongoose = require("mongoose");
const joi = require("joi");

const updateService = async (req, res, next) => {
  const { error: validationError } = validateDetail(req.body);
  const { serviceId, detail } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      const error = new Error("invalid service id");
      error.statusCode = 400;
      throw error;
    }
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }
    const findedService = await Services.findById(serviceId);

    if (!findedService) {
      const error = new Error("no service found");
      error.statusCode = 400;
      throw error;
    }
    findedService.detail = detail;
    await findedService.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateService;
function validateDetail(data) {
  const detailSchema = joi.object({
    detail: joi.string().min(2).required(),
    serviceId: joi.string().min(2).required(),
  });
  return detailSchema.validate(data);
}
