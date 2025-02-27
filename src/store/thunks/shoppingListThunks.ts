import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getShopList,
  addToShopList,
  removeFromShopList,
} from "../../services/shoppingListService";

export const fetchShopListAsync = createAsyncThunk(
  "shoppingList/fetch",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await getShopList(userId);
      return response;
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al cargar lista de compras");
      }
      return rejectWithValue("Error desconocido al cargar lista de compras");
    }
  }
);

export const addItemAsync = createAsyncThunk(
  "shoppingList/add",
  async (itemData: { userId: number; itemId: number }, { dispatch, rejectWithValue }) => {
    try {
      await addToShopList(itemData);
      await dispatch(fetchShopListAsync(itemData.userId));
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al agregar elemento");
      }
      return rejectWithValue("Error desconocido al agregar elemento");
    }
  }
);

export const removeItemAsync = createAsyncThunk(
  "shoppingList/remove",
  async (itemId: number, { rejectWithValue }) => {
    try {
      await removeFromShopList(itemId);
      return itemId;
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al quitar elemento");
      }
      return rejectWithValue("Error desconocido al quitar elemento");
    }
  }
);