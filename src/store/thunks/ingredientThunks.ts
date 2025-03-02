import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients, getIngredient } from "../../services/ingredientService";
import { handleApiError } from "@/services/api";

export const fetchIngredientsAsync = createAsyncThunk(
  "ingredients/fetch",
  async (
    { pageNumber = 1, pageSize = 10 }: { pageNumber: number; pageSize: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await getIngredients(pageNumber, pageSize);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
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
      return rejectWithValue(handleApiError(error));
    }
  }
);