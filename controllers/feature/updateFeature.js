const Feature = require("../../models/Feature");
const mongoose = require("mongoose");
const joi = require("joi");
const fs = require("fs");
const path = require("path");
const updateFeature = async (req, res, next) => {
  const { error: validationError } = validateFeature(req.body);
  const { featureId, title, detail } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(featureId)) {
      const error = new Error("invalid feature id");
      error.statusCode = 400;
      throw error;
    }

    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const findedFeature = await Feature.findById(featureId);
    if (!findedFeature) {
      const error = new Error("no feature found");
      error.statusCode = 400;
      throw error;
    }
    if (req.file) {
      fs.unlink(
        path.join(process.cwd()) + "/" + findedFeature.image,
        (error) => {}
      );
      findedFeature.title = title;
      findedFeature.detail = detail;
      findedFeature.image = req.file.path;
    } else {
      findedFeature.title = title;
      findedFeature.detail = detail;
      findedFeature.image = findedFeature.image;
    }

    await findedFeature.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {});
    }
    next(error);
  }
};

module.exports = updateFeature;

function validateFeature(data) {
  const featureSchema = joi.object({
    title: joi.string().min(2).required(),
    detail: joi.string().min(2).required(),
    image: joi.any().allow(null),
    featureId: joi.string().min(2).required(),
  });
  return featureSchema.validate(data);
}
