const express = require("express");
const modelRouter = express.Router();
const modelController = require("../controllers/model.controller");
const { protectedRoute } = require("../middlewares/auth.middleware");
modelRouter
  .route("/")
  .get(protectedRoute, modelController.getAllModels)
  .post(protectedRoute, modelController.createModel);
modelRouter
  .route("/:id")
  .get(protectedRoute, modelController.getAllModelByID)
  .delete(protectedRoute, modelController.deleteModelByID)
  .put(protectedRoute, modelController.updateModelByID);
module.exports = modelRouter;
