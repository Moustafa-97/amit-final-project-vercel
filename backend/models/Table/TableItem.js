const mongoose = require("mongoose");

const TableItem = new mongoose.Schema({
  // mongodb validation
  itemName: {
    type: String,
    required: [true, "Please enter the item name"],
    unique: true,
  },
  itemDescription: {
    type: String,
    required: [true, "Please enter item description"],
    unique: false,
  },
  price: {
    type: Number,
    required: [true, "Please enter item price"],
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    default:"Other"
  },
});

const tableItem = mongoose.model("tableItem", TableItem);

module.exports = { tableItem };

