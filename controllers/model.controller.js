const Model = require("../models/models.model");
const mongoose = require("mongoose");
const getAllModels = async (req, res) => {
  try {
    const models = await Model.find();
    const response = {
      message: "Models fetched successfully",
      data: models,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching models:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getAllModelByID = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Model ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid model ID format" });
  }
  try {
    const model = await Model.findById(id);
    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }
    const response = {
      message: "Model fetched successfully",
      model: model,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching model by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const deleteModelByID = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Model ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid model ID format" });
  }
  try {
    const existingModel = await Model.findById(id);
    if (!existingModel) {
      return res.status(404).json({ message: "Model not found" });
    }
    const deletedModel = await Model.findByIdAndDelete(id);
    if (!deletedModel) {
      return res.status(404).json({ message: "Model not found" });
    }
    const response = {
      message: "Model deleted successfully",
      model: deletedModel,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error deleting model by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updateModelByID = async (req, res) => {
  const id = req.params.id;
  const { modelName, modelDescription } = req.body;
  if (!modelName || !modelDescription) {
    return res
      .status(400)
      .json({ message: "Model name and description are required" });
  }
  if (!id) {
    return res.status(400).json({ message: "Model ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid model ID format" });
  }
  try {
    const existingModel = await Model.findById(id);
    if (!existingModel) {
      return res.status(404).json({ message: "Model not found" });
    }
    const modelWithSameName = await Model.findOne({
      modelName: modelName,
      _id: { $ne: id },
    });
    if (modelWithSameName) {
      return res.status(400).json({ message: "Model name already exists" });
    }
    const updatedModel = await Model.findByIdAndUpdate(
      id,
      {
        modelName: modelName,
        modelDescription: modelDescription,
      },
      {
        new: true,
      }
    );
    if (!updatedModel) {
      return res.status(404).json({ message: "Model not found" });
    }
    const response = {
      message: "Model updated successfully",
      model: updatedModel,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error updating model by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const createModel = async (req, res) => {
  const { modelName, modelDescription } = req.body;
  if (!modelName || !modelDescription) {
    return res
      .status(400)
      .json({ message: "Model name and description are required" });
  }
  try {
    const existingModel = await Model.findOne({ modelName: modelName });
    if (existingModel) {
      return res.status(400).json({ message: "Model already exists" });
    }
    const newModel = new Model({
      modelName: modelName,
      modelDescription: modelDescription,
    });
    const savedModel = await newModel.save();
    const response = {
      message: "Model created successfully",
      model: savedModel,
    };
    return res.status(201).json(response);
  } catch (error) {
    console.error("Error creating model:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getAllModels,
  getAllModelByID,
  deleteModelByID,
  createModel,
  updateModelByID,
};
