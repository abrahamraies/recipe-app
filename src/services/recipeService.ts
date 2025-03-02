import { RecipeSearchRequest } from "@/types/recipes";
import { api, handleApiError } from "./api";

export const getRecipes = async (pageNumber = 1, pageSize = 10) => {
  try {
    const response = await api.get("/recipes", {
      params: { pageNumber, pageSize },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getRecipe = async (id: number) => {
  try {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const searchRecipes = async (searchParams: RecipeSearchRequest) => {
  try {
    const response = await api.get("/recipes/search", {
      params: { ingredients: searchParams.ingredientIds },
      paramsSerializer: (params) => {
        return Object.keys(params)
          .map((key) => {
            const value = params[key];
            if (Array.isArray(value)) {
              return value.map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join("&");
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          })
          .join("&");
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};