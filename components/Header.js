"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Using Next.js Router to handle URL navigation

export function Header() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?query=${query}`);  // Navigate to the products page with the query in the URL
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold mb-4">Product Store</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-96 py-3 px-6 text-lg rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-black text-white rounded-full px-3 py-2 hover:bg-black/60" type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
