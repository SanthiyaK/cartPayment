"use client";

import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../action/PaymentAction";
import { useRouter } from "next/navigation";
import { createOrder } from "../action/OrderAction";

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);  // Added status (loading, success, error)
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  useEffect(() => {
    const orderInfo = sessionStorage.getItem("orderInfo");

    if (orderInfo) {
      const { totalPrice } = JSON.parse(orderInfo);
      setTotalPrice(totalPrice);

      // Call your backend to create the payment intent with the total amount
      async function getPaymentIntent() {
        const result = await createPaymentIntent(totalPrice); // Pass the total price

        // Ensure that the result is plain and serializable
        if (result && result.clientSecret) {
          setClientSecret(result.clientSecret);
        } else {
          console.error("Failed to create payment intent.");
          setPaymentStatus("error");
        }
      }

      getPaymentIntent();
    } else {
      console.log("No order information found.");
      setPaymentStatus("error"); // If no order data is found, mark the payment status as error
    }
  }, []);

  const handleSubmit = async () => {
    if (!stripe || !elements || !clientSecret) {
      setPaymentStatus("error");
      return; // Stripe.js has not loaded or elements are not ready
    }
  
    const cardElement = elements.getElement(CardElement);
    setPaymentStatus("loading"); // Show loading while waiting for payment confirmation
  
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
  
      if (error) {
        console.error("Stripe error:", error);
        setPaymentStatus("error");
      } else {
        // Retrieve userId from localStorage
        const userId = localStorage.getItem("userId");
  
        if (!userId) {
          throw new Error("User ID is not found. Please log in again.");
        }
  
        // Retrieve cart data from localStorage for this specific user
        const cartItems = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
  
        // Retrieve shipping info from localStorage
        const storedShippingInfo = JSON.parse(localStorage.getItem(`shippingInfo_${userId}`)) || {};
  
        // Call createOrder with cart items, total price, user ID, and shipping info
        const newOrder = await createOrder(totalPrice, cartItems, userId, storedShippingInfo);
        console.log('Order created:', newOrder);
  
        if (paymentIntent.status === "succeeded") {
          setPaymentStatus("success");
          
          // Clear the cart from localStorage after successful payment
          localStorage.removeItem(`cart_${userId}`); // Remove the user's cart
  
          setTimeout(() => {
            router.push("/payment-success");
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setPaymentStatus("error");
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment Page</h2>

      {paymentStatus === "loading" && <p className="text-gray-500">Processing payment...</p>}

      {paymentStatus === "success" ? (
        <div className="text-green-500">
          <h3 className="text-2xl font-semibold">Payment Successful!</h3>
          <p className="mt-2">Thank you for your purchase! Your payment has been successfully processed.</p>
        </div>
      ) : paymentStatus === "error" ? (
        <div className="text-red-500">
          <h3 className="text-2xl font-semibold">Payment Failed</h3>
          <p className="mt-2">There was an error processing your payment. Please try again later.</p>
        </div>
      ) : (
        <>
          {clientSecret ? (
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">
                  Card Information
                </label>
                <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
                  <CardElement
                    id="card-element"
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#32325d',
                          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                          fontSmoothing: 'antialiased',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#fa755a',
                          iconColor: '#fa755a',
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!stripe || paymentStatus === "loading"}
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
              >
                Pay ${totalPrice}
              </button>
            </form>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </div>
  );
}
