import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientResponse } from "../../types/ingredients";
import {
    fetchIngredientsAsync,
  } from "../thunks/ingredientThunks";

  interface IngredientState {
    ingredients: IngredientResponse[];
    searchResults: IngredientResponse[];
    loading: boolean;
    error: string | null;
  }

  const initialState: IngredientState = {
    ingredients: [],
    searchResults: [],
    loading: false,
    error: null
  };  

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    fetchIngredientsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchIngredientsSuccess: (state, action: PayloadAction<IngredientResponse[]>) => {
      state.ingredients = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchIngredientsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<IngredientResponse[]>) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsAsync.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchIngredientsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  fetchIngredientsStart,
  fetchIngredientsSuccess,
  fetchIngredientsFailure,
  setSearchResults,
  clearSearchResults,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;