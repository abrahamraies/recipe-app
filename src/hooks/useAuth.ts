import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return {
    user,
    isAuthenticated: !!user,
  };
};