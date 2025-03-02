import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getShopList,
  addToShopList,
  removeFromShopList,
} from "../../services/shoppingListService";
import { handleApiError } from "../../services/api";

export const fetchShopListAsync = createAsyncThunk(
  "shoppingList/fetch",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await getShopList(userId);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const addItemAsync = createAsyncThunk(
  "shoppingList/add",
  async (
    itemData: { userId: number; itemId: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      await addToShopList(itemData);
      await dispatch(fetchShopListAsync(itemData.userId));
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const removeItemAsync = createAsyncThunk(
  "shoppingList/remove",
  async (itemId: number, { rejectWithValue }) => {
    try {
      await removeFromShopList(itemId);
      return itemId;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);