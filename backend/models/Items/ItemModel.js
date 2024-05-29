const mongoose = require("mongoose");

const Items = new mongoose.Schema({
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
  },
  itemQuantities: {
    pizzaBoard: {
      type: Number,
      default: 0,
    },
    tomato: {
      type: Number,
      default: 0,
    },
    pepper: {
      type: Number,
      default: 0,
    },
    olive: {
      type: Number,
      default: 0,
    },
    cheese: {
      type: Number,
      default: 0,
    },
    chicken: {
      type: Number,
      default: 0,
    },
    salami: {
      type: Number,
      default: 0,
    },
    meat: {
      type: Number,
      default: 0,
    },
    sauce: {
      type: Number,
      default: 0,
    },
    onion: {
      type: Number,
      default: 0,
    },
  },
});

const oneItem = mongoose.model("item", Items);

module.exports = { oneItem };
