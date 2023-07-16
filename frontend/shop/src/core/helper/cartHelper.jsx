/**
 * Adds an item to the cart and stores it in the local storage.
 *
 * @param {Object} item - The item to be added to the cart.
 * @param {Function} next - Optional callback function to be called after adding the item.
 *                          It will be invoked with no arguments.
 */
export const addItemToCart = (item, next) => {
    let cart = [];
  
    // Check if the window object is available (to ensure running in a browser environment)
    if (typeof window !== "undefined") {
      // Retrieve existing cart items from local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
  
      // Add the item to the cart
      cart.push({
        ...item,
      });
  
      // Update the cart items in local storage
      localStorage.setItem("cart", JSON.stringify(cart));
  
      // Call the 'next' callback function if provided
      if (typeof next === "function") {
        next();
      }
    }
  };