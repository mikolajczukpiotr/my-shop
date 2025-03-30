import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../store";
import { setSelectedProduct } from "../store/productSlice";
import { fetchProductById, Product } from "../api/api";

export const useProductDetail = () => {
  const { selectedProduct } = useSelector(
    (state: RootState) => state.productDetail
  );
  const dispatch = useDispatch();

  const {
    data: productDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", selectedProduct?.id],
    queryFn: () =>
      selectedProduct ? fetchProductById(selectedProduct.id) : null,
    enabled: !!selectedProduct,
  });

  const selectProduct = (product: Product | null) => {
    dispatch(setSelectedProduct(product));
  };

  const closeProductDetail = () => {
    dispatch(setSelectedProduct(null));
  };

  return {
    selectedProduct: productDetails || selectedProduct,
    isOpen: !!selectedProduct,
    isLoading,
    error,
    selectProduct,
    closeProductDetail,
  };
};
