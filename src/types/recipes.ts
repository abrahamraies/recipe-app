export interface RecipeDto {
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
    quantity: number;
  }
  
  export interface RecipeSearchRequest {
    ingredientIds: number[];
  }