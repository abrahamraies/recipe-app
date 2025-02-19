import { RegisterUserDto } from "@/types/auth";
import { api } from "./api";
import axios from "axios";


export const registerUser = async (userData: RegisterUserDto) => {
  const response = await axios.post("/api/auth/register", userData);
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (email: string) => {
  const response = await api.post(`/auth/forgot-password/${email}`);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await axios.get(`/api/auth/verify-email?token=${token}`);
  return response.data;
};