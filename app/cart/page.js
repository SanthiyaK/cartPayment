"use client";

import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const router = useRouter(); 
  const handleIncreaseQuantity = (productId, prodstock) => {
    increaseQuantity(productId, prodstock); // This function should update the cart in the context
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId); // This function should update the cart in the context
  };

  // Calculate total quantity of items in cart
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const handleCheckout = () => {
    // Check if the user is logged in by checking the token in localStorage
    const token = localStorage.getItem('token');  // or you can check cookies if that's where the token is stored

    if (token) {
      // If logged in, redirect to the shipping page
      router.push("/shipping");
    } else {
      // If not logged in, redirect to the login page with the redirect parameter
      router.push("/");
    }
  };
  return (
    <div className="cart mt-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart ({cart.length} items)</h2>

      {/* Cart Items List */}
      <ul className="space-y-6">
        {cart.map((item) => (
          <li key={item._id} className="flex items-center justify-between p-4 border-b-2 border-gray-200">
            <div className="flex items-center space-x-4">
              {/* Product Image */}
              <Image src={item.image} alt={item.name} width={75} height={75} className="rounded-md" />

              {/* Product Details */}
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-sm text-gray-700">${item.price}</p>
              </div>
            </div>

            {/* Quantity Controls and Remove Button */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {/* Increase Quantity Button */}
                <button
                  onClick={() => handleIncreaseQuantity(item._id, item.stock)}
                  className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                >
                  +
                </button>

                {/* Decrease Quantity Button */}
                <button
                  onClick={() => handleDecreaseQuantity(item._id)}
                  className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                >
                  -
                </button>
              </div>

              {/* Display Current Quantity */}
              <div className="text-sm text-gray-700">Qty: {item.quantity}</div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Cart Summary */}
      <div className="mt-6 space-y-4">
        <h3 className="font-semibold text-xl">Cart Summary</h3>
        <div className="flex justify-between">
          <p>Total Items:</p>
          <p>{cart.length}</p> {/* Number of unique products in the cart */}
        </div>
        <div className="flex justify-between">
          <p>Total Quantity:</p>
          <p>{totalQuantity}</p> {/* Total quantity of products in the cart */}
        </div>
        <div className="flex justify-between font-semibold">
          <p>Total Price:</p>
          <p>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
        </div>
      </div>

      {/* Checkout Button */}
      {cart.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button  onClick={handleCheckout}  className="px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors duration-200">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
