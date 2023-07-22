/* eslint-disable no-lone-blocks */

import React from "react";
import { useCart } from "./helper/CartContext";
import { useAuth } from "./helper/AuthContext";
import { useNavigate } from "react-router-dom";
import ImageHelper from "./helper/imageHelper";
import { addItemToCart, deleteItemFromCart } from "./helper/cartHelper"; //needed for browser cart state management


const Card = ({ product }) => {
  console.log("Product:", product);
  // const { addToCart, removeFromCart, cart } = useContext(CartContext); WITHOUT CUSTOM HOOK
  const { addToCartAction, removeFromCartAction, cart } = useCart(); // W/ custom hook useCart (see CartContext)
  const { isAuthenticated } = useAuth(); // Get the isAuthenticated value from the useAuth hook
  const navigate = useNavigate();

  // check if data is available
  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCartAction(product); // context
      console.log("added to cart");
    } else {
      console.log("login please");
      navigate("/login"); // Redirect to the login page
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCartAction(product);
    console.log("removed from cart");
  };

  const showAddToCartBtn = () => {
    return (
      handleAddToCart && (
        <button
          onClick={handleAddToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

/**
 * Conditionally renders the "Remove from cart" button based on the presence of an item in the cart context state.
 */
const showRemoveFromCart = () => {
  console.log("Product ID:", product.id);
  console.log("Cart Items:", cart.cartItems);
  console.log("showRemoveFromCart called");
  // Check if cart is available and if the item is present in the cartItems
  if (cart && cart.cartItems.some((item) => item.id === product.id)) {
    return (
      <button
        onClick={handleRemoveFromCart}
        className="btn btn-block btn-outline-danger mt-2 mb-2"
      >
        Remove from cart
      </button>
    );
  }
  // Return null if cart or item is not found in cartItems
  return null;
};

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">
        <h4>{product.name}</h4>
      </div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {product.description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">${product.price}</p>
        <div className="row">
          <div className="col-12">{showAddToCartBtn()}</div>
          <div className="col-12">{showRemoveFromCart()}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;

// The sum()

{
  /* The some() function is an array method in JavaScript that 
tests whether at least one element in the array passes a 
provided condition. Here's an explanation of how it works:

The some() function takes a callback function as its argument.
This callback function is executed for each element in the array.
Inside the callback function, you define a condition that needs to 
be satisfied by at least one element in the array.
The some() function iterates over each element in the array 
and invokes the callback function on each iteration.
If the callback function returns true for any element, 
the some() function immediately returns true without furthe
iteration and stops checking the remaining elements. */
}
