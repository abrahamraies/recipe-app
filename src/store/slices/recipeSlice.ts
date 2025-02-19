import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipeDto } from "../../types/recipes";

interface RecipeState {
  favorites: RecipeDto[];
  recipes: RecipeDto[];
  selectedRecipe: RecipeDto | null;
}

const initialState: RecipeState = {
  favorites: [],
  recipes: [],
  selectedRecipe: null,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<RecipeDto>) => {
      state.favorites.push(action.payload);
    },
    setRecipes: (state, action: PayloadAction<RecipeDto[]>) => {
      state.recipes = action.payload;
    },
    setSelectedRecipe: (state, action: PayloadAction<RecipeDto>) => {
      state.selectedRecipe = action.payload;
    },
    clearSelectedRecipe: (state) => {
      state.selectedRecipe = null;
    },
  },
});

export const {
  addToFavorites,
  setRecipes,
  setSelectedRecipe,
  clearSelectedRecipe,
} = recipeSlice.actions;

export default recipeSlice.reducer;