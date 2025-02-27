import { createSlice } from "@reduxjs/toolkit";
import { ShopListDto } from "../../types/shoppingList";
import {
  fetchShopListAsync,
  addItemAsync,
  removeItemAsync,
} from "../thunks/shoppingListThunks";

interface ShoppingListState {
  items: ShopListDto[];
  loading: boolean;
  error: string | null;
}

const initialState: ShoppingListState = {
  items: [],
  loading: false,
  error: null,
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
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

      .addCase(addItemAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(removeItemAsync.fulfilled, (state, action) => {
        const itemIdToRemove = action.payload;
        state.items = state.items.filter((item) => item.id !== itemIdToRemove);
      });
  },
});

export const { clearItems } = shoppingListSlice.actions;

export default shoppingListSlice.reducer;