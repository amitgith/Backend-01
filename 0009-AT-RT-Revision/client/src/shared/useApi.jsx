import { useContext } from "react";
import { MyAuth } from "../context/MyContext";
import axios from "axios";

const useApi = () => {
  const { accessToken, setAccessToken } = useContext(MyAuth);
  const api = axios.create({
    baseURL: "http://localhost:5173/api",
    withCredentials: true,
  });
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        const res = await axios.post("/api/refresh");
        setAccessToken(res.data.accessToken);
        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axios(error.config);
      }
      return Promise.reject(error);
    },
  );
  return api;
};

export default useApi;
