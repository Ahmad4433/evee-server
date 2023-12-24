const validateFile = (isSingle) => {
  const fs = require("fs");
  return async (req, res, next) => {
    try {
      if (isSingle) {
        if (!req.file) {
          const error = new Error("image is required");
          error.statusCode = 400;
          throw error;
        }
        if (req.file.size > 1024 * 1024 * 3) {
          const error = new Error("image size must be less then 3mb");
          error.statusCode = 400;
          throw error;
        }
        if (
          req.file.mimetype !== "image/jpeg" &&
          req.file.mimetype !== "image/png" &&
          req.file.mimetype !== "image/jpg"
        ) {
          const error = new Error("please choice a valid format image");
          error.statusCode = 400;
          throw error;
        }
      } else {
        if (!req.files || req.files.length < 1) {
          const error = new Error("image is required");
          error.statusCode = 400;
          throw error;
        }
        req.files.map((file) => {
          if (file.size > 1024 * 1024 * 3) {
            const error = new Error("image size must be less then 3mb");
            error.statusCode = 400;
            throw error;
          }
        });
        req.files.map((file) => {
          if (
            file.mimetype !== "image/jpeg" &&
            file.mimetype !== "image/png" &&
            file.mimetype !== "image/jpg"
          ) {
            const error = new Error("please choice a valid format image");
            error.statusCode = 400;
            throw error;
          }
        });
      }
      next();
    } catch (error) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {});
      }
      if (req.files.length) {
        req.file.map((file) => fs.unlink(file.path, (error) => {}));
      }

      next(error);
    }
  };
};
module.exports = validateFile;
