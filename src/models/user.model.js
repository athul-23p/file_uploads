const mongoose = require("mongoose");

module.exports = mongoose.model(
  "user",
  new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    profile_pic: { type: String, require: false },
  },{
      timestamps:true
  })
);
