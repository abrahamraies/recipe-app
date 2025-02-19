
import { FavoriteDto } from "../types/favorites";
import { api } from "./api";

export const getFavorites = async (userId: number) => {
  const response = await api.get(`/api/favorites/${userId}`);
  return response.data;
};

export const addFavorite = async (favoriteData: FavoriteDto) => {
  const response = await api.post("/api/favorites", favoriteData);
  return response.data;
};

export const removeFavorite = async (favoriteId: number) => {
  const response = await api.delete(`/api/favorites/${favoriteId}`);
  return response.data;
};

export const checkFavorite = async (userId: number, recipeId: number) => {
  const response = await api.get(`/api/favorites/check?userId=${userId}&recipeId=${recipeId}`);
  return response.data;
};