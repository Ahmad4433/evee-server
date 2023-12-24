const calculateOfferDate = (data) => {
  const isOfferEnded =
    new Date(data.offer.offerEnDate + " " + data.offer.offerEnTime).getTime() <=
    new Date().getTime();

  const offerPrice = !isOfferEnded
    ? parseFloat(data.price) -
      parseFloat(data.offer.offerPer * data.price) / 100
    : data.price;

  return offerPrice;
};

module.exports = calculateOfferDate;
