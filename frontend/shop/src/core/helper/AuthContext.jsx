import React, { createContext, useReducer, useContext } from "react";
import { baseUrl } from "../shared";

// Create a custom hook 'useAuth'
// Custom hook to access the AuthContext and retrieve authentication state and actions.
// @returns {Object} The authentication context value containing the authentication state and actions.
// @throws {Error} If used outside the AuthProvider component.
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error(
      "useAuth must be used within an AuthProvider. Make sure to wrap your component with the AuthProvider."
    );
  }
  return authContextValue;
};

//....

// Initial authentication state
const initialState = {
  isAuthenticated: false,
  token: null,
  userId: null,
};

// AuthReducer - updates authentication state based on dispatched actions
let authReducer = (state, action) => {
  console.log("Action:", action); // Log the dispatched action
  switch (action.type) {
    // Authenticates the user and stores the token in the authentication state.
    // @param {string} action.payload - The token obtained from the authentication process.
    // @returns {object} The updated authentication state.
    case "AUTHENTICATE":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        userId: action.userId,
      };

    // Sets the authentication status in the authentication state.
    // @param {boolean} action.payload - The authentication status.
    // @returns {object} The updated authentication state.
    case "SET_AUTHENTICATED":
      return { ...state, isAuthenticated: action.payload };

    // Sets the user ID in the authentication state.
    // @param {string} action.payload - The user ID obtained from the user object.
    // @returns {object} The updated authentication state.
    case "SET_USER_ID":
      return { ...state, userId: action.payload };

    // Action creator function for the sign out action.
    // @returns {object} The sign out action object.
    case "SIGN_OUT":
      return { ...initialState };

    default:
      return state;
  }
};

// Create the authentication context (Context Object)
export const AuthContext = createContext();

//.....

//            ACTION CREATOR FUNCTIONS:

// Provider component for the AuthContext.
// Manage the authentication state and provides access to the authentication state and actions.
// @param {Object} props - The props for the AuthProvider component
// @param {ReactNode} props.children - The child component wrapped by the AuthProvider
// @return {ReactNode} The AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // SHOW CURRENT VALUE(S) OF STATE IN auth
  console.log("auth State Values:", authState);

  // Action creator function to authenticate the user with a token.
  // @param {string} token - The token obtained from the user object.
  const authenticate = (token, userId) => {
    dispatch({ type: "AUTHENTICATE", payload: token, userId });
  };

  // Action creator function to set the authentication status.
  // @param {boolean} isAuthenticated - The authentication status.
  const setAuthenticated = (isAuthenticated) => {
    dispatch({ type: "SET_AUTHENTICATED", payload: isAuthenticated });
  };

  //.....

  // **************************SIGNOUT ACTION CREATOR FUNCTION **********************************//
  // Action creator function for the sign out action.
  // Clears the user's authentication state and performs a logout request to the backend server.
  // If the logout request is successful, it dispatches the SIGN_OUT action to reset the authentication state.
  // If an error occurs during logout, it logs the error to the console.
  // @returns {void}
  const signOut = async () => {
    const { token, userId } = authState; // Destructure token and userId from the auth state

    // Clear the token from session storage (or any other storage mechanism you are using)
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("token");
    }

    try {
      // Send a logout request to your backend, passing the userId and token
      const response = await fetch(`${baseUrl}user/logout/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, //type of token being used needed for request to the backend
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // If logout is successful, dispatch the SIGN_OUT action to reset the authentication state
        console.log("Signout Success");
        dispatch({ type: "SIGN_OUT" });
      } else {
        console.log("Error during signout");
      }
    } catch (error) {
      // If an error occurs during logout, log the error to the console
      console.error("Error during signout:", error);
    }
  };

  // *************************SIGNOUT ACTION CREATOR FUNCTION END **********************************//

  //.....

  // Create the authentication context value
  const authContextValue = {
    authState,
    dispatch,
    authenticate,
    setAuthenticated,
    signOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
