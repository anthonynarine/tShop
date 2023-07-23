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
  );
}

export default App;
