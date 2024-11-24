"use client"

import { useState } from "react"
import { UserRegister } from "../action/authaction"

export default function UserForm() {
  const [message, setMessage] = useState()

  const handleSubmit = async (formData) => {
    const result = await UserRegister(formData)
    setMessage(result.message)

    // Clear message after 2 seconds
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  return (
    <>
      <form
        action={handleSubmit}
        className="flex justify-center items-center h-screen bg-pink-100 relative"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Register Form</h1>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-3 rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200"
          >
            Register
          </button>
        </div>

        {/* Conditionally render message at the bottom of the form */}
        {message && (
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-full max-w-md">
            <p className="bg-white p-4 rounded-lg shadow-lg text-xl text-center text-gray-800">
              {message}
            </p>
          </div>
        )}
      </form>
    </>
  )
}
