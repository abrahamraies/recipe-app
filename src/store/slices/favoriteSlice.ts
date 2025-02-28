import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteDto } from "../../types/favorites";
import {
    fetchFavoritesAsync,
    addFavoriteAsync,
    removeFavoriteAsync,
    checkFavoriteAsync,
} from "../thunks/favoriteThunks";

interface FavoritesState {
    items: FavoriteDto[];
    loading: boolean;
    error: string | null;
}

const initialState: FavoritesState = {
    items: [],
    loading: false,
    error: null,
};

const favoriteSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavorites: (state, action: PayloadAction<FavoriteDto[]>) => {
            state.items = action.payload;
        },
        addFavorite: (state, action: PayloadAction<FavoriteDto>) => {
            state.items.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((fav) => fav.recipeId !== action.payload);
        },
        clearFavorites: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoritesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavoritesAsync.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchFavoritesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addFavoriteAsync.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(removeFavoriteAsync.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(checkFavoriteAsync.fulfilled, () => {
            });
    },
});

export const { setFavorites, addFavorite, removeFavorite, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;