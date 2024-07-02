const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  service: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Service", ServiceSchema);
