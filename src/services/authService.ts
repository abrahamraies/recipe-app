import { RegisterUserDto } from "@/types/auth";
import { api } from "./api";

const handleApiError = (error: unknown) => {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as { response?: { data: unknown } };
    throw new Error(JSON.stringify(axiosError.response?.data || "Error desconocido"));
  }
  throw new Error("Error desconocido");
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const registerUser = async (userData: RegisterUserDto) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};