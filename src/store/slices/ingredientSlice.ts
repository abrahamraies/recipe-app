import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientResponse } from "../../types/ingredients";

interface IngredientState {
  ingredients: IngredientResponse[];
  searchResults: IngredientResponse[];
}

const initialState: IngredientState = {
  ingredients: [],
  searchResults: [],
};

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<IngredientResponse[]>) => {
      state.ingredients = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<IngredientResponse[]>) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
});

export const { setIngredients, setSearchResults, clearSearchResults } = ingredientSlice.actions;
export default ingredientSlice.reducer;