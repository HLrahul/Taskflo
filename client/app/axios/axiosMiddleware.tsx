import axios from "axios";
import { useRouter } from "next/navigation";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const router = useRouter();

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.get("/refresh");

        if (response.status === 200) {
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        router.push("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
