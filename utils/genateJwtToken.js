const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateJwtToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '24h' },
    { algorithm: "HS256" }
  );
};

module.exports = { generateJwtToken };