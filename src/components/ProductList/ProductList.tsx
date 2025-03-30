import React, { useState, useCallback, useEffect } from "react";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";
import Button from "../UI/Button";
import { Product } from "../../api/api";

interface ProductListProps {
  onSelectProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onSelectProduct }) => {
  const {
    products,
    categories,
    selectedCategory,
    page,
    totalPages,
    selectCategory,
    changePage,
    isLoading,
    error,
  } = useProducts();

  const { add: addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [notification, setNotification] = useState<{
    product: Product;
    visible: boolean;
  } | null>(null);

  useEffect(() => {
    if (notification?.visible) {
      const timer = setTimeout(() => {
        setNotification((prev) => (prev ? { ...prev, visible: false } : null));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleCartClick = useCallback(
    (product: Product, e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      addToCart(product, 1);
      setNotification({ product, visible: true });
    },
    [addToCart]
  );

  const handleProductClick = useCallback(
    (product: Product) => {
      onSelectProduct(product);
    },
    [onSelectProduct]
  );

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      selectCategory(e.target.value === "all" ? null : e.target.value);
    },
    [selectCategory]
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mt-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Something went wrong while loading products. Try refreshing the page.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Toast notification */}
      {notification?.visible && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded shadow-lg z-50 flex items-center animate-fade-in-up">
          {FaCheck({ className: "mr-2" })}
          <span>
            Added {notification.product.title.substring(0, 20)}... to cart
          </span>
        </div>
      )}

      <div className="mb-6">
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Filter by category:
        </label>
        <select
          id="category"
          value={selectedCategory || "all"}
          onChange={handleCategoryChange}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5"
        >
          <option value="all">All Categories</option>
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
        </select>
      </div>

      {!Array.isArray(products) || products.length === 0 ? (
        <div className="text-center text-gray-600 my-12">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white flex flex-col justify-between rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => handleProductClick(product)}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className={`object-contain h-full w-full transition-transform duration-300 ${
                    hoveredProduct === product.id ? "scale-110" : ""
                  }`}
                />
              </div>
              <h2 className="text-lg font-semibold line-clamp-2 mb-2 px-4 pt-2">
                {product.title}
              </h2>
              <div className="flex justify-between items-center mt-2 p-4">
                <span className="font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={(e) => handleCartClick(product, e)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Add to cart"
                >
                  {FaShoppingCart({})}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="flex justify-center mt-8 space-x-2">
          <Button
            onClick={() => changePage(page - 1)}
            disabled={page <= 1}
            variant="secondary"
          >
            Previous
          </Button>
          <span className="px-4 py-2 bg-gray-100 rounded-md">
            Page {page} of {totalPages || 1}
          </span>
          <Button
            onClick={() => changePage(page + 1)}
            disabled={page >= totalPages}
            variant="secondary"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(ProductList);
