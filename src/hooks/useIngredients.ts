import { useState } from "react";
import {
  getIngredients,
} from "../services/ingredientService";

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    const data = await getIngredients();
    setIngredients(data);
  };

  return {
    ingredients,
    fetchIngredients,
  };
};