/* eslint-disable no-lone-blocks */
import { useCart } from "./CartContext";
import { Outlet, Navigate } from "react-router-dom";



/**
 * PrivateRoute component that renders a route based on user authentication.
 * If the user is authenticated, it renders the specified component, otherwise it redirects to the login page.
 * @param {object} props - The props for the PrivateRoute component.
 * @param {React.Component} props.element - The component to render if the user is authenticated.
 * @param {string} props.path - The path of the route.
 * @returns {JSX.Element} The PrivateRoute component.
 */
export const PrivateRoutes = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useCart();

  return (

        isAuthenticated ? <Outlet /> : <Navigate to="/signin" />

  );
};


{/*
The PrivateRoute component is a wrapper around the Route component
from react-router-dom library.

It takes props as input, with the element prop representing the
component to render if the user is authenticated.

The CartContext is accessed using the useContext hook to get
the cart object containing the authentication status.

The isAuthenticated variable is set based on the 
art.isAuthenticated value.

The Route component is rendered with the spread ...rest props, 
which allows passing any other props such as path, exact, etc.
Inside the element prop of the Route, a conditional rendering is done:
If the user is authenticated (isAuthenticated is true), the
specified Component is rendered.
If the user is not authenticated, it renders the Navigate
component from react-router-dom to redirect to the login page
(<Navigate to="/login" replace />).
The PrivateRoute component provides a way to
protect routes and restrict access based on user authentication
status. It can be used in the routing configuration, similar to 
other Route components, to define private routes that require authentication.*/}