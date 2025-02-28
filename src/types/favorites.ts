import { RecipeDto } from "./recipes";

export interface FavoriteDto {
    userId: number;
    recipeId: number;
    recipe?: RecipeDto;
  }