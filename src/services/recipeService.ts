import { api } from "./api";
import { RecipeSearchRequest } from "../types/recipes";

export const getRecipes = async (pageNumber = 1, pageSize = 10) => {
  const response = await api.get("/api/recipes", {
    params: { pageNumber, pageSize },
  });
  return response.data;
};

export const getRecipe = async (id: number) => {
  const response = await api.get(`/api/recipes/${id}`);
  return response.data;
};

export const searchRecipes = async (searchParams: RecipeSearchRequest) => {
  const response = await api.get("/api/recipes/search", {
    params: { ingredients: searchParams.ingredientIds },
  });
  return response.data;
};