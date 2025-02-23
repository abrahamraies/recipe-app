import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
} from "../../services/favoriteService";
import { FavoriteDto } from "@/types/favorites";

export const fetchFavoritesAsync = createAsyncThunk(
  "favorites/fetch",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await getFavorites(userId);
      return response;
    } catch (error) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data: unknown } };
            return rejectWithValue(axiosError.response?.data || "Error al cargar favoritos");
          }
          return rejectWithValue("Error desconocido al cargar favoritos");
    }
  }
);

export const addFavoriteAsync = createAsyncThunk(
  "favorites/add",
  async (favoriteData: FavoriteDto, { rejectWithValue }) => {
    try {
      const response = await addFavorite(favoriteData);
      return response;
    } catch (error) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data: unknown } };
            return rejectWithValue(axiosError.response?.data || "Error al agregar favorito");
          }
          return rejectWithValue("Error desconocido al agregar favorito");
    }
  }
);

export const removeFavoriteAsync = createAsyncThunk(
  "favorites/remove",
  async (favoriteId: number, { rejectWithValue }) => {
    try {
      await removeFavorite(favoriteId);
      return favoriteId;
    } catch (error) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data: unknown } };
            return rejectWithValue(axiosError.response?.data || "Error al quitar favorito");
          }
          return rejectWithValue("Error desconocido al quitar favorito");
    }
  }
);

export const checkFavoriteAsync = createAsyncThunk(
  "favorites/check",
  async ({ userId, recipeId }: { userId: number; recipeId: number }, { rejectWithValue }) => {
    try {
      const response = await checkFavorite(userId, recipeId);
      return response;
    } catch (error) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data: unknown } };
            return rejectWithValue(axiosError.response?.data || "Error al verificar favorito");
          }
          return rejectWithValue("Error desconocido al verificar favorito");
    }
  }
);