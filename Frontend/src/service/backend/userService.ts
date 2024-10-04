import { axiosInstance } from "../../config/axiosConfig";
import { GetMeResponse } from "./types/user";

const getMe = async (): Promise<GetMeResponse> => {
  try {
    const response = await axiosInstance.get<GetMeResponse>("/user/me");
    return response.data;
  } catch (error) {
    console.error("Get me failed:", error);
    throw error;
  }
};

const userService = {
  getMe,
};

export default userService;
