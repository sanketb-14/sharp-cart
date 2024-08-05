import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the product name"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"]
  },
  description: {
    type: String,
    required: [true, "Please provide the product description"],
    maxlength: [1000, "Description cannot exceed 1000 characters"]
  },
  price: {
    type: Number,
    required: [true, "Please specify the product price"],
    min: [0, "Price cannot be negative"]
  },
  category: {
    type: String,
    required: [true, "Please specify the product category"],
    enum: {
      values: ["electronics", "clothing", "books", "home", "other"],
      message: "Please select a valid category"
    }
  },
  inStock: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    required: [true, "Please specify the quantity"],
    min: [0, "Quantity cannot be negative"]
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide an image URL for the product"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;