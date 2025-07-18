import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:9090/api",
  baseURL: "https://images-drive-with-nested-folders.onrender.com/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
