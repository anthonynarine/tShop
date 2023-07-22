/* eslint-disable no-lone-blocks */
import React, { createContext, useReducer, useContext } from "react";


// See Signin and card component for a demo use case
// Create a custom hook 'useCart'
// Custom hook to access the CartContext and retrieve cart state and actions.
// @returns {Object} The cart context value containing the cart state and actions.
// @throws {Error} If used outside the CartProvider component.
export const useCart = () => {
  const cartContextValue = useContext(CartContext);

  if (!cartContextValue) {
    throw new Error(
      "useCart must be used within a CartProvider. Make sure to wrap your component with the CartProvider."
    );
  }
  return cartContextValue;
};


//Initial cart state
const initialState = {
  cartItems: [],
  isAuthenticated: false,
  token: null,
  id: null, 
}

//Cart Reducer - updates cart state based on dispatched actions
// see more notes on this reducer below
let cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {...state, cartItems: [...state.cartItems, action.payload]};

    case "REMOVE_FROM_CART":
/*  filter => creates a new array that includes all the items except
  the one with the id matching action.payload.id */
      return{...state, cartItems: state.cartItems.filter((item) => item.id !== action.payload.id)};

    case "EMPTY_CART":
      return { ...state, cartItems: [] };

    // Authenticates the user and stores the token in the cart state.
    // @param {string} action.payload - The token obtained from the authentication process.
    // @returns {object} The updated cart state.
    case "AUTHENTICATE":
      return { ...state, isAuthenticated: true, token: action.payload };

    // Sets the authentication status in the cart state.
    // @param {boolean} action.payload - The authentication status.
    // @returns {object} The updated cart state.
    case "SET_AUTHENTICATED":
      return { ...state, isAuthenticated: action.payload };

    case "SET_USER_ID":
      return {...state, userId: action.payload}

    case "SIGN_OUT":
      return initialState;
      //initial start is an empty array lol. 

    default:
      return state;
  }
};

//Create the cart context (Context Object)
export const CartContext = createContext();


//            ACTION CREATOR FUNCTIONS:

//Provider component for the CartContext.
//Manage the cart state and provides access to the cart state and actions
// @param {obj} props - The props for the CartProvider component
// @param {ReactNode} props.children - The child component wrapped by the Cartprovider
// @return {ReactNode} The CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  // dispatch() is responsible for updating state

  //Adds an item to the cart
  // @param {object} item - The item being added to the cart
  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  // Remove an item from the cart
  const removeFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  // Empties the cart by removing all items.
  const emptyCart = (item) => {
    dispatch({ type: "EMPTY_CART", payload: item });
  };

  //  * @param {string} token - The token obtained from the user object.
  const authenticate = (token) => {
    console.log("Updating token state...");
    dispatch({ type: "AUTHENTICATE", payload: token });
    /* will dispatch the AUTHENTICATE action to the cart reducer. it takes
     token as an argument & sends it as the 'payload' w/ the "AUTHENTICATE"
     action type. when called it will update the cart state w/ the provided token
     and set the "isAuthenticated" flag to "true" */
  };


  //  * @param {boolean} isAuthenticated - The authentication status.
  const setAuthenticated = (isAuthenticated) => {
    console.log("Updating isAuthentifcated...");
    if(isAuthenticated === true){
      console.log(isAuthenticated)
    }
    dispatch({ type: "SET_AUTHENTICATED", payload: isAuthenticated });
  };

//  * Action creator function for the sign out action.
//  * @returns {Object} The sign out action object.
const signOut = () => {
  console.log("Executing signOut function...");
  // Clear the token from session storage
  sessionStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT" });
  console.log("Executing signOut function...");
};



  // Create the cart context value
  const cartContextValue = {
    isAuthenticated: cart.isAuthenticated,
    token: cart.token,
    cartItems: cart.cartItems,
    dispatch,
    addToCart,
    removeFromCart,
    emptyCart,
    authenticate,
    setAuthenticated,
    signOut,
  };



  return (
    <CartContext.Provider value={cartContextValue}>
      {console.log("TEST_STATE_CartContext :", cart)} 
      {children}
    </CartContext.Provider>
  );
};

// SEE Router.jsx for how CartProvider wraps the application

// Reducer Notes

{
  /*The cart reducer function is responsible for updating the cart 
state based on the dispatched actions. It takes in the current 
state (state) and an action object (action) as input parameters.

Inside the function, there is a switch statement that 
evaluates the action.type to determine which action is 
being dispatched. The code then performs the corresponding
 state update based on the action type.

In this example, there is only one action type being handled: 'ADD_TO_CART'.
When this action is dispatched, the reducer creates a new state
 by spreading the existing state array and appending the 
 action.payload item to the end of the array using 
 the spread operator ...state, action.payload. 
 This creates a new array, preserving the immutability of the state.

If the action.type does not match any of the defined cases in the
switch statement, the default case is triggered, and the
reducer simply returns the current state unchanged (state).

The reducer function is used in conjunction with the useReducer hook in
 the CartProvider component to manage the cart state and handle
  state updates in response to dispatched actions.}


                    //CartProvider Notes

{/* The CartProvider component is defined as a functional component that 
takes a single prop named children. This prop represents the child
 components that will be wrapped by the CartProvider.

Inside the CartProvider, the useReducer hook is used to manage the cart state.
 It takes two parameters: the cartReducer function and the initialState value. 
 The cartReducer function is responsible for updating the cart state based
  on dispatched actions, and the initialState represents the initial value
   of the cart state.

The addToCart function is defined within the CartProvider component.
This function is responsible for dispatching the 'ADD_TO_CART'
action and updating the cart state. When called,
it dispatches an action object with the type 'ADD_TO_CART' and 
the item as the payload. This action will be handled by the cartReducer function.

The CartProvider component returns a JSX block where the CartContext.
Provider component is rendered. It wraps the children prop, which
represents the child components that are passed to the CartProvider. 
This ensures that the child components have access to the cart state and 
actions provided by the CartContext.

The CartContext.Provider component accepts a value prop that contains 
an object with two properties: cart and addToCart. This value object 
represents the data and actions that will be accessible by the components
wrapped by the CartProvider. The cart property holds the current cart state 
obtained from the useReducer hook, and the addToCart property holds the 
addToCart function defined within the CartProvider.

By wrapping components in the CartProvider and rendering them within
 the CartContext.Provider, you establish a context where the cart state 
 and actions are provided to the child components. This enables components
within the CartProvider hierarchy to access and manipulate the cart state
and trigger actions such as adding items to the cart.
*/
}
