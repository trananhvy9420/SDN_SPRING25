const express = require("express");
const deviceRouter = express.Router();
const deviceController = require("../controllers/device.controller");
const { protectedRoute } = require("../middlewares/auth.middleware");
deviceRouter
  .route("/")
  .get(protectedRoute, deviceController.getAllDevices)
  .post(protectedRoute, deviceController.createDevice);
deviceRouter
  .route("/:id")
  .get(protectedRoute, deviceController.getDeviceByID)
  .put(protectedRoute, deviceController.updateDeviceByID)
  .delete(protectedRoute, deviceController.deleteDeviceByID);
module.exports = deviceRouter;
