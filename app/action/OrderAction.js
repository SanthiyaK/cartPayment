"use server"
import dbconnect from "@/db/dbconnect";  // Assuming this is your MongoDB connection utility
import Order from "@/model/OrderModel";  // Assuming Order model is located here

// Server action to handle order creation
export async function createOrder(totalPrice, cartItems, userId, shippingInfo) {
  try {
    // Connect to MongoDB
    await dbconnect();

    // Format cart items into an array of OrderItem objects
    const formattedItems = cartItems.map(item => ({
      productId: item._id,  // Ensure ObjectId is passed as is (it will be converted later)
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    console.log("userId:", userId);
    
    // Continue to create the order with formatted items
    const newOrder = new Order({
      totalPrice,
      items: formattedItems,
      user: userId,  // Safely use the formatted ObjectId
      shippingInfo
    });

    // Save the order to MongoDB
    const createdOrder = await newOrder.save();

    // Convert Mongoose object to plain object (removes Mongoose-specific methods)
    const plainOrder = createdOrder.toString();

    console.log("Created Order:", plainOrder);

    // Return the plain order object to the client
    return plainOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('There was an error creating the order. Please try again later.');
  }
}
