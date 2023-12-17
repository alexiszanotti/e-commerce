import { Order } from "../Interfaces";
import { authAxios } from "./useAxios";

export const createOrderApi = async (data: Order) => {
  try {
    await authAxios.post("/orders/create/", data);
  } catch (error) {
    console.log(error);
  }
};

export const myOrdersApi = async () => {
  try {
    const { data } = await authAxios.get("/orders/my/orders");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const detailOrderApi = async (id: number) => {
  try {
    const { data } = await authAxios.get(`/orders/detail/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrdersApi = async () => {
  try {
    const { data } = await authAxios.get("/orders/");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderApi = async (id: number) => {
  try {
    await authAxios.put(`/orders/deliver/${id}`);
  } catch (error) {
    console.log(error);
  }
};
