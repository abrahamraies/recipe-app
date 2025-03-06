import { RegisterUserDto } from "@/types/auth";
import { api, handleApiError } from "./api";

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const registerUser = async (userData: RegisterUserDto) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const response = await api.get("/auth/verify-email", {
      params: { token },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};