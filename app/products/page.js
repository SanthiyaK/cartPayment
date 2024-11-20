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
    <div key={product._id} className="product-card p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-64 mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover rounded" 
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.category}</p>
      <span className="text-green-700 font-bold text-lg">${product.price}</span>
      
      {/* Button for viewing product details */}
      <Link href={`/product/${product._id}`} className="product-details-button">
        <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors duration-200">
          View Details
        </button>
      </Link>
    </div>
  ))
) : (
  <p>No products found.</p>
)}

      </div>
    </div>
  );
}
