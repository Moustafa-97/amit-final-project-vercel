const mongoose = require("mongoose");

const RawItems = new mongoose.Schema([

  {
    itemName: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },
]);
const rawItem = mongoose.model("rawItem", RawItems);

module.exports = { rawItem };
