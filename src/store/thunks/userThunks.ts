import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUser,
  updateUser,
  updateEmail,
  updatePassword,
} from "../../services/userService";
import { UpdateEmailDto, UpdatePasswordDto, UpdateUserDto } from "@/types/user";
import { handleApiError } from "../../services/api";

export const fetchUserAsync = createAsyncThunk(
  "user/fetch",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await getUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/update",
  async ({ id, userData }: { id: number; userData: UpdateUserDto }, { rejectWithValue }) => {
    try {
      const response = await updateUser(id, userData);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateEmailAsync = createAsyncThunk(
  "user/updateEmail",
  async ({ id, emailData }: { id: number; emailData: UpdateEmailDto }, { rejectWithValue }) => {
    try {
      const response = await updateEmail(id, emailData);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updatePasswordAsync = createAsyncThunk(
  "user/updatePassword",
  async ({ id, passwordData }: { id: number; passwordData: UpdatePasswordDto }, { rejectWithValue }) => {
    try {
      const response = await updatePassword(id, passwordData);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);