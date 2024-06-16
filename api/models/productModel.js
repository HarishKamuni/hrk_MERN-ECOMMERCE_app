const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    barndName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productImage: [],
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    selling: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = new mongoose.model('product', productSchema);
module.exports = ProductModel;
