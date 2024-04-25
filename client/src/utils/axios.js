import axios from "axios";

const baseUrl = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

export default axiosInstance;
