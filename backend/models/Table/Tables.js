const mongoose = require("mongoose");
const { type } = require("os");

const Tables = new mongoose.Schema({
  orderDetails: {
    type: Object,
  },
  totalPrice: {
    type: Number,
  },
  payment: {
    type: String,
  },
  _sessionId: {
    type: String,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  served: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

const table = mongoose.model("table", Tables);
module.exports = { table };
