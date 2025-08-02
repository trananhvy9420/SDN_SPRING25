const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deviceSchema = new Schema(
  {
    deviceName: {
      type: String,
      required: true,
      unique: true,
    },
    deviceDescription: {
      type: Object,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
      max: 999999,
    },
    saleOff: {
      type: Number,
      required: true,
      max: 1,
    },
    isFamous: {
      type: Boolean,
      default: false,
    },
    model: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Models",
      required: true,
    },
  },
  { timestamps: true }
);
const Devices = mongoose.model("devices", deviceSchema);
module.exports = Devices;
