
import { SearchBar } from "@/app/products/SearchAction"; // Import SearchBar action

export default async function ProductsPage({ searchParams }) {
  // Extract the search query from URL
  const query = searchParams.query || ''; // Default to empty string if query is not provided
  console.log(query);
  
  // Call the server action to filter products
  const filteredProducts = await SearchBar(query); 

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
            </div>
          ))
        ) : (
          <p>No products found matching your search.</p>
        )}
      </div>
    </div>
  );
}
