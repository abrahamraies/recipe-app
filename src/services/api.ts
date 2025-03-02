import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7253/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const handleApiError = (error: unknown) => {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as { response?: { data: unknown } };
    throw new Error(JSON.stringify(axiosError.response?.data || "Error desconocido"));
  }
  throw new Error("Error desconocido");
};