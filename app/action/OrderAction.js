// app/actions/checkoutAction.js

import dbconnect from '@/db/dbconnect';
import Order from '@/model/OrderModel';


export async function createOrder(orderDetails, userId) {
  await dbconnect();

  try {
    // Create a new order in the database
    const order = await Order.create({
      ...orderDetails,
      paidAt: Date.now(),
      user: userId, // The user ID is passed here
    });

    return order;
  } catch (error) {
    throw new Error('Something went wrong while creating the order.');
  }
}
