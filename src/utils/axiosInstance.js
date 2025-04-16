import axios from "axios"

const DOMAIN_API = "http://localhost:3000/";
// const DOMAIN_API = "https://notes-app-api-kappa.vercel.app/";

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


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response)
    {
      if(error.response.status == 401)
      {
        window.location.href = "/login";
      }
      else if(error.response.status == 500)
      {
        console.error("Server error");
      }
    }
    else if(error.code == "ECONNABORTED")
    {
      console.error("Request timeout")
    }
    return Promise.reject(error);
  }
)


export default axiosInstance;
