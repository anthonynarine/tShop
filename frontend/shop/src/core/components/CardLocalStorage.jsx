// This component hold the functionaly for storing cart state in 
// localStorage. i'm keeping it as an example cart state is managed 
// useContext for this project


/* eslint-disable no-lone-blocks */



// Importing necessary dependencies and helper functions
import { addItemToCart, removeItemFromCart } from "../helper/cartHelper";
import ImageHelper from "../helper/imageHelper";
import { useNavigate } from "react-router-dom";

// A boolean variable to represent the authentication status
const isAuthenticated = true;

/**
 * Card component represents a card displaying product information.
 *
 * @param {Object} product - The product object to display in the card.
 * @param {boolean} addToCart - Determines if the Add to Cart button should be shown (default: true).
 * @param {boolean} removeFromCart - Determines if the Remove from Cart button should be shown (default: true).
 */
const Card = ({ product, addtoCart = true, removeFromCart = true }) => {
  const navigate = useNavigate();

  // Check if the product data is available
  if (!product) {
    return <div>Loading...</div>;
  }

  /**
   * Function to add the product to the cart.
   * It checks if the user is authenticated and adds the product to the cart using the `addItemToCart` helper function.
   * If the user is not authenticated, it logs a message to the console.
   */
  const addToCart = () => {
    if (isAuthenticated) {
      addItemToCart(product, () => {}); // Use the `addItemToCart` helper function to add the product to the cart
      console.log("Added to cart");
    } else {
      console.log("Login please");
      // navigate("/login"); // Redirect to the login page if the user is not authenticated
    }
  };

  /**
   * Function to show the Add to Cart button.
   * It checks the value of `addToCart` prop and conditionally renders the button.
   */
  const showAddToCartBtn = () => {
    return (
      addToCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  /**
   * Function to show the Remove from Cart button.
   * It checks the value of `removeFromCart` prop and conditionally renders the button.
   */
  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id); // Use the `removeItemFromCart` helper function to remove the product from the cart
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from Cart
        </button>
      )
    );
  };

  // Render the card component with the product information and buttons
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
        <p className="btn btn-success rounded btn-sm px-4">${product.price}</p>
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

{/* The some() function is an array method in JavaScript that 
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
iteration and stops checking the remaining elements. */}
