import { useState } from "react";
import {
  getIngredients,
  searchIngredients,
  autocompleteIngredients,
} from "../services/ingredientService";

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [autocompleteResults, setAutocompleteResults] = useState([]);

  const fetchIngredients = async () => {
    const data = await getIngredients();
    setIngredients(data);
  };

  const handleSearchIngredients = async (query: string) => {
    const data = await searchIngredients(query);
    setSearchResults(data);
  };

  const handleAutocompleteIngredients = async (query: string) => {
    const data = await autocompleteIngredients(query);
    setAutocompleteResults(data);
  };

  return {
    ingredients,
    searchResults,
    autocompleteResults,
    fetchIngredients,
    handleSearchIngredients,
    handleAutocompleteIngredients,
  };
};