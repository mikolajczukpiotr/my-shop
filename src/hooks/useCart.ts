import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} from "../store/cartSlice";
import { Product } from "../api/api";

export const useCart = () => {
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const add = (product: Product, quantity: number) => {
    dispatch(addToCart({ product, quantity }));
  };

  const remove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const update = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const clear = () => {
    dispatch(clearCart());
  };

  const toggle = () => {
    dispatch(toggleCart());
  };

  const open = () => {
    dispatch(openCart());
  };

  const close = () => {
    dispatch(closeCart());
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return {
    items,
    isOpen,
    add,
    remove,
    update,
    clear,
    toggle,
    open,
    close,
    totalItems,
    totalPrice,
  };
};
