 import dbconnect from "@/db/dbconnect";
import CartModel from "@/model/cartModel";  // Import Cart model


export async function getCartItems() {
  try {
    await dbconnect()
    const cartItems = await CartModel.find().populate('product', 'name image price')  // Populate product fields: name, image, price
    .lean()  
    .exec();
   
      const cartItemsWithStringIds = cartItems.map(cartItem => ({
        ...cartItem,
        _id: cartItem._id.toString(),  // Convert _id to string
      }));
  
      console.log(cartItemsWithStringIds);  // Output the modified cart items
      return cartItemsWithStringIds;
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
}
 

