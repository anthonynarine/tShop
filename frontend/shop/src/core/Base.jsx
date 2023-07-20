import React from "react";
import NavBar from "./NavBar";
import { CartProvider } from "./helper/CartContext";

export default function Base({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) {
  return (
    <CartProvider>
    {/* <NavBar /> */}
    <div className="page-container">
      <div className="content-container">
        <div className="container-fluid">
          <div className="jumbotron bg-dark text-white text-center">
            <h2 className="display-4">{title}</h2>
            <p className="lead">{description}</p>
          </div>
          <div className={className}>{children}</div>
        </div>
      </div>
      <footer className="footer bg-dark mt-auto  py-5">
        <div className="container-fluid bg-success text-white text-center py-2">
          <h4>Reach out on Instagram or Twitter for questions</h4>
          <button className="btn btn-warning btn-lg">Contact</button>
          <div className="container">
            <span className="text-white">Django React full-stack project</span>
          </div>
        </div>
      </footer>
    </div>
    </CartProvider>
  );
}
