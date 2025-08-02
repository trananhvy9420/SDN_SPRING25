const User = require("../models/users.model");
const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const signin = async (req, res) => {
  const { us, pa } = req.body;
  if (!us || !pa) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    const user = await User.findOne({ us });
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }
    const isMatch = await bcrypt.compare(pa, user.pa);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    if (!process.env.SECRET_KEY) {
      console.error("SECRET_KEY environment variable is not set.");
      return res.status(500).json({ message: "Server configuration error" });
    }
    const token = generateToken(
      { id: user._id, us: user.us },
      process.env.SECRET_KEY || "default_secret_key",
      "1h"
    );
    if (!token) {
      return res.status(500).json({ message: "Token generation failed" });
    }
    return res.status(200).json({
      message: "Login successfully",
      access_token: token,
      user: {
        id: user._id,
        us: user.us,
      },
    });
  } catch (error) {
    console.error("Error signing in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  signin,
};
