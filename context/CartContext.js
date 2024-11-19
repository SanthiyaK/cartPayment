"use client" // Ensure this runs only on the client

import React, { createContext, useState, useEffect } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider component to provide the cart state to other components
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load the cart from localStorage when the component is mounted on the client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  // Add product to cart and save to localStorage
  const addToCart = (product) => {
    // Initialize quantity as 1 when adding the product for the first time
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Remove product from cart by id and update localStorage
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Increase quantity in the cart, but ensure it doesn't exceed the stock
  const increaseQuantity = (productId, prodstock) => {
    const updatedCart = cart.map(item => {
      if (item._id === productId) {
        // Ensure quantity does not exceed stock
        if (item.quantity < prodstock) {
          return { ...item, quantity: item.quantity + 1 };
        }
      }
      return item;
    });

    setCart(updatedCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Decrease quantity in the cart, but ensure it doesn't go below 1
  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map(item => {
      if (item._id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setCart(updatedCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Export CartContext so it can be used directly
export { CartContext };
