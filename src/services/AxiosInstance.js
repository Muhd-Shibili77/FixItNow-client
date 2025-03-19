import axios from "axios";
import { setupInterceptor } from "./interceptor";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

setupInterceptor(axiosInstance)

export default axiosInstance;
