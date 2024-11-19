"use server"

import dbconnect from "@/db/dbconnect";
import Product from "@/model/ProductModel";

export async function fetchProducts() {
    try {
      await dbconnect();  // Ensure DB is connected
      
      // Use lean() to return plain JavaScript objects instead of Mongoose documents
      const products = await Product.find(); 
     const serializedProducts = products.map(product => {
      return {
        _id: product._id.toString(),  // Convert MongoDB ObjectId to string
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image.toString(),  // If image is a Buffer, convert to string (or URL)
        category: product.category,
        stock: product.stock,
      };
    });
     return serializedProducts; 
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error('Unable to fetch products');
    }
  }
 