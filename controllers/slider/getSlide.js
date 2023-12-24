const Slider = require("../../models/Slider");
const getSlide = async (req, res, next) => {
  try {
    const findedSlider = await Slider.find().select("image");
    if (!findedSlider) {
      const error = new Error("no slider found");
      error.statusCode = 400;
      throw error;
    }

    const formatedSlider = findedSlider.map((slide) => {
      return {
        image: req.domain + slide.image,
        id: slide._id,
      };
    });

    res.status(200).json({ message: "success", formatedSlider });
  } catch (error) {
    next(error);
  }
};

module.exports = getSlide;
