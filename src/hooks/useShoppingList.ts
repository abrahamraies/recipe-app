import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { RootState } from "../store/store";
import {
  fetchShopListAsync,
  removeItemAsync,
} from "../store/thunks/shoppingListThunks";
import { useEffect } from "react";

export const useShoppingList = (userId: number) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.shoppingList.items);

  useEffect(() => {
    dispatch(fetchShopListAsync(userId));
  }, [dispatch, userId]);

  const handleRemoveItem = async (itemId: number) => {
    await dispatch(removeItemAsync(itemId));
  };

  return { items, handleRemoveItem };
};