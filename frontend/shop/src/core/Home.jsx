import React from "react";
import { useState, useEffect } from "react";
import { baseUrl } from "./shared";
import Base from "./Base";
import Card from "./Card";

import "../styles.css";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("fetching...");
    // fetch products from the api and update state
    async function fetchProducts() {
      try {
        const url = `${baseUrl}api/products/`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        setError(error);
        console.log("Error:", error);
      }
    }

    fetchProducts();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <Base title="Home page" description="Welcome to The shop">
      <div className="row py-4">
        {products ? (
          products.map((product) => {
            return (
              <div key={product.id} className="col-4 mb-4">
                < Card product={product} />
              </div>
            );
          })
        ) : (
          <p>No data available</p>
        )}
      </div>
    </Base>
  );
}
