import { addItemToCart } from "./helper/cartHelper";
import ImageHelper from "./helper/imageHelper";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./helper/CartContext";
import { useContext, useEffect } from "react";

const isAuthenticated = true;

const Card = ({ product, addtoCart = true, removeFromCart = false }) => {
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { cart } = useContext(CartContext); //TEST TO CHECK CART STATE

  const handleAddToCart = () => {
    if (isAuthenticated) {
      // addItemToCart(product, ()=>{} )
      addToCart(product);
      console.log("added to cart");
    } else {
      console.log("login please");
      navigate("/login"); // Redirect to the login page
    }
  };

  const showAddToCartBtn = () => {
    return (
      // handleAddToCart && (
      <button
        onClick={handleAddToCart}
        className="btn btn-block btn-outline-success mt-2 mb-2"
      >
        Add to Cart
      </button>
      // )
    );
  };

  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            console.log("Item removed");
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  useEffect(() => {
    // TEST - logs the cart state whenever the "cart" dependency changes
    console.log("Cart State:", cart);
  }, [cart]);

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
