import React from "react";
import NavBar from "./NavBar";
import { CartProvider } from "./helper/CartContext";

/**
 * Base layout component for the application.
 *
 * @component
 * @param {Object} props - The props for the Base component.
 * @param {string} props.title - The title for the page.
 * @param {string} props.description - The description for the page.
 * @param {string} props.className - Additional CSS classes for the content container.
 * @param {React.ReactNode} props.children - The content to be rendered inside the Base layout.
 * @returns {JSX.Element} - The JSX element for the Base component.
 */
const Base = ({ title = "My Title", description = "My description", className = "bg-dark text-white p-4", children }) => {
  return (
    // Wraps the entire application inside the CartProvider to manage cart state
    <>
      {/* Main layout container */}
      <div className="page-container">
        <div className="content-container">
          {/* Fluid container to hold the main content */}
          <div className="container-fluid">
            {/* Jumbotron to display the title and description */}
            <div className="jumbotron bg-dark text-white text-center">
              <h2 className="display-4">{title}</h2>
              <p className="lead">{description}</p>
            </div>

            {/* Content container with additional styling classes */}
            <div className={className}>{children}</div>
          </div>
        </div>

        {/* Footer container */}
        <footer className="footer bg-dark mt-auto py-5">
          <div className="container-fluid bg-success text-white text-center py-2">
            {/* Contact section in the footer */}
            <h4>Reach out on Instagram or Twitter for questions</h4>
            <button className="btn btn-warning btn-lg">Contact</button>

            {/* Attribution section in the footer */}
            <div className="container">
              <span className="text-white">Django React full-stack project</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Base;