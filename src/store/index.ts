import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer, { productDetailReducer } from "./productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    productDetail: productDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
