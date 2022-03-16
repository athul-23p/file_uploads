const mongoose = require("mongoose");

const connect = () => mongoose.connect("mongodb://localhost:27017/file_uploads");

module.exports = connect;
