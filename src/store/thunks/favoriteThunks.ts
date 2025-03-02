import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../../services/favoriteService";
import { handleApiError } from "../../services/api";

export const fetchFavoritesAsync = createAsyncThunk(
  "favorites/fetch",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await getFavorites(userId);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const addFavoriteAsync = createAsyncThunk(
  "favorites/add",
  async ({ userId, recipeId }: { userId: number; recipeId: number }, { rejectWithValue }) => {
    try {
      const response = await addFavorite(userId, recipeId);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const removeFavoriteAsync = createAsyncThunk(
  "favorites/remove",
  async ({ userId, recipeId }: { userId: number; recipeId: number }, { rejectWithValue }) => {
    try {
      const updatedFavorites = await removeFavorite(userId, recipeId);
      return updatedFavorites;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);