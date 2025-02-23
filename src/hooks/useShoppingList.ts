import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { RootState } from "../store/store";
import {
  fetchShopListAsync,
  addItemAsync,
  removeItemAsync,
} from "../store/thunks/shoppingListThunks";
import { useEffect } from "react";
import { ShopListDto } from "@/types/shoppingList";

export const useShoppingList = (userId: number) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.shoppingList.items);

  useEffect(() => {
    dispatch(fetchShopListAsync(userId));
  }, [dispatch, userId]);

  const handleAddItem = async (itemData: ShopListDto) => {
    await dispatch(addItemAsync(itemData));
  };

  const handleRemoveItem = async (itemId: number) => {
    await dispatch(removeItemAsync(itemId));
  };

  return { items, handleAddItem, handleRemoveItem };
};