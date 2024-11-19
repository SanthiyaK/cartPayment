import dbconnect from "@/db/dbconnect";
import CartModel from "@/model/cartModel";  // Cart model
import Product from "@/model/ProductModel";  // Product model

// Increase quantity in cart and update product stock
export async function increaseQuantity({ productId}) {
  // Connect to the database
  await dbconnect();

  // Find the product in the Product collection
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Find the cart and the item in the cart
  const cart = await CartModel.findById(product).populate('product', 'stock')
  const cartItem = cart.items.find(item => item.product.toString() === productId);

  if (!cartItem) {
    throw new Error('Product not found in the cart');
  }

  // Check if there is enough stock to increase the quantity in the cart
  if (cartItem.quantity < product.stock) {
    // Increase the quantity in the cart item
    cartItem.quantity += 1;

    // Decrease the stock in the product
    product.stock -= 1;

    // Save the cart and the product
    await cart.save();
    await product.save();

    // Return the updated cart
    return cart.items;
  } else {
    throw new Error('Not enough stock');
  }
}

/* // Decrease quantity in cart and update product stock
export async function decreaseQuantity({ cartId, productId }) {
  // Connect to the database
  await dbconnect();

  // Find the product in the Product collection
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Find the cart and the item in the cart
  const cart = await CartModel.findById(cartId);
  const cartItem = cart.items.find(item => item.product.toString() === productId);

  if (!cartItem) {
    throw new Error('Product not found in the cart');
  }

  // Ensure that the quantity is greater than 1 before decreasing it
  if (cartItem.quantity > 1) {
    // Decrease the quantity in the cart item
    cartItem.quantity -= 1;

    // Increase the stock in the product
    product.stock += 1;

    // Save the cart and the product
    await cart.save();
    await product.save();

    // Return the updated cart
    return cart.items;
  } else {
    throw new Error('Quantity cannot be less than 1');
  }
} */
