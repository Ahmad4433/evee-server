const requestDomain = (req, res, next) => {
  try {
    const host = req.get("host");
    const protocol = req.protocol;
    const domain = protocol + "://" + host + "/";
    req.domain = domain;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = requestDomain;
