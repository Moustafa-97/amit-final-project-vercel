const mongoose = require("mongoose");

const Orders = new mongoose.Schema({
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

const order = mongoose.model("order", Orders);
module.exports = { order };
