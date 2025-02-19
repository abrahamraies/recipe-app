export interface IngredientResponse {
    id: number; 
    name: string;
  }
  
  export interface IngredientSearchRequest {
    query: string;
  }
  
  export interface IngredientUpdateDto {
    name?: string;
    unit?: string;
  }