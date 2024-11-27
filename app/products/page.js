
import { SearchBar } from "../action/SearchAction";
import ProductsList from "./ProductsList";

export default async function ProductsPage({ searchParams }) {
  // Extract the query from the URL search params
  const query = searchParams.query || ''; // Default to empty string if query is not provided
  console.log('Search Query:', query);

  // Call the server action to filter products based on the query
  const filteredProducts = await SearchBar(query);
  console.log('Filtered Products:', filteredProducts);
  

  return (
    <div>
     <ProductsList filteredProducts={filteredProducts}/>
    </div>
  );
}
