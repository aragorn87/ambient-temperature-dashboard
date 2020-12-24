const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let reading = new Schema(
  {
    ts: {
      type: Number
    },
    value: {
      type: mongoose.Types.Decimal128
    }
  },
);

module.exports = mongoose.model("temperature", reading);