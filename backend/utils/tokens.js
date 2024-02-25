const jwt = require("jsonwebtoken");

const createToken = (id, email, expiresIn) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  }); // here use secrets key for incryption of token

  return token;
};

module.exports = { createToken };
