"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ShippingPage() {
  const [shippingInfo, setShippingInfo] = useState(null);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedShippingInfo = localStorage.getItem("shippingInfo");
    const storedCart = localStorage.getItem("cart");

    if (storedShippingInfo) {
      setShippingInfo(JSON.parse(storedShippingInfo));
    } else {
      router.push("/shipping-form"); // Redirect if no shipping info is found
    }

    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Load the cart info if it's available in localStorage
    }
  }, [router]);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const shippingPrice = 10.00;
  const totalPrice = (subtotal + tax + shippingPrice).toFixed(2);

  const processPayment = () => {
    const data = {
      itemsPrice: subtotal.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      taxPrice: tax.toFixed(2),
      totalPrice
    };

    // Store order details in sessionStorage
    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    // Redirect to the payment page
    router.push("/payment");
  };

  if (!shippingInfo || cart.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shipping-page">
      <h2 className="text-2xl font-bold mb-6">Confirm Your Order</h2>

      {/* Shipping Information */}
      <div className="space-y-4">
        <p className="font-semibold text-lg">Shipping Information:</p>
        <ul className="space-y-2">
          <li><strong>Full Name:</strong> {shippingInfo.fullName}</li>
          <li><strong>Address:</strong> {shippingInfo.address}</li>
          <li><strong>City:</strong> {shippingInfo.city}</li>
          <li><strong>Postal Code:</strong> {shippingInfo.postalCode}</li>
          <li><strong>Phone Number:</strong> {shippingInfo.phoneNumber}</li>
        </ul>
      </div>

      {/* Cart Information */}
      <div className="space-y-4 mt-6">
        <p className="font-semibold text-lg">Cart Summary:</p>
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item._id} className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        
        {/* Subtotal */}
        <div className="flex justify-between font-semibold">
          <p>Subtotal:</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        
        {/* Tax */}
        <div className="flex justify-between font-semibold">
          <p>Tax (8%):</p>
          <p>${tax.toFixed(2)}</p>
        </div>

        {/* Shipping Price */}
        <div className="flex justify-between font-semibold">
          <p>Shipping:</p>
          <p>${shippingPrice.toFixed(2)}</p>
        </div>

        {/* Total Price */}
        <div className="flex justify-between font-semibold">
          <p>Total:</p>
          <p>${totalPrice}</p>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={processPayment}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
