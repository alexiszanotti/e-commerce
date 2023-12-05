import { Product } from "../Interfaces";
import { authAxios, axi } from "./useAxios";

export const getProductsApi = async ({ pageParam = 1 }) => {
  const response = await axi(`/products?page=${pageParam}&pages=10`);
  return response.data;
};

export const createProductApi = async (data: Product) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("count_in_stock", data.count_in_stock.toString());
  formData.append("category", data.category);
  formData.append("price", data.price.toString());
  if (data.image) {
    formData.append("image", data.image);
  }

  await authAxios.post("/products/post/", formData);
};
