import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUser,
  updateUser,
  updateEmail,
  updatePassword,
} from "../../services/userService";
import { UpdateEmailDto, UpdatePasswordDto, UpdateUserDto } from "@/types/user";

export const fetchUserAsync = createAsyncThunk(
  "user/fetch",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await getUser(userId);
      return response;
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al obtener usuario");
      }
      return rejectWithValue("Error desconocido al obtener usuario");
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
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al actualizar usuario");
      }
      return rejectWithValue("Error desconocido al actualizar usuario");
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
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al actualizar email");
      }
      return rejectWithValue("Error desconocido al actualizar email");
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
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al actualizar contraseña");
      }
      return rejectWithValue("Error desconocido al actualizar contraseña");
    }
  }
);