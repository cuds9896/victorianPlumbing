import React, { useEffect, useState } from "react";
import "./App.css";
import { getProducts } from "./api/getProducts";
import { ProductsList } from "./types/productsListType";

function App() {
  const [productsList, setProductsList] = useState<ProductsList>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getProducts({
      query: "toilets",
      pageNumber: 1,
      size: 10,
      additionalPages: 0,
      sort: 0,
    })
      .then((data) => {
        if (data.products) {
          setProductsList(data.products);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching products in App component:", error);
      });
  }, []);
  return (
    <div>
      <div>Product List</div>
      {productsList.length > 0 && (
        <div>
          <ul>
            {productsList.map((product, key) => (
              <li key={key}>{product.productName}</li>
            ))}
          </ul>
        </div>
      )}
      {productsList.length === 0 &&
        (loading ? <p>Loading products...</p> : <p>No products found.</p>)}
    </div>
  );
}

export default App;
