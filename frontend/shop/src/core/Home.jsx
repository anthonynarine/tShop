import React from "react";
import { useState, useEffect } from "react"
import { getProducts } from "./helper/coreapiCalls";

export default function Home() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = ()=> {
        getProducts()
        .then(data =>{
            if (data.error){
                setError(data.error)
                console.log(error)
            }else{
                setProducts(data)
            }
        });
    };

    

  return (
    <div>
         <h1>Home component under construction </h1>
    </div>
  );
}
