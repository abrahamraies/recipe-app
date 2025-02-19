import { api } from "./api";

export const getShopList = async (userId: number) => {
  const response = await api.get(`/api/shoplist/${userId}`);
  return response.data;
};

export const addToShopList = async (itemData: { userId: number; ingredientId: number }) => {
  const response = await api.post("/api/shoplist", itemData);
  return response.data;
};

export const removeFromShopList = async (itemId: number) => {
  const response = await api.delete(`/api/shoplist/${itemId}`);
  return response.data;
};