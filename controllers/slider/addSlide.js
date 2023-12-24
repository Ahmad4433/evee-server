const Slider = require("../../models/Slider");
const addSlide = async (req, res, next) => {
  try {
    const newSlider = new Slider({
      image: req.file.path,
    });
    const savedSlider = await newSlider.save();
    res.status(200).json({ message: "success", savedSlider });
  } catch (error) {
    next(error);
  }
};
module.exports = addSlide;
