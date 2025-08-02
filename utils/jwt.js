const jwt = require("jsonwebtoken");

const generateToken = (payload, secret, expiresIn = "1h") => {
  if (!payload || Object.keys(payload).length === 0) {
    throw new Error("Payload cannot be empty.");
  }
  if (!secret) {
    throw new Error("JWT secret key must be provided.");
  }
  try {
    const token = jwt.sign(payload, secret, {
      expiresIn: expiresIn,
    });
    return token;
  } catch (error) {
    console.error("Error generating JWT:", error.message);
    throw new Error("Failed to generate token.");
  }
};
module.exports = {
  generateToken,
};
