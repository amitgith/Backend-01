import { useContext } from "react";
import { AuthContext } from "../modules/auth/context/useAuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be use within an AuthProvider");
  }
  return context;
};
