import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  forgotPassword,
  verifyEmail,
} from "../../services/authService";
import { RegisterUserDto } from "@/types/auth";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      return response;
    } catch (error) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al iniciar sesión");
        }
        return rejectWithValue("Error desconocido al iniciar sesión");
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (userData: RegisterUserDto, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al registrar usuario");
        }
        return rejectWithValue("Error desconocido al registrar usuario");
    }
  }
);

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await forgotPassword(email);
      return response;
    } catch (error) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al recuperar contraseña");
        }
      return rejectWithValue("Error desconocido al recuperar contraseña");
    }
  }
);

export const verifyEmailAsync = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await verifyEmail(token);
      return response;
    } catch (error) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { response?: { data: unknown } };
        return rejectWithValue(axiosError.response?.data || "Error al verificar email");
        }
      return rejectWithValue("Error desconocido al verificar email");
    }
  }
);