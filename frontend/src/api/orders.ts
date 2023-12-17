import { Order } from "../Interfaces";
import { authAxios } from "./useAxios";

export const createOrderApi = async (data: Order) => {
  await authAxios.post("/orders/create/", data);
};

export const myOrdersApi = async () => {
  const { data } = await authAxios.get("/orders/my/orders");
  return data;
};

export const detailOrderApi = async (id: number) => {
  const { data } = await authAxios.get(`/orders/detail/${id}`);
  return data;
};
