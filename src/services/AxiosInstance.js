import axios from "axios";
import { setupInterceptor } from "./interceptor";

const axiosInstance = axios.create({
  baseURL: "https://api.fixitnow.cfd",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

setupInterceptor(axiosInstance)

export default axiosInstance;
