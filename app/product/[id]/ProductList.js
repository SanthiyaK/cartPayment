"use client";

import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

export default function ProductList({ product }) {
  const { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const [userId, setUserId] = useState(null); // State for storing userId

  useEffect(() => {
    // Get userId from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // Handle case where userId is not found (e.g., user is not logged in)
      console.log("No user ID found. Please log in.");
    }
  }, []);

  // Check if the product is already in the cart for a specific user
  const isProductInCart = () => {
    if (userId) {
      const userCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      const filteredItems = userCart.filter(item => item._id === product._id);
      return filteredItems.length > 0;
    }
    return false;
  };

  const handleAddToCart = async () => {
    if (userId) {
      await addToCart(product, userId);
    }
  };

  const handleRemoveFromCart = (productId) => {
    if (userId) {
      removeFromCart(productId, userId);
    }
  };

  const handleIncreaseQuantity = (productId, prodstock) => {
    if (userId) {
      increaseQuantity(productId, prodstock, userId);
    }
  };

  const handleDecreaseQuantity = (productId) => {
    if (userId) {
      decreaseQuantity(productId, userId);
    }
  };

  return (
    <>
      <div className="product-item border p-4 mb-4">
        <div className="product-image mb-4">
          <Image src={product.image} alt={product.name} width={200} height={300} priority={true} />
        </div>
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-gray-700 mb-4">${product.price}</p>
        <button 
          onClick={handleAddToCart} 
          className="bg-sky-600 text-white py-2 px-4 rounded"
          disabled={isProductInCart()} // Disable button if product is already in the cart for this user
        >
           {isProductInCart() ? 'Already In Cart' : 'Add to Cart'}
        </button>
      </div>

      {/* Cart Display for specific user */}
      {userId && (
        <div className="cart mt-6">
          <h2>Cart: {cart.length}</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <Image src={item.image} alt={item.name} width={50} height={50} layout="intrinsic" />
                <div>{item.name}</div>
                <div>{item.description}</div>
                <div>${item.price}</div>
                <div>Quantity: {item.quantity}</div>

                <button 
                  onClick={() => handleIncreaseQuantity(item._id, item.stock)} 
                  className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                >
                  +
                </button>

                <button 
                  onClick={() => handleDecreaseQuantity(item._id)} 
                  className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                >
                  -
                </button>

                <button onClick={() => handleRemoveFromCart(item._id)} className="text-red-500 ml-4">
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div>
            <h3>Total Items in Cart: {cart.length}</h3>
            <h3>
              Total Price: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </h3>
          </div>
        </div>
      )}
    </>
  );
}
