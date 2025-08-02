const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const modelSchema = new Schema(
  {
    modelName: {
      type: String,
      required: true,
      unique: true,
    },
    modelDescription: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);
const Model = mongoose.model("Models", modelSchema);
module.exports = Model;
