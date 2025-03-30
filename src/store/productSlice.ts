import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../api/api";

interface ProductsState {
  selectedCategory: string | null;
  page: number;
  limit: number;
}

interface ProductDetailState {
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  selectedCategory: null,
  page: 1,
  limit: 6,
};

const initialDetailState: ProductDetailState = {
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.page = 1;
    },
  },
});

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialDetailState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setSelectedCategory, setPage, setLimit } = productSlice.actions;
export const { setSelectedProduct } = productDetailSlice.actions;

export const productDetailReducer = productDetailSlice.reducer;
export default productSlice.reducer;
