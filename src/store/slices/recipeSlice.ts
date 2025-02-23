import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipeDto } from "../../types/recipes";
import {
  fetchRecipesAsync,
  fetchRandomRecipesAsync,
  fetchRecipeAsync,
  searchRecipesAsync,
} from "../thunks/recipeThunks";
import { PagedResponse } from "@/types/pagination";

interface RecipeState {
  allRecipes: RecipeDto[];
  favorites: RecipeDto[];
  recipes: PagedResponse<RecipeDto> | null;
  randomRecipes: RecipeDto[];
  selectedRecipe: RecipeDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  allRecipes: [],
  randomRecipes: [],
  favorites: [],
  recipes: null,
  selectedRecipe: null,
  loading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    fetchRecipesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRecipesSuccess: (state, action) => {
      state.recipes = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchRecipesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedRecipe: (state, action: PayloadAction<RecipeDto>) => {
      state.selectedRecipe = action.payload;
    },
    clearSelectedRecipe: (state) => {
      state.selectedRecipe = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipesAsync.fulfilled, (state, action) => {
        state.allRecipes = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchRecipesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRandomRecipesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRandomRecipesAsync.fulfilled, (state, action) => {
        state.randomRecipes = action.payload;
        state.loading = false;
      })
      .addCase(fetchRandomRecipesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRecipeAsync.fulfilled, (state, action) => {
        state.selectedRecipe = action.payload;
      })
      .addCase(searchRecipesAsync.fulfilled, (state, action) => {
        state.recipes = action.payload;
      });
  },
});

export const {
  fetchRecipesStart,
  fetchRecipesSuccess,
  fetchRecipesFailure,
  setSelectedRecipe,
  clearSelectedRecipe,
} = recipeSlice.actions;

export default recipeSlice.reducer;