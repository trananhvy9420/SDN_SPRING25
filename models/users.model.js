const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    us: {
      type: String,
      required: true,
      unique: true,
    },
    pa: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);
const Users = mongoose.model("users", userSchema);
module.exports = Users;
