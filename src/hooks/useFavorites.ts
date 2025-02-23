import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { RootState } from "../store/store";
import {
  fetchFavoritesAsync,
  addFavoriteAsync,
  removeFavoriteAsync,
} from "../store/thunks/favoriteThunks";
import { useEffect } from "react";
import { FavoriteDto } from "@/types/favorites";

export const useFavorites = (userId: number) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state: RootState) => state.favorites.items);

  useEffect(() => {
    dispatch(fetchFavoritesAsync(userId));
  }, [dispatch, userId]);

  const handleAddFavorite = async (favoriteData: FavoriteDto) => {
    await dispatch(addFavoriteAsync(favoriteData));
  };

  const handleRemoveFavorite = async (favoriteId: number) => {
    await dispatch(removeFavoriteAsync(favoriteId));
  };

  return { favorites, handleAddFavorite, handleRemoveFavorite };
};