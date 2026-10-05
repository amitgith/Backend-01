import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    let originalReq = error.config;

    if (error.response.status === 401 && !originalReq.retry) {
      originalReq.retry = true;

      try {
        await axiosInstance.get("/auth/me");
        return axiosInstance(originalReq);
      } catch (error) {
        window.location.href = "/";
        return Promise.reject(error);
      }
    }
  },
);
