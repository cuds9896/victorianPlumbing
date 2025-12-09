import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { getProducts } from "./api/getProducts";
import { ProductsList } from "./types/productsListType";
import ProductCard from "./components/ProductCard";

function App() {
  const [productsList, setProductsList] = useState<ProductsList>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [productType, setProductType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<number>(0);

  const retrieveProducts = () => {
    setLoading(true);
    getProducts({
      query: productType,
      pageNumber: 1,
      size: 10,
      additionalPages: 0,
      sort: sortBy,
    })
      .then((data) => {
        if (data.products) {
          setProductsList(data.products);
        } else {
          setProductsList([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setProductsList([]);
        console.error("Error fetching products in App component:", error);
      });
  };

  useEffect(() => {
    retrieveProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto p-4 lg:flex lg:items-start lg:gap-6">
        <aside className="w-full lg:w-64 mb-6 lg:mb-0">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Filters
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="product-type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product type
                </label>
                <select
                  id="product-type"
                  name="product-type"
                  className="block w-full rounded-md border-gray-200 bg-gray-50 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#12BC00]"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                >
                  <option value="all">All products</option>
                  <option value="toilets">Toilets</option>
                  <option value="basins">Basins</option>
                  <option value="taps">Taps</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="sort-by"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sort by
                </label>
                <select
                  id="sort-by"
                  name="sort-by"
                  className="block w-full rounded-md border-gray-200 bg-gray-50 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#12BC00]"
                  value={sortBy}
                  onChange={(e) => setSortBy(Number(e.target.value))}
                >
                  <option value={1}>Recommended</option>
                  <option value={2}>Price: Low to High</option>
                  <option value={3}>Price: High to Low</option>
                  <option value={4}>Most discounted</option>
                </select>
              </div>

              <div className="text-sm text-gray-500">
                Select filters to refine the product list.
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center rounded-md bg-[#12BC00] px-4 py-2 text-sm font-medium text-white shadow-sm hover:[#058B00] focus:outline-none focus:ring-2 focus:ring-[047300]"
                  onClick={retrieveProducts}
                >
                  Apply and search
                </button>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            {productsList.length > 0 && (
              <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {productsList.map((product, key) => (
                    <li key={key}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {productsList.length === 0 &&
              (loading ? (
                <p>Loading products...</p>
              ) : (
                <p>No products found.</p>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
