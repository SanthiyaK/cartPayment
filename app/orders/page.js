// app/order-form/page.js or app/order-form/page.tsx (depending on your project setup)

import { getCartItems } from "../action/OrderAction";
import OrderList from "./OrderList";

 // Adjust the import path

// This is a server component in the App Router
export default async function OrderForm() {
  const cartItems = await getCartItems(); // Fetch cart items using server-side action

  // Calculate the total cost of all items in the cart
  const total = cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);
 
  return (
    <div className="order-form p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>

     <OrderList cartItems={cartItems} total={total} />
    </div>
  );
}
