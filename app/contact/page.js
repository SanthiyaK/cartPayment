"use client"
import { useState } from "react";
import { sendEmail } from "../action/ContactAction";

export default function ContactForm() {
     const [message,setMessage]=useState()
  const handleSubmit = async (formData) => {
    
    const result = await sendEmail(formData);
    if (result.success) {
        setMessage(result.message)
        setTimeout(()=>{
            setMessage(null);
        },2000)
    }
  };

  return (
    <>
      <form
        action={handleSubmit}
        className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Contact Form</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            className="w-full px-4 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            className="w-full px-4 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="message"
            required
          />
        </div>

        <button className="w-full bg-violet-500 text-white p-2 rounded-lg hover:bg-violet-600 transition-colors duration-300">
          Submit
        </button>
      </form>
      {message && (
  <p className="m-11 p-4 bg-gray-200 text-gray-700 rounded-md shadow-md">
    {message}
  </p>
)}
    </>
  );
}
