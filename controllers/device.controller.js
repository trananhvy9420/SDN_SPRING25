const Device = require("../models/devices.model");
const mongoose = require("mongoose");
const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    const response = {
      message: "Devices fetched successfully",
      data: devices,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching devices:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getDeviceByID = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Device ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid device ID format" });
  }
  try {
    const existingDevice = await Device.findById(id);
    if (!existingDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    const response = {
      message: "Device fetched successfully",
      data: existingDevice,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching device by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const deleteDeviceByID = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Device ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid device ID format" });
  }
  try {
    const existingDevice = await Device.findById(id);
    if (!existingDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    const deletedDevice = await Device.findByIdAndDelete(id);
    if (!deletedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    const response = {
      message: "Device deleted successfully",
      device: deletedDevice,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error deleting device by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updateDeviceByID = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Device ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid device ID format" });
  }
  const { deviceName, deviceDescription, cost, saleOff, isFamous, model } =
    req.body;
  const updatedData = {};
  if (deviceName) {
    if (typeof deviceName !== "string" || deviceName.trim() === "") {
      return res
        .status(400)
        .json({ message: "Device name must be a non-empty string" });
    }
    const existingDevice = await Device.findOne({
      deviceName: deviceName,
      _id: { $ne: id },
    });
    if (existingDevice) {
      return res.status(400).json({ message: "Device name already exists" });
    }
    updatedData.deviceName = deviceName;
  }
  if (deviceDescription) {
    if (
      typeof deviceDescription !== "string" ||
      deviceDescription.trim() === ""
    ) {
      return res
        .status(400)
        .json({ message: "Device description must be a non-empty string" });
    }
    updatedData.deviceDescription = deviceDescription;
  }
  if (cost) {
    if (typeof cost !== "number" || cost < 0 || cost > 999999) {
      return res.status(400).json({ message: "Invalid cost value" });
    }
    updatedData.cost = cost;
  }
  if (saleOff) {
    if (typeof saleOff !== "number" || saleOff < 0 || saleOff > 1) {
      return res.status(400).json({ message: "Invalid saleOff value" });
    }
    updatedData.saleOff = saleOff;
  }
  if (isFamous !== undefined) {
    if (typeof isFamous !== "boolean") {
      return res.status(400).json({ message: "Invalid isFamous value" });
    }
    updatedData.isFamous = isFamous;
  }
  if (model) updatedData.model = model;

  try {
    const existingDevice = await Device.findById(id);
    if (!existingDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    const updatedDevice = await Device.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    const response = {
      message: "Device updated successfully",
      device: updatedDevice,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error updating device by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const createDevice = async (req, res) => {
  const { deviceName, deviceDescription, cost, saleOff, isFamous, model } =
    req.body;
  if (!deviceName || !deviceDescription) {
    return res
      .status(400)
      .json({ message: "Device name and description are required" });
  }
  if (!cost || typeof cost !== "number") {
    return res.status(400).json({ message: "Cost must be a valid number" });
  }
  if (typeof saleOff !== "number") {
    return res.status(400).json({ message: "SaleOff must be a valid number" });
  }
  if (typeof isFamous !== "boolean") {
    return res.status(400).json({ message: "isFamous must be a boolean" });
  }

  if (typeof deviceName !== "string") {
    return res.status(400).json({ message: "Device name must be a string" });
  }
  if (!deviceName || deviceName.trim() === "") {
    return res.status(400).json({ message: "Device name cannot be empty" });
  }
  if (typeof deviceDescription !== "string") {
    return res
      .status(400)
      .json({ message: "Device description must be a string" });
  }
  if (!deviceDescription || deviceDescription.trim() === "") {
    return res
      .status(400)
      .json({ message: "Device description cannot be empty" });
  }
  if (!cost || cost < 0 || cost > 999999) {
    return res.status(400).json({ message: "Invalid cost value" });
  }
  if (saleOff < 0 || saleOff > 1) {
    return res.status(400).json({
      message: "Invalid saleOff value(saleOff must be between 0 and 1)",
    });
  }
  if (!model) {
    return res.status(400).json({ message: "Model ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(model)) {
    return res.status(400).json({ message: "Invalid model ID format" });
  }
  try {
    const existingDevice = await Device.findOne({ deviceName: deviceName });
    if (existingDevice) {
      return res.status(400).json({ message: "Device name already exists" });
    }
    const newDevice = new Device({
      deviceName: deviceName,
      deviceDescription: deviceDescription,
      cost: cost,
      saleOff: saleOff,
      isFamous: isFamous,
      model: model,
    });
    const savedDevice = await newDevice.save();
    const response = {
      message: "Device created successfully",
      device: savedDevice,
    };
    return res.status(201).json(response);
  } catch (error) {
    console.error("Error creating device:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getAllDevices,
  getDeviceByID,
  deleteDeviceByID,
  updateDeviceByID,
  createDevice,
};
