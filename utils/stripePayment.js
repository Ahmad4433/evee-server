require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API);
const getPayment = async (data) => {
  const charges = await stripe.charges.create({
    currency: "pkr",
    amount: parseFloat(data.amount) * 100,
    source: {
      object: "card",
      number: data.number,
      exp_month: data.month,
      exp_year: data.year,
      cvc: data.cvc,
    },
  });
  return charges;
};

module.exports = getPayment;
