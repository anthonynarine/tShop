import React, { createContext, useReducer, useContext } from "react";
import { useEffect } from "react";

// Initial authentication state
const initialState = {
  isAuthenticated: false,
  token: null,
  userId: null,
};

// AuthReducer - updates authentication state based on dispatched actions
const authReducer = (state, action) => {
  switch (action.type) {
    // Action to authenticate the user with a token and user ID
    case "AUTHENTICATE":
      console.log("AUTHENTICATE action dispatched"); // TEST
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload, // The token received as the payload of the action
        userId: action.userId, // The userId received as the payload of the action
      };
    // Action to set the authentication status
    case "SET_AUTHENTICATED":
      console.log("SET_AUTHENTICATED action dispatched");
      return { ...state, isAuthenticated: action.payload };
    // Action to set the user ID
    case "SET_USER_ID":
      console.log("SET_USER_ID action dispatched");
      return { ...state, userId: action.payload };
    // Action to sign out the user
    case "SIGN_OUT":
      console.log("SIGN_OUT action dispatched");
      return { ...initialState };
    default:
      return state;
  }
};

// Create the authentication context (Context Object)
export const AuthContext = createContext();

// Provider component for the AuthContext.
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Action creator function to authenticate the user with a token.
  const authenticate = (token, userId) => {
    console.log("authenticate called w/ token:", token, "and userId:", userId);
    dispatch({ type: "AUTHENTICATE", payload: token, userId });
  };

  // Action creator function to set the authentication status.
  const setAuthenticated = (isAuthenticated) => {
    console.log("setAuthenticated creator called w/ isAuthenticated:", isAuthenticated);
    dispatch({ type: "SET_AUTHENTICATED", payload: isAuthenticated });
  };

  // Action creator function to set the user ID.
  const setUserId = (userId) => {
    console.log("setUserId action creator called w/ userId:", userId);
    dispatch({ type: "SET_USER_ID", payload: userId });
  };

  // Action creator function for the sign out action.
  const signOut = () => {
    console.log("signOut action creator called");
    dispatch({ type: "SIGN_OUT" });
  };


  useEffect(()=>{
    console.log("authState updated", authState)
})

  // Create the authentication context value
  const authContextValue = {
    authState,
    dispatch,
    authenticate,
    setAuthenticated,
    isAuthenticated: authState.isAuthenticated,
    setUserId,
    signOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
  );
};


// Custom hook to access the AuthContext and retrieve authentication state and actions.
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error(
      "useAuth must be used within an AuthProvider. Make sure to wrap your component with the AuthProvider."
    );
  }
  return authContextValue;
};
