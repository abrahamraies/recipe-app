import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
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