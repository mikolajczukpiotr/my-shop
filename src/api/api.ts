import axios from "axios";

const API_URL = "https://fakestoreapi.com";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Cache for all products to avoid multiple requests
let allProductsCache: Product[] | null = null;

// Helper function to get all products (used for pagination)
const getAllProducts = async (): Promise<Product[]> => {
  if (allProductsCache) {
    return allProductsCache;
  }

  const response = await axios.get(`${API_URL}/products`);
  allProductsCache = response.data;
  return response.data;
};

export const fetchProducts = async (
  limit = 10,
  page = 1
): Promise<Product[]> => {
  // Get all products first, then apply client-side pagination
  const allProducts = await getAllProducts();
  const startIndex = (page - 1) * limit;
  return allProducts.slice(startIndex, startIndex + limit);
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get(`${API_URL}/products/categories`);
  return response.data;
};

export const fetchProductsByCategory = async (
  category: string,
  limit = 10,
  page = 1
): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products/category/${category}`);
  const startIndex = (page - 1) * limit;
  return response.data.slice(startIndex, startIndex + limit);
};

export const getTotalProductsCount = async (): Promise<number> => {
  const allProducts = await getAllProducts();
  return allProducts.length;
};

export const getCategoryProductsCount = async (
  category: string
): Promise<number> => {
  const response = await axios.get(`${API_URL}/products/category/${category}`);
  return response.data.length;
};
