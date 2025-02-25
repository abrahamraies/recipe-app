import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getIngredients,
  getIngredient,
  searchIngredients,
  autocompleteIngredients,
} from "../../services/ingredientService";

export const fetchIngredientsAsync = createAsyncThunk(
  "ingredients/fetch",
  async ({ pageNumber = 1, pageSize = 10 }: { pageNumber: number; pageSize: number }, { rejectWithValue }) => {
    try {
      const response = await getIngredients(pageNumber, pageSize);
      return response;
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al cargar ingredientes");
      }
      return rejectWithValue("Error desconocido al cargar ingredientes");
    }
  }
);

export const fetchIngredientAsync = createAsyncThunk(
  "ingredients/fetchDetails",
  async (ingredientId: number, { rejectWithValue }) => {
    try {
      const response = await getIngredient(ingredientId);
      return response;
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al cargar detalles del ingrediente");
      }
      return rejectWithValue("Error desconocido al cargar detalles del ingrediente");
    }
  }
);

export const searchIngredientsAsync = createAsyncThunk(
  "ingredients/search",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await searchIngredients(query);
      return response;
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al buscar ingredientes");
      }
      return rejectWithValue("Error desconocido al buscar ingredientes");
    }
  }
);

export const autocompleteIngredientsAsync = createAsyncThunk(
  "ingredients/autocomplete",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await autocompleteIngredients(query);
      return response;
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al autocompletar ingredientes");
      }
      return rejectWithValue("Error desconocido al autocompletar ingredientes");
    }
  }
);