const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
authRouter.route("/sigin").post(authController.signin);
module.exports = authRouter;
