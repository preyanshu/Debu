// models/Button.js
require("dotenv").config();
const databaseUri = process.env.MONGO_DB;
const mongoose = require("mongoose");
mongoose.connect(databaseUri).then(() => {
  console.log("Connected to MongoDB");
});
const ButtonSchema = new mongoose.Schema({
  width: { type: Number, default: 100 },
  height: { type: Number, default: 40 },
  roundedness: { type: Number, default: 5 },
  color: { type: String, default: "blue" },
  opacity: { type: Number, default: 1 },
  strokeWidth: { type: Number, default: 1 },
  strokeColor: { type: String, default: "black" },
  text: { type: String, default: "Default Text" },
  name: { type: String, default: "Default Name" },
  lastUpdated: { type: Date, default: Date.now },
});

const Button = mongoose.model("Button", ButtonSchema);
module.exports = Button;
