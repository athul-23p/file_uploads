const mongoose = require("mongoose");

module.exports = mongoose.model(
  "gallery",
  new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true },
    pic: { type: String, require: true },
  })
);
