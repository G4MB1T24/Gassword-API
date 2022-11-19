const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  mpin: {
    type: Number,
    require : true
  }
  
});
const Users = mongoose.model("Users", UserSchema);
module.exports = Users;