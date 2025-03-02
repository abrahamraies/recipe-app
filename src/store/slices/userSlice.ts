import { createSlice } from "@reduxjs/toolkit";
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

const createAsyncThunkHandler = (state: UserState) => ({
  pending: () => {
    state.loading = true;
    state.error = null;
  },
  fulfilled: () => {
    state.loading = false;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rejected: (action: any) => {
    state.loading = false;
    state.error = action.payload as string;
  },
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, createAsyncThunkHandler(initialState).pending)
      .addCase(fetchUserAsync.fulfilled, createAsyncThunkHandler(initialState).fulfilled)
      .addCase(fetchUserAsync.rejected, createAsyncThunkHandler(initialState).rejected)
      .addCase(updateUserAsync.pending, createAsyncThunkHandler(initialState).pending)
      .addCase(updateUserAsync.fulfilled, createAsyncThunkHandler(initialState).fulfilled)
      .addCase(updateUserAsync.rejected, createAsyncThunkHandler(initialState).rejected)
      .addCase(updateEmailAsync.pending, createAsyncThunkHandler(initialState).pending)
      .addCase(updateEmailAsync.fulfilled, createAsyncThunkHandler(initialState).fulfilled)
      .addCase(updateEmailAsync.rejected, createAsyncThunkHandler(initialState).rejected)
      .addCase(updatePasswordAsync.pending, createAsyncThunkHandler(initialState).pending)
      .addCase(updatePasswordAsync.fulfilled, createAsyncThunkHandler(initialState).fulfilled)
      .addCase(updatePasswordAsync.rejected, createAsyncThunkHandler(initialState).rejected);
  },
});

export default userSlice.reducer;