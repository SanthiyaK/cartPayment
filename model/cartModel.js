// CartModel.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',  // Reference to Product model
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
  
}, { timestamps: true });

const CartModel = mongoose.models.Cart || mongoose.model('Cart', orderItemSchema);

export default CartModel;
