const Slider = require("../../models/Slider");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const updateSlide = async (req, res, next) => {
  const { slideId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(slideId)) {
      const error = new Error("invalid slideId");
      error.statusCode = 400;
      throw error;
    }

    const findedSlider = await Slider.findById(slideId);
    if (!findedSlider) {
      const error = new Error("no slide found");
      error.statusCode = 400;
      throw error;
    }
    const imagePath = path.join(process.cwd() + "/" + findedSlider.image);
    fs.unlink(imagePath, (err) => {});

    const deletedlide = await Slider.findByIdAndDelete(slideId);
    res.status(200).json({ message: "slide deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSlide;
