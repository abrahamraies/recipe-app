import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import recipeReducer from "./slices/recipeSlice";
import ingredientReducer from "./slices/ingredientSlice";
import shoppingListReducer from "./slices/shoppingListSlice";
import favoriteReducer from "./slices/favoriteSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoriteReducer,
    recipes: recipeReducer,
    ingredients: ingredientReducer,
    shoppingList: shoppingListReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;