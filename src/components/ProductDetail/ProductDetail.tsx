import React, { useState } from "react";
import { addToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import { Product } from "../../api/api";

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    onClose();
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center bg-gray-100 p-4 rounded-lg">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-80 object-contain"
              />
            </div>
            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <div className="flex items-center mb-2">
                  <span className="text-2xl font-bold text-blue-600 mr-2">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    In Stock
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating.rate)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              </div>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <div className="flex items-end">
                <div className="mr-4">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button onClick={handleAddToCart} className="flex-grow">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductDetail);
