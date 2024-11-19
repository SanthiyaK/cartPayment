// app/product/[id]/page.js


import fetchProduct from '@/app/action/Productaction';
import ProductList from './ProductList';


export default async function ProductPage({ params }) {
  const { id } = await params; // Extract the product ID from the dynamic route

  try {
    const product = await fetchProduct(id);  // Fetch product by ID

    if (!product) {
      return <div>Product not found</div>;  // Handle case where product is not found
    }

    return (
       <ProductList product={product}/> 
    );
  } catch (error) {
    return <div>Error fetching product details: {error.message}</div>;
  }
}
