import React, { useState } from "react";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../../hooks/useCart";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

const Cart = () => {
  const { items, isOpen, close, remove, update, clear, totalPrice } = useCart();
  const [animatedItemId, setAnimatedItemId] = useState<number | null>(null);

  const removeItem = (productId: number) => {
    setAnimatedItemId(productId);
    setTimeout(() => {
      remove(productId);
      setAnimatedItemId(null);
    }, 300);
  };

  const updateItemQuantity = (
    id: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const qty = Number(e.target.value);
    update(id, qty);
  };

  const handleCheckout = () => {
    alert("Thank you for your purchase!");
    clear();
    close();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={close} title="Shopping Cart">
      {!items.length ? (
        <div className="text-center pt-8 justify-between">
          <div className="mb-4 flex justify-center">
            <svg
              className="w-16 h-16 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button
            onClick={close}
            variant="secondary"
            className="flex items-center gap-2"
          >
            {FaArrowLeft({})} Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-4 max-h-96 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.product.id}
                className={`flex items-center py-4 border-b border-gray-200 transition-opacity duration-300 ${
                  animatedItemId === item.product.id
                    ? "opacity-0"
                    : "opacity-100"
                }`}
              >
                <div className="h-16 w-16 bg-gray-100 rounded flex-shrink-0 mr-4">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <div className="flex-grow mr-4">
                  <h3 className="text-sm font-medium line-clamp-1">
                    {item.product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ${item.product.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateItemQuantity(item.product.id, e)}
                    className="mr-4 border border-gray-300 rounded p-1 text-sm"
                    aria-label="Quantity"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none transform transition-transform hover:scale-110"
                    aria-label="Remove item"
                  >
                    {FaTrash({})}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold text-lg">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex space-x-2">
              <Button onClick={clear} variant="secondary" className="flex-1">
                Clear
              </Button>
              <Button
                onClick={handleCheckout}
                variant="primary"
                className="flex-1"
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
