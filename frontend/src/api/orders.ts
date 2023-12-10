import { Order } from "../Interfaces";
import { authAxios } from "./useAxios";

export const createOrderApi = async (data: Order) => {
  await authAxios.post("/orders/create/", data);
};
