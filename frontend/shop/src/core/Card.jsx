/* eslint-disable no-lone-blocks */
import React from "react";
import { useCart } from "./helper/CartContext";
import { useAuth } from "../auth/helper/AuthContext";
import { useNavigate } from "react-router-dom";
import ImageHelper from "./helper/imageHelper";

/**
 * Component to display a card for a product with options to add to or remove from the cart.
 *
 * @param {Object} product - The product object to be displayed on the card.
 * @returns {JSX.Element} - The JSX element for the card component.
 */
const Card = ({ product }) => {
  // Get the cart state and actions using the custom hook useCart
  const { addToCartAction, removeFromCartAction, cart } = useCart();

  // Get the isAuthenticated value using the custom hook useAuth
  const { isAuthenticated } = useAuth();

  // Get the navigate function from React Router to handle navigation
  const navigate = useNavigate();

  // Log the product object for debugging purposes
  console.log("Product:", product);

  // Check if data is available
  if (!product) {
    return <div>Loading...</div>;
  }

  /**
   * Function to handle adding the product to the cart.
   * If the user is authenticated, it calls the addToCartAction from the cart context.
   * If not authenticated, it redirects the user to the signin page.
   */
  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCartAction(product);
      console.log("Added to cart");
    } else {
      console.log("Please log in");
      navigate("/signin");
    }
  };

  /**
   * Function to handle removing the product from the cart.
   * It calls the removeFromCartAction from the cart context.
   */
  const handleRemoveFromCart = () => {
    removeFromCartAction(product);
    console.log("Removed from cart");
  };

  /**
   * Function to render the "Add to Cart" button.
   *
   * @returns {JSX.Element|null} - The JSX element for the button or null if not rendered.
   */
  const showAddToCartBtn = () => {
    return (
      <button
        onClick={handleAddToCart}
        className="btn btn-block btn-outline-success mt-2 mb-2"
      >
        Add to Cart
      </button>
    );
  };

  /**
   * Function to render the "Remove from Cart" button.
   * It checks if the product is present in the cart and renders the button accordingly.
   *
   * @returns {JSX.Element|null} - The JSX element for the button or null if not rendered.
   */
  const showRemoveFromCart = () => {
    console.log("Product ID:", product.id);
    console.log("Cart Items:", cart.cartItems);
    console.log("showRemoveFromCart called");
    if (cart && cart.cartItems.some((item) => item.id === product.id)) {
      return (
        <button
          onClick={handleRemoveFromCart}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from Cart
        </button>
      );
    }
    return null;
  };

  return (
    <div className="card text-white bg-dark border border-info">
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
