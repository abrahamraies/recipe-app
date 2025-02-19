import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateEmailDto, UpdateUserDto } from "../../types/user";

interface AuthState {
  user: {
    id?: number;
    name?: string;
    email?: string;
  } | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateEmail: (state, action: PayloadAction<UpdateEmailDto>) => {
      if (state.user) {
        state.user.email = action.payload.newEmail;
      }
    },
    updateUser: (state, action: PayloadAction<UpdateUserDto>) => {
      if (state.user) {
        state.user.name = action.payload.name;
      }
    },
  },
});

export const { login, logout, updateEmail, updateUser } = authSlice.actions;
export default authSlice.reducer;