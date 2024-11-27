"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Using Next.js Router to handle URL navigation
import { UserLogout } from "@/app/action/loginAction";
import Link from "next/link";

export function Header() {
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); // State to hold cart item count
  const router = useRouter();

  // Check if the user is logged in by looking for a token or session
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Check the cart item count when the component mounts (for specific userId)
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Retrieve the user's cart from localStorage using the userId
      const userCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      setCartItemCount(userCart.length); // Set the cart count based on the length of the cart array
    }
  }, []); // This effect runs once when the component mounts

  // Handle search form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?query=${query}`); // Navigate to the products page with the query in the URL
    }
  };

  // Logout function that clears session and redirects user
  const logout = async () => {
    const result = await UserLogout();
    if (result.success) {
      setIsLoggedIn(false);
      router.push("/login");
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex flex-grow justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-96 py-3 px-6 text-lg rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      {/* Buttons for Login, Signup, and Logout */}
      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            {/* Login Button */}
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Login
            </button>

            {/* Signup Button */}
            <button
              onClick={() => router.push("/signup")}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Signup
            </button>
          </>
        ) : (
          <>
            {/* Logout Button */}
            <form action={logout}>
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                LOGOUT
              </button>
            </form>

            {/* Cart Link */}
            <Link href="/cart" className="flex items-center">
              <span className="mr-2">View Cart</span>
              {/* Show the number of items in the cart */}
              {cartItemCount > 0 && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
