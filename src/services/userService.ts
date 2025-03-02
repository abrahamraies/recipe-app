import { api, handleApiError } from "./api";
import { UpdateUserDto, UpdateEmailDto, UpdatePasswordDto } from "../types/user";

export const getUser = async (id: number) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUser = async (id: number, userData: UpdateUserDto) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateEmail = async (id: number, emailData: UpdateEmailDto) => {
  try {
    const response = await api.put(`/users/${id}/email`, emailData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updatePassword = async (id: number, passwordData: UpdatePasswordDto) => {
  try {
    const response = await api.put(`/users/${id}/password`, passwordData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};