const mongoose = require("mongoose");
const { Schema } = mongoose;
const GasswordSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  dateCreate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Gassword", GasswordSchema);
