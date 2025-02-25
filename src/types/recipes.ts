import { IngredientDto } from "./ingredients";

export interface RecipeDto {
    id: number;
    title: string;
    description?: string;
    instructions?: string;
    preparationTime: number;
    imageUrl?: string;
    recipeUrl?: string; 
    ingredients: RecipeIngredientDto[]; 
  }
  
  export interface RecipeIngredientDto {
    ingredientId: number;
    ingredient: IngredientDto;
    quantity: number;
  }
  
  export interface RecipeSearchRequest {
    ingredientIds: number[];
  }