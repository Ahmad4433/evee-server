const express = require("express");
require("dotenv").config();
const getConnection = require("./utils/getConnetction");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");
const cors = require("cors");
const sliderRoute = require("./routes/slider/slider");
const productRoute = require("./routes/products/product");
const featureRoute = require("./routes/feature/feature");
const servicesRoute = require("./routes/services/services");
const likeRoute = require("./routes/like/like");
const reviewRoute = require("./routes/review/review");
const userRoute = require("./routes/user/user");
const cartRoute = require("./routes/cart/cart");
const orderRoute = require("./routes/order/order");
const app = express();

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(getConnection);
app.use("/slider", sliderRoute);
app.use("/service", servicesRoute);
app.use("/product", productRoute);
app.use("/feature", featureRoute);
app.use("/like", likeRoute);
app.use("/review", reviewRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use(errorHandler);

app.listen(process.env.PORT, async () => {
  console.log(`server is running on port :${process.env.PORT}`);
});
