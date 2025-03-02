import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRecipes,
  getRecipe,
  searchRecipes,
} from "../../services/recipeService";
import { RecipeDto, RecipeSearchRequest } from "@/types/recipes";
import { handleApiError } from "../../services/api";

const selectRandomRecipes = (recipes: RecipeDto[], count: number): RecipeDto[] => {
  const shuffled = [...recipes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const fetchRecipesAsync = createAsyncThunk(
  "recipes/fetch",
  async (
    { pageNumber, pageSize }: { pageNumber: number; pageSize: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await getRecipes(pageNumber, pageSize);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchRandomRecipesAsync = createAsyncThunk(
  "recipes/fetchRandom",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRecipes();
      const randomRecipes = selectRandomRecipes(response.data, 3);
      return randomRecipes;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchRecipeAsync = createAsyncThunk(
  "recipes/fetchDetails",
  async (recipeId: number, { rejectWithValue }) => {
    try {
      const response = await getRecipe(recipeId);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const searchRecipesAsync = createAsyncThunk(
  "recipes/search",
  async (searchParams: RecipeSearchRequest, { rejectWithValue }) => {
    try {
      const response = await searchRecipes(searchParams);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);