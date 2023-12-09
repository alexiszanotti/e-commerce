import { authAxios, axi } from "./useAxios";

export const registerApi = async (
  email: string,
  name: string,
  last_name: string,
  password: string
) => {
  try {
    await axi.post("/users/register/", { email, name, last_name, password });
  } catch (error) {
    console.log(error);
  }
};

export const loginApi = async (email: string, password: string) => {
  try {
    const { status, data } = await axi.post("/users/login/", { email, password });
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUsersApi = async () => {
  try {
    const { status, data } = await authAxios.get("/users/get/");
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserApi = async (id: number) => {
  try {
    await authAxios.delete(`/users/delete/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async (query: string) => {
  try {
    const { data } = await authAxios.get(`/users/search/?query=${query}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
