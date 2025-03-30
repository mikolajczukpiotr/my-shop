import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../hooks/useCart";

const Header = () => {
  const { toggle, totalItems, totalPrice } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">MyShop</h1>
        </div>
        <div className="flex items-center">
          {totalItems > 0 && (
            <div className="mr-3 font-medium text-gray-700">
              <span className="text-sm mr-1">Cart:</span>
              <span className="text-blue-600 font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          )}
          <button
            className="relative p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
            onClick={toggle}
            aria-label="Shopping Cart"
          >
            {FaShoppingCart({
              className: `text-2xl ${
                totalItems > 0 ? "text-blue-600" : "text-gray-600"
              }`,
            })}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
