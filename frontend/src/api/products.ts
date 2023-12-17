import { Product } from "../Interfaces";
import { authAxios, axi } from "./useAxios";

export const getProductsApi = async ({ pageParam = 1 }) => {
  try {
    const response = await axi(`/products?page=${pageParam}&pages=10`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductApi = async (id: number) => {
  try {
    await authAxios.delete(`/products/delete/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const getProductByIdApi = async (id: number) => {
  try {
    const { data } = await authAxios(`/products/get/admin/${id}/`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductBySlugApi = async (slug: string) => {
  try {
    const { data } = await authAxios(`/products/get/${slug}/`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchProductApi = async (query: string) => {
  try {
    const { data } = await authAxios(`/products/search/?query=${query}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategoryApi = async (category: string) => {
  try {
    const { data } = await authAxios(`/products/category/${category}/`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createProductApi = async (data: Product) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

export const editProductApi = async (data: Product) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("count_in_stock", data.count_in_stock.toString());
    formData.append("category", data.category);
    formData.append("price", data.price.toString());
    if (data.image) {
      formData.append("image", data.image);
    }
    await authAxios.put(`/products/edit/${data.id}/`, formData);
  } catch (error) {
    console.log(error);
  }
};

export const createReviewApi = async (description: string, rating: number, productId: number) => {
  try {
    await authAxios.post(`/products/review/${productId}/`, { description, rating });
  } catch (error) {}
};
