import { api } from "./api";

export const getIngredients = async (pageNumber = 1, pageSize = 10) => {
  const response = await api.get("/ingredients", {
    params: { pageNumber, pageSize },
  });
  return response.data;
};

export const getIngredient = async (id: number) => {
  const response = await api.get(`/ingredients/${id}`);
  return response.data;
};