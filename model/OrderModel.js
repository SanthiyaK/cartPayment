// models/Order.js

import mongoose from 'mongoose';

// Define the OrderItem schema to hold details about each item in the order
const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
});

// Define the Order schema which includes an array of items (OrderItemSchema)
const orderSchema = new mongoose.Schema(
  {
    totalPrice: {
      type: Number,
      required: true
    },
    items: {
      type: [OrderItemSchema],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,  // Reference to User model
      ref: "UserModels",  // Assuming you have a User model
      required: true  // Make sure this field is required
    },
    shippingInfo: {  // New field to store shipping details
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      phoneNumber: { type: String, required: true }
    }
  },
  {
    timestamps: true,  // Automatically includes createdAt and updatedAt fields
  }
);

// Ensure the model is cached (important for serverless environments like Next.js)
let Order = mongoose.models.OrderMode || mongoose.model('OrderMode', orderSchema);

export default Order;
