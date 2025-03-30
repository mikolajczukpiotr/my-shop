import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../store";
import { setSelectedCategory, setPage, setLimit } from "../store/productSlice";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  getTotalProductsCount,
  getCategoryProductsCount,
} from "../api/api";

export const useProducts = () => {
  const { selectedCategory, page, limit } = useSelector(
    (state: RootState) => state.products
  );

  const dispatch = useDispatch();

  const {
    data: products = [],
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ["products", page, limit, selectedCategory],
    queryFn: () =>
      selectedCategory
        ? fetchProductsByCategory(selectedCategory, limit, page)
        : fetchProducts(limit, page),
  });

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: totalCount = 0,
    isLoading: isLoadingTotalCount,
    error: totalCountError,
  } = useQuery({
    queryKey: ["productsCount", selectedCategory],
    queryFn: () =>
      selectedCategory
        ? getCategoryProductsCount(selectedCategory)
        : getTotalProductsCount(),
  });

  const selectCategory = (category: string | null) => {
    dispatch(setSelectedCategory(category));
    if (page !== 1) {
      dispatch(setPage(1));
    }
  };

  const changePage = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const changeLimit = (newLimit: number) => {
    dispatch(setLimit(newLimit));
    if (page !== 1) {
      dispatch(setPage(1));
    }
  };

  const numericTotalCount = typeof totalCount === "number" ? totalCount : 0;
  const calculatedTotalPages = Math.max(
    1,
    Math.ceil(numericTotalCount / limit)
  );

  return {
    products,
    categories,
    totalCount: numericTotalCount,
    selectedCategory,
    page,
    limit,
    isLoading: isLoadingProducts || isLoadingCategories || isLoadingTotalCount,
    error: productsError || categoriesError || totalCountError,
    totalPages: calculatedTotalPages,
    selectCategory,
    changePage,
    changeLimit,
  };
};
