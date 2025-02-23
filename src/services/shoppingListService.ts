import { api } from "./api";

export const getShopList = async (userId: number) => {
  const response = await api.get(`/shop-list/${userId}`);
  return response.data;
};

export const addToShopList = async (itemData: { userId: number; ingredientId: number }) => {
  const response = await api.post("/shop-list", itemData);
  return response.data;
};

export const removeFromShopList = async (itemId: number) => {
  const response = await api.delete(`/shop-list/${itemId}`);
  return response.data;
};