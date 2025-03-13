import axios from "axios"

// const DOMAIN_API = "http://localhost:3000/";
const DOMAIN_API = "https://notes-app-api-kappa.vercel.app/";

const axiosInstance = axios.create({
  baseURL: DOMAIN_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if(accessToken)
    {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
