"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ShippingForm() {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phoneNumber: ''
  });

  const router = useRouter();

  // Retrieve userId from localStorage (assuming the user is logged in)
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    // Redirect to login page if no userId exists
    if (!userId) {
      router.push("/login");
      return;
    }

    // Pre-fill the form with existing shipping info if available
    const storedShippingInfo = localStorage.getItem(`shippingInfo_${userId}`);
    if (storedShippingInfo) {
      setShippingInfo(JSON.parse(storedShippingInfo));
    }
  }, [userId, router]);

  // Validate the shipping information form
  const validateForm = () => {
    // Simple validation to check if all fields are filled
    return Object.values(shippingInfo).every((value) => value.trim() !== '');
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form before proceeding
    if (!validateForm()) {
      alert('Please fill in all fields!');
      return;
    }

    // Save the shipping info in localStorage for the specific user
    localStorage.setItem(`shippingInfo_${userId}`, JSON.stringify(shippingInfo));

    // Reset the form fields by clearing the state
    setShippingInfo({
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      phoneNumber: ''
    });

    // Redirect to the order confirmation page
    router.push('/order-confirm');
  };

  // Handle form field change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  return (
    <div className="shipping-form">
      <h2 className="text-2xl font-bold mb-6">Enter Shipping Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-gray-700">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingInfo.city}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="postalCode" className="block text-gray-700">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={shippingInfo.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Save and Continue
        </button>
      </form>
    </div>
  );
}
