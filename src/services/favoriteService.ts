import { api } from "./api";
import { handleApiError } from "./api";

export const getFavorites = async (userId: number) => {
  try {
    const response = await api.get(`/favorites/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addFavorite = async (userId: number, recipeId: number) => {
  try {
    const response = await api.post("/favorites", { userId, recipeId });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const removeFavorite = async (userId: number, recipeId: number) => {
  try {
    const response = await api.delete(`/favorites/?userId=${userId}&recipeId=${recipeId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};