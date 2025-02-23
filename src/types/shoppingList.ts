import { IngredientDto } from "./ingredients";

export interface ShopListDto {
  id: number;
  userId: number;
  ingredientId: number;
  ingredient: IngredientDto;
}