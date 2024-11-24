"use client"; // Ensure this runs only on the client

import React, { createContext, useState, useEffect } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider component to provide the cart state to other components
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    name:'',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  // Load the cart from localStorage when the component is mounted on the client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      const savedShippingInfo = localStorage.getItem('shippingInfo');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      if (savedShippingInfo) {
        setShippingInfo(JSON.parse(savedShippingInfo));
      }
    }
  }, []);

  // Add product to cart and save to localStorage
  const addToCart = (product) => {
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

  // Set shipping information
  const setShippingDetails = (shippingData) => {
    setShippingInfo(shippingData);
    if (typeof window !== 'undefined') {
      // Save the updated shipping info to localStorage after state is set
      localStorage.setItem('shippingInfo', JSON.stringify(shippingData));
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      shippingInfo,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      setShippingDetails
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Export CartContext so it can be used directly
export { CartContext };
