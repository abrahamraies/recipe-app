import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { RootState } from "../store/store";
import { fetchRecipesAsync } from "../store/thunks/recipeThunks";
import { useEffect } from "react";

export const useRecipes = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state: RootState) => state.recipes.recipes);

  useEffect(() => {
    dispatch(fetchRecipesAsync({ pageNumber: 1, pageSize: 1000 }));
  }, [dispatch]);

  return { recipes };
};