// app/products/ProductsList.js
"use client";

import Image from 'next/image';
import Link from 'next/link';

export function ProductsList({ products }) {
  const productArray = products.map((product) => (
    <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-64 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"   // Ensures the image fills the container
          objectFit="cover" // Keeps aspect ratio and covers the area
          priority={true} 
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.category}</p>
      <span className="text-green-700 font-bold text-lg">${product.price}</span> <br/>
      {/* Button for viewing product details */}
      <Link href={`/product/${product._id}`} className="product-details-button">
        <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors duration-200">
          View Details
        </button>
      </Link>
    </div>
  ));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productArray}
    </div>
  );
}
