import { api } from "./api";

export const getIngredients = async (pageNumber = 1, pageSize = 10) => {
  const response = await api.get("/api/ingredients", {
    params: { pageNumber, pageSize },
  });
  return response.data;
};

export const getIngredient = async (id: number) => {
  const response = await api.get(`/api/ingredients/${id}`);
  return response.data;
};

export const searchIngredients = async (name: string) => {
  const response = await api.get("/api/ingredients/search", {
    params: { name },
  });
  return response.data;
};

export const autocompleteIngredients = async (name: string) => {
  const response = await api.get("/api/ingredients/autocomplete", {
    params: { name },
  });
  return response.data;
};