import Link from "next/link";
import { SearchBar } from "../action/SearchAction";

export default async function ProductsPage({ searchParams }) {
  // Extract the query from the URL search params
  const query = searchParams.query || ''; // Default to empty string if query is not provided
  console.log('Search Query:', query);

  // Call the server action to filter products based on the query
  const filteredProducts = await SearchBar(query);
  console.log('Filtered Products:', filteredProducts);

  return (
    <div>
      {/* Display filtered products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card p-4 border rounded">
              <img src={product.image} alt={product.name} width={200} height={300} />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <span>${product.price}</span>
                {/* Button for viewing product details */}
       <Link href={`/product/${product._id}`} className="product-details-button">
        <button className='bg-green-700'>View Details</button>
      </Link>
            </div>
          ))
        ) : (
          <p>No products found matching your search.</p>
        )}
      </div>
    </div>
  );
}
