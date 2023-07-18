import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import { CartProvider } from "./core/helper/CartContext";
import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";

export default function Router() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </CartProvider>
  );
}
