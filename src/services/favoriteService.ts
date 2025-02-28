
import { api } from "./api";

export const getFavorites = async (userId: number) => {
  const response = await api.get(`/favorites/${userId}`);
  return response.data;
};

export const addFavorite = async (userId: number, recipeId: number) => {
  const response = await api.post("/favorites", { userId, recipeId });
  return response.data;
};

export const removeFavorite = async (userId: number, recipeId: number) => {
  const response = await api.delete(`/favorites/?userId=${userId}&recipeId=${recipeId}`);
  return response.data;
};