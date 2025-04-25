import axios from "axios";
import { setupInterceptor } from "./interceptor";

const axiosInstance = axios.create({
  baseURL: [import.meta.env.VITE_DEV_URL,import.meta.env.VITE_PRODUCTION_URL],
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

setupInterceptor(axiosInstance)

export default axiosInstance;
