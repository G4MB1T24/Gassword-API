require("dotenv").config()
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI

const connectToMongo = () => {
  try {
    mongoose.connect(mongoURI, () => {
      console.log("Connected to MongoDB");
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("Connected successfully");
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToMongo;
