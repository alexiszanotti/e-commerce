import { authAxios, axi } from "./useAxios";

export const getProductsApi = async ({ pageParam = 1 }) => {
  const response = await axi(`/products?page=${pageParam}&pages=10`);
  return response.data;
};
