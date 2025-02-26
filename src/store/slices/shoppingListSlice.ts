import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShopListDto } from "../../types/shoppingList";
import {
    fetchShopListAsync,
    addItemAsync,
    removeItemAsync,
  } from "../thunks/shoppingListThunks";

interface ShoppingListState {
  items: ShopListDto[];
  addItems: number[];
  loading: boolean;
  error: string | null;
}

const initialState: ShoppingListState = {
  items: [],
  addItems: [],
  loading: false,
  error: null,
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    fetchShopListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchShopListSuccess: (state, action: PayloadAction<ShopListDto[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchShopListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addItem: (state, action: PayloadAction<number>) => {
      if (!state.addItems.includes(action.payload)) {
        state.addItems.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.ingredientId !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopListAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopListAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchShopListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeItemAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.ingredientId !== action.payload);
      });
  },
});

export const {
  fetchShopListStart,
  fetchShopListSuccess,
  fetchShopListFailure,
  addItem,
  removeItem,
  clearItems,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;