import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
const api = axios.create({
  baseURL: "http://localhost:5173/api",
  withCredentials: true,
});
export const useApi = () => {
  const { accessToken } = useAuth();
  api.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return api;
};
