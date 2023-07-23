import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import { CartProvider } from "./core/helper/CartContext";
import { AuthProvider } from "./core/helper/AuthContext";
import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import { PrivateRoutes } from "./core/helper/PrivateRoutes";

import NavBar from "./core/NavBar";
import UserDashboard from "./user/UserDashboard";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            {/* If you want to protect a specific nested route */}
            {/* <PrivateRoutes path="api/user/dashboard/*" element={<UserDashboard />} /> */}
          </Routes>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;


/*                      structure:

AuthProvider wraps the entire app and provides authentication-related data
and actions to its children.

CartProvider wraps the entire app and provides
cart-related data and actions to its children.

NavBar is placed outside the Routes component, 
which ensures it is visible on all pages/routes.

setup, should have access to the isAuthenticated 
value in the NavBar component using the custom hook useAuth.
It should no longer show isAuthenticated as undefined. */

