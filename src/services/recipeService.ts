import { api } from "./api";
import { RecipeDto, RecipeSearchRequest } from "../types/recipes";
import { PagedResponse } from "@/types/pagination";

export const getRecipes = async (pageNumber = 1, pageSize = 10): Promise<PagedResponse<RecipeDto>> => {
  const response = await api.get("/recipes", {
    params: { pageNumber, pageSize },
  });
  return response.data;
};

export const getRecipe = async (id: number) => {
  const response = await api.get(`/recipes/${id}`);
  return response.data;
};

export const searchRecipes = async (searchParams: RecipeSearchRequest) => {
  const response = await api.get("/recipes/search", {
    params: { ingredients: searchParams.ingredientIds },
  });
  return response.data;
};