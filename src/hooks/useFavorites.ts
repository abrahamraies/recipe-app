import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { RootState } from "../store/store";
import {
  fetchFavoritesAsync,
  removeFavoriteAsync,
} from "../store/thunks/favoriteThunks";
import { useEffect } from "react";

export const useFavorites = (userId: number) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state: RootState) => state.favorites.items);

  useEffect(() => {
    dispatch(fetchFavoritesAsync(userId));
  }, [dispatch, userId]);

  const handleRemoveFavorite = async (userId: number, recipeId: number) => {
    await dispatch(removeFavoriteAsync({ userId, recipeId }));
  };

  return { favorites, handleRemoveFavorite };
};