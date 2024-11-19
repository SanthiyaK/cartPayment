// app/products/SearchAction.js

"use server"; // Marking this function as a server action

import dbconnect from "@/db/dbconnect"; // Ensure DB connection
import Product from "@/model/ProductModel"; // Import the Product model

// Function to fetch products based on the query
async function fetchProductsSearch(query = "") {
  try {
    await dbconnect(); // Ensure DB is connected

    // Perform the search on name and category fields (case-insensitive)
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive match for name
        { category: { $regex: query, $options: 'i' } }, // Case-insensitive match for category
      ]
    });

    // Serialize the products to avoid sending Mongoose objects
    return products.map((product) => ({
      _id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image.toString(), // Convert image to string or URL
      category: product.category,
      stock: product.stock,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error('Unable to fetch products');
  }
}

// Server action to filter products based on the query from URL
export async function SearchBar(query) {
  const filteredProducts = await fetchProductsSearch(query); // Fetch filtered products based on query
  return filteredProducts; // Return the filtered products
}
