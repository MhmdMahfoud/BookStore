const mongoose = require("mongoose");
const CategorySchema = require("./CategorySchema");
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  price: {
    type: Number,
    require: true,
  },
  stouk: {
    type: Number,
    require: true,

    default: 0,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  discountPercentege: {
    type: Number,
    default: false,
  },

  coverImage: {
    type: String,
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});
module.exports = mongoose.model("Book", BookSchema);
