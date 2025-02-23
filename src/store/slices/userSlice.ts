import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchUserAsync,
    updateUserAsync,
    updateEmailAsync,
    updatePasswordAsync,
  } from "../thunks/userThunks";

interface UserState {
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateEmailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmailAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateEmailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePasswordAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateStart, updateSuccess, updateFailure } = userSlice.actions;

export default userSlice.reducer;