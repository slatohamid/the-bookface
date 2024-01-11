const jwt = require("jsonwebtoken");

exports.generateToken = (playload, expired) => {
  return jwt.sign(playload, process.env.TOKEN_SECRET, {expiresIn: expired});
};
