// export const BASE_URL = "http://localhost:3000"

export const BASE_URL = "https://notes-app-api-kappa.vercel.app"

// const DOMAIN_API = "http://localhost:3000/";
// const DOMAIN_API = "https://note-api-pi.vercel.app/";
// const DOMAIN_API = "https://notes-app-api-kappa.vercel.app/";

export const API_PATHS = {
  USER: {
    LOGIN: "/users/login",
    REGISTER: "/users/create-account",
    GET_USER_INFO: "/users/get-info",
    FORGOT_PASSWORD: "/users/password/forgot",
    OTP_PASSWORD: "/users/password/otp",
    RESET_PASSWORD: "/users/password/reset"
  },
  DASHBOARD:{
    GET_DATA: "/dashboards"
  },
  INCOME: {
    ADD_INCOME: "/incomes/add",
    GET_ALL_IMCOME: "/incomes/get",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    DOWNLOAD_INCOME: "/incomes/download-excel"
  },
  EXPENSE: {
    ADD_EXPENSE: "/expenses/add",
    GET_ALL_EXPENSE: "/expenses/get",
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    DOWNLOAD_EXPENSE: "/expenses/download-excel"
  },
  IMAGE: {
    UPLOAD_IMAGE: "/users/upload-image" 
  }
}