export const BASE_URL = "http://localhost:3000"

export const API_PATHS = {
  USER: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/users/get-info"
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