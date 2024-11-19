"use server"
import dbconnect from "@/db/dbconnect";
import Product from "@/model/ProductModel";

export default async function fetchProduct(id) {
    try {
      await dbconnect(); // Ensure DB is connected
  
      // Fetch the product using .lean() to return plain JavaScript objects
      const product = await Product.findById(id); 
  
      if (!product) {
        throw new Error('Product not found');
      }
      const serializedProduct = {
        _id: product._id.toString(),  // Convert MongoDB ObjectId to string
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image ? product.image.toString() : null, // If image is a Buffer, convert to string or URL
        category: product.category,
        stock: product.stock,
      };
  
      return serializedProduct; // Return the serialized product data
  
     
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Unable to fetch product');
    }
  }