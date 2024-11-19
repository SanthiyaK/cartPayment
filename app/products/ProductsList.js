// app/products/ProductsList.js
"use client";

import Image from 'next/image';
import Link from 'next/link';

export function ProductsList({ products }) {
  const productArray = products.map((product) => (
   <div key={product._id} >
      <Image
        src={product.image}
        alt={product.name}
        width={200}  
        height={300}
        priority={true} 
      />
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <span>${product.price}</span> <br/>
       {/* Button for viewing product details */}
       <Link href={`/product/${product._id}`} className="product-details-button">
        <button className='bg-green-700'>View Details</button>
      </Link>
    </div>
  
  ));

  return <div>{productArray}</div>;
}
