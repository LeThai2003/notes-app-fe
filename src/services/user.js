import axiosInstance from "../utils/axiosInstance";
import { get, post} from "../utils/request"



// export const login = async (data) => {
//     const result = await post(`users/login`, data);
//     return result;
// }

// export const createAccount = async (data) => {
//     const result = await post(`users/create-account`, data);
//     return result;
// }

// export const getInfoUser = async (token = accessToken) => {
//     try {
//         const result = await get(`users/get-info`, token);
//         return result;
//     } catch (error) {
//         if(error.message == "Unauthorized")
//         {
//             throw error;
//         }
//         throw error;
//     }
// }

export const login = async (data) => {
    const response = await axiosInstance.post(`users/login`, data);
    return response;
}

export const getInfoUser = async () => {
    try {
      const response = await axiosInstance.get("users/get-info");
      return response.data;
    } catch (error) {
      console.log("Lỗi:", error);
    }
};