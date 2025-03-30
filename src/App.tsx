import React, { useState } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart/Cart";
import { Product } from "./api/api";
import "./index.css";

// Create a client
const queryClient = new QueryClient();

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto py-8 px-4">
            <ProductList onSelectProduct={handleSelectProduct} />
            {selectedProduct && (
              <ProductDetail
                product={selectedProduct}
                onClose={handleCloseProductDetail}
              />
            )}
            <Cart />
          </main>
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
