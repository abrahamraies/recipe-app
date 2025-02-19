import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShopListDto } from "../../types/shoppingList";

interface ShoppingListState {
  items: ShopListDto[];
}

const initialState: ShoppingListState = {
  items: [],
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ShopListDto>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.ingredientId !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;