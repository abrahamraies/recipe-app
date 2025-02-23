import { RegisterUserDto } from "@/types/auth";
import { api } from "./api";

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (userData: RegisterUserDto) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await api.get(`/auth/verify-email?token=${token}`);
  return response.data;
};