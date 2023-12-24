const mongoose = require("mongoose");
require("dotenv").config();
const getConnection = async (req, res, next) => {
  try {
    const connection = await mongoose.connect(process.env.MONGOOSE_URI);
    if (connection) {
      console.log("db is connected");
    }

    mongoose.connection.on("error", (error) => {
      if (error) {
        const error = new Error("something went wrong");
        error.statusCode = 400;
        throw error;
      }
    });

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = getConnection;
