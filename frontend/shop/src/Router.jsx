import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import { CartProvider } from "./CartContext";

export default function Router() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </CartProvider>
  );
}
