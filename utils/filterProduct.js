const calculateOfferDate = require("../utils/calculateOfferDate");
const filterProduct = (data, req) => {
  const formatedProduct = data.map((pro) => {
    const ratingCount = pro.reviews.reduce((acc, curr) => {
      return (acc += curr.rating);
    }, 0);

    return {
      id: pro._id,
      name: pro.name,
      price: pro.price.toLocaleString("ur-PK", {
        style: "currency",
        currency: "PKR",
      }),
      detail: pro.detail,
      color: pro.color,
      images: pro.images.map((img) => {
        return req.domain + img;
      }),
      model: pro.model,
      sold: pro.sold,
      like: pro.like,
      stock: pro.stock,
      offerStartDate: pro.offer.offerStDate + " " + pro.offer.offerStTime,
      offerEndDate: pro.offer.offerEnDate + " " + pro.offer.offerEnTime,
      services: pro.services.map((ser) => {
        return {
          id: ser._id,
          service: ser.detail,
        };
      }),
      features: pro.feature.map((feature) => {
        return {
          id: feature._id,
          title: feature.title,
          detail: feature.detail,
          image: req.domain + feature.image,
        };
      }),

      review: pro.reviews.map((review) => {
        return {
          id: review._id,
          rating: review.rating,
          review: review.review,
          images: req.domain + review.images,
          date: new Date(review.createdAt).toLocaleString(),
          userName: review.user.name,
          emailEmail: review.user.email,
        };
      }),
      ratingCount: ratingCount,
      ratingAverage: Math.floor(ratingCount / pro.reviews.length),
      offerPercetange:
        calculateOfferDate(pro) === pro.price ? 0 : pro.offer.offerPer,
      offerPrice: calculateOfferDate(pro).toLocaleString("ur-PK", {
        style: "currency",
        currency: "PKR",
      }),
      shipping: pro.shipping.toFixed(2),
      purchase: req.role === "user" && pro.purchase.toFixed(2),
      margin: calculateOfferDate(pro) - pro.purchase.toFixed(2),
    };
  });

  return formatedProduct;
};

module.exports = filterProduct;
