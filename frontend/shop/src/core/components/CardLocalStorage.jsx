// This component hold the functionaly for storing cart state in 
// localStorage. i'm keeping it as an example cart state is managed 
// useContext for this project


/* eslint-disable no-lone-blocks */



import { addItemToCart, removeItemFromCart } from "../helper/cartHelper";
import ImageHelper from "../helper/imageHelper";
import { useNavigate } from "react-router-dom";

const isAuthenticated = true;

/**
 * Card component represents a card displaying product information.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product object to display in the card.
 * @param {boolean} [props.addToCart=true] - Determines if the Add to Cart button should be shown.
 * @param {boolean} [props.removeFromCart=true] - Determines if the Remove from Cart button should be shown.
 * @returns {JSX.Element} The Card component.
 */
const Card = ({ product, addToCart = true, removeFromCart = true }) => {
  const navigate = useNavigate();

  /**
   * Handles the Add to Cart button click event.
   */
  const handleAddToCart = () => {
    if (isAuthenticated) {
      addItemToCart(product, () => {
        // localStorage
      });
      console.log("Added to cart");
    } else {
      console.log("Please log in");
      // navigate("/login"); // Redirect to the login page if the user is not authenticated
    }
  };

  /**
   * Renders the Add to Cart button.
   * @returns {JSX.Element|null} The Add to Cart button JSX element, or null if addToCart prop is false.
   */
  const showAddToCartBtn = () => {
    if (addToCart) {
      return (
        <button
          onClick={handleAddToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      );
    }
    return null;
  };

  /**
   * Handles the Remove from Cart button click event.
   */
  const handleRemoveFromCart = () => {
    removeItemFromCart(product._id);
  };

  /**
   * Renders the Remove from Cart button.
   * @returns {JSX.Element|null} The Remove from Cart button JSX element, or null if removeFromCart prop is false.
   */
  const showRemoveFromCartBtn = () => {
    if (removeFromCart) {
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
        <p className="btn btn-success rounded btn-sm px-4">${product.price}</p>
        <div className="row">
          <div className="col-12">{showAddToCartBtn()}</div>
          <div className="col-12">{showRemoveFromCartBtn()}</div>
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
