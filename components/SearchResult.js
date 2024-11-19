import { SearchBar } from "@/app/action/SearchAction";


export default async function SearchResult() {
    // Call the server action to filter products
  const filteredProducts = await SearchBar(query); 
  return filteredProducts;
 
}
