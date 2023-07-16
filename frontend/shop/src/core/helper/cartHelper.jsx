

/* eslint-disable no-lone-blocks */
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
  // see notes below
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

export const loadCart = () => {
  // Check if the code is running in a browser environment
  if (typeof window !== "undefined") {
    // Check if the "cart" item exists in local storage
    if (localStorage.getItem("cart")) {
      // Retrieve the "cart" item from local storage and parse it as JSON
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  // Return null if the "cart" item doesn't exist or the code
  // is not running in a browser environment
  return null;
};


/**
 * Delete an item from the cart based on the productID.
 * @param {string} productID - The ID of the product to be deleted.
 * @returns {Array|null} The updated cart with the specified item removed, or null if cart not found.
 */
export const removeItemFromCart = (productID) => {
  // Initialize cart as an empty array
  let cart = [];

  // Check if the code is running in a browser environment
  if (typeof window === "undefined") {
    return null;
  }

  // Retrieve cart items from local storage
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));

    // Filter out the item with the specified productID
    cart = cart.filter((item) => item.productID !== productID);

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Return the updated cart or null if cart not found
  return cart.length > 0 ? cart : null;
};


/**
 * Empty the cart by removing all items from local storage.
 * @param {function} next - A callback function to be executed after emptying the cart.
 */
export const cartEmpty = (next) => {
  // Check if the code is running in a browser environment
  if (typeof window === "undefined") {
    // Remove the "cart" item from local storage
    localStorage.removeItem("cart");

    // Create an empty cart array and save it to local storage
    const cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    // Execute the provided callback function
    next();
  }
};



{/* 
                    typeof window 1== "undefined"

typeof window !== "undefined". This check ensures that the code doesn't 
throw an error when trying to access the localStorage object, which is 
specific to browsers.

*/}