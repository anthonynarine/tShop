import React, { useState, useEffect } from "react";
import { baseUrl } from "./shared";
import Base from "./Base";
import Card from "./Card";

import "../styles.css";

/**
 * Home component displays the list of products available in the shop.
 */
function Home() {
  // State to store the list of products
  const [products, setProducts] = useState([]);
  // State to track the loading status while fetching data
  const [loading, setLoading] = useState(true);
  // State to handle errors during API request
  const [error, setError] = useState(null);

  // Fetch the list of products from the Django DB
  useEffect(() => {
    console.log("fetching...");

    // Function to fetch products from the API and update state
    async function fetchProducts() {
      try {
        const url = `${baseUrl}api/products/`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log("Error:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Base title="Home page" description="Welcome to The shop">
      <div className="row py-4">
        <div className="product-list">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-danger">
              Error: {error.message}
            </div>
          ) : products.length > 0 ? (
            <div className="row">
              {/* Display each product as a card */}
              {products.map((product) => (
                <div key={product.id} className="col-md-4 mb-4">
                  <Card product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">No products available</div>
          )}
        </div>
      </div>
    </Base>
  );
}

export default Home;