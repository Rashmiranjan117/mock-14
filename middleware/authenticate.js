const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    const decoded_token = jwt.verify(token, "masai");
    console.log(req.body.userId);
    if (decoded_token) {
      const userId = decoded_token.userId;
      req.body.userId = userId;
      next();
    } else {
      res.send("Login First");
    }
  } else {
    res.sed("token not found. login first");
  }
};

module.exports = { authenticate };
