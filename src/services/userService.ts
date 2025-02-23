import { api } from "./api";
import { UpdateUserDto, UpdateEmailDto, UpdatePasswordDto } from "../types/user";

export const getUser = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id: number, userData: UpdateUserDto) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const updateEmail = async (id: number, emailData: UpdateEmailDto) => {
  const response = await api.put(`/users/${id}/email`, emailData);
  return response.data;
};

export const updatePassword = async (id: number, passwordData: UpdatePasswordDto) => {
  const response = await api.put(`/users/${id}/password`, passwordData);
  return response.data;
};