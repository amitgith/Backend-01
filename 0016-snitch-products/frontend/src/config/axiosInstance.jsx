import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    // 1. Agar 401 hai, retry nahi hua hai, aur fail hone wali request khud auth check/refresh nahi hai
    if (
      error.response?.status === 401 &&
      !originalReq._retry &&
      !originalReq.url.includes("/auth/refresh") &&
      !originalReq.url.includes("/auth/me")
    ) {
      originalReq._retry = true;

      try {
        // Token refresh karne ke liye backend ka refresh endpoint call karein
        await axiosInstance.post("/auth/refresh");
        // Purani request dubara run karein
        return axiosInstance(originalReq);
      } catch (refreshError) {
        // Refresh fail ho jaye tabhi user ko logout/redirect karein
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    // 2. Baaki sabhi errors ko properly aage reject karein
    return Promise.reject(error);
  },
);
